var connection = require('../connection');
var sha512 = require('js-sha512');
var YoutubeMp3Downloader = require('youtube-mp3-downloader');
require('events').EventEmitter.prototype._maxListeners = 550;
var fs = require('fs');
var request = require('request');
var localPath = "/root/Documents/youtube-videos"; // your root path of server


//Configure YoutubeMp3Downloader with your settings 
var YD = new YoutubeMp3Downloader({
	"ffmpegPath": "/usr/bin/ffmpeg /usr/share/ffmpeg",        // Where is the FFmpeg binary located? 
	"outputPath": "/root/Documents/youtube-videos/video-files",    // Where should the downloaded and encoded files be stored? 
	"youtubeVideoQuality": "highest",       // What video quality should be used? 
	"queueParallelism": 30,                  // How many parallel downloads/encodes should be started? 
	"progressTimeout": 2000                 // How long should be the interval of the progress reports 
});

var baseURL ="http://elerica.com"; // your domain
var apiURL ="http://elerica.com"; //
var pathURL= "/checkStatus/?youtubeId=";		
	
function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : url;
}

function MP3() {
	
   this.get = function(req, res) {
		 var download = true;
	    res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	   if(req.query.format != "mp4"){
				download = false;
		   res.send({status: 0, message: "no valid format"});
	   }else{

		   req.query.youtubeId = youtubeParser(req.query.youtubeId);
		   if(!req.query.youtubeId){
					download = false;
			   res.send({status: 0, message: "no valid yt link"});
		   }
		
		 req.setMaxListeners(550);

		 

		if(download){

		 
				connection.acquire(function(err, con) {
					con.query('select  path, status, TIMESTAMPDIFF(MINUTE,created,CURRENT_TIMESTAMP) as cr from songs where ytId = ? and format = ? ', [req.query.youtubeId, req.query.format], function(err, result) {
					

					if (result.length > 0 && result[0].status == 'finished') {
						
							
						//If file exists retrun it, otherwise download again
						if (fs.existsSync(localPath + result[0].path.replace(baseURL,""))) {
							con.query('update songs set downloaded = downloaded +1 where format = ? and ytId = ?', [ req.query.format, req.query.youtubeId], function(err, result) {
										
								if (err) {
									console.log({status: 0, message: 'error update'});
								} else {
								// console.log({status: 1, message: 'successfully updated'});
								}
							});					
							res.send({status: 2, message: result[0].path});
						}else{
							
							//Download video and save as file 
							con.query('update songs set downloaded = downloaded +1, status = "progressing" where format = ? and ytId = ?', [ req.query.format, req.query.youtubeId], function(err, result) {
										
								if (err) {
									console.log({status: 0, message: 'error update'});
								} else {
								// console.log({status: 1, message: 'successfully updated'});
								}
							});

							YD.download(req.query.youtubeId, req.query.format);
							res.send({status: 1, message: apiURL + pathURL + req.query.youtubeId+ "&format=" + req.query.format});
						}


						

					} else if(result.length == 0 ) {

						//Download video and save as file 

						con.query('insert into songs (ytId, status, path, format ) VALUES (?,?,?,?)', [req.query.youtubeId, 'progressing', baseURL, req.query.format], function(err, result) {
							
							if (err) {
								console.log({status: 0, message: 'error insert'});
							} else {
							//	console.log({status: 1, message: 'successfully inserted'});
							}
						});

						YD.download(req.query.youtubeId, req.query.format);
						res.send({status: 1, message: apiURL + pathURL + req.query.youtubeId + "&format=" + req.query.format});
					}
					else if((result[0].status == 'progressing' && result[0].cr > 2)) {

						//Download video and save as file 

						YD.download(req.query.youtubeId, req.query.format);
						res.send({status: 1, message: apiURL + pathURL + req.query.youtubeId+ "&format=" + req.query.format});
					}else{


						res.send({status: 1, message: apiURL + pathURL + req.query.youtubeId+ "&format=" + req.query.format});
					}
					con.release();
					});
				});
		}

		 
		YD.on("finished", function(status, data) {

			connection.acquire(function(err, con) {
			  con.query('select * from songs where ytId = ? and format= ? ', [data.videoId, data.format], function(err, result) {

				if (result.length == 0) {
					con.query('insert into songs (ytId, status, path, format, artist, title ) VALUES (?,?,?,?,?,?)', [data.videoId, 'finished', data.file.replace("C:/inetpub/wwwroot", baseURL), data.format, data.artist, data.title], function(err, result) {
						
						if (err) {
						  console.log({status: 0, message: 'error insert finish'});
						} else {
						 // console.log({status: 1, message: 'successfully inserted finish'});
						}
					});
				
				}
				else if(result.length > 0 && result[0].status != 'finished' ){
					
					
					con.query('update songs  set status = ?, path = ?, artist = ?, title = ? where format = ? and ytId = ?', ['finished', data.file.replace("C:/inetpub/wwwroot", baseURL), data.artist, data.videoTitle, data.format, data.videoId], function(err, result) {
						
						if (err) {
						  console.log({status: 0, message: 'error update'});
						} else {
						  //console.log({status: 1, message: 'successfully updated'});
						}
					});
				} 
				con.release();
			  });
			});
			//console.log(data.file);
		});
		
		YD.on("error", function(error) {
			console.log(error);
		});
		 
		YD.on("progress", function(progress) {	
			//console.log(progress);
		});
	}	
  };
  
    this.getStatus = function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		req.query.youtubeId = youtubeParser(req.query.youtubeId);


		connection.acquire(function(err, con) {
		  con.query('select status, format, artist, title from songs where ytId = ? and format = ? ', [req.query.youtubeId, req.query.format], function(err, result) {
			con.release();
			res.send(result[0]);

		  });
		});


	};
  
      this.download = function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			var file = "C:/inetpub/wwwroot/downloaded"+ req.query.filename;

		    // Attempt to read the file size
			var stat = null;
			try {
				stat = fs.statSync(file);
			} catch (_error) {
				console.log(res);
			}
				
			if(file.substr(file.length-3, file.length) == "mp3"){
				// Set the headers
				req.query.filename = req.query.filename.replace("/mp3/", "").replace("_", " ");
				res.writeHead(200, {
					'Content-Type': 'audio/mpeg',
					'Content-Disposition': 'audio/mpeg;  filename="' + req.query.filename +'"'
				});
				
			}else if(file.substr(file.length-3, file.length) == "mp4"){
				req.query.filename = req.query.filename.replace("/mp4/", "").replace("_", " ");
				// Set the headers
				res.writeHead(200, {
					'Content-Type': 'video/mp4',
					'Content-Disposition': 'video/mp4; filename="' + req.query.filename +'"',
					'Content-Length': + stat.size
				});
			}

			// Pipe the file contents to the response
			fs.createReadStream(file).pipe(res);


  };
  
  

  
  
}
module.exports = new MP3();