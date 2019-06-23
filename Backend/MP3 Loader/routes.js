var mp3 = require('./models/mp3');

var cors = require('cors')
var connectionVideo = require('./connectionVideo');


module.exports = {
  configure: function(app) {
	app.use(cors());
		app.get('/mp4/', function(req, res) {

		//check for payment for music app download
			if(req.headers.utoken){
				connectionVideo.acquire(function(err, conVideo) {
					conVideo.query('update users set lastDownload = now(), amountSongs=amountSongs -1,downloaded=downloaded+1  where utoken = ? and amountSongs > 0 and banned = 0 ', [req.headers.utoken], function(err, result) {
						if (err) {
							console.log(err);
							res.send({status: 3, message: 'You have not enough credits'});
						}

						if(result.affectedRows < 1){
							res.send({status: 3, message: 'You have not enough credits'});
						}else{
							mp3.get(req, res);
						}
					});
				});
			}else{
				mp3.get(req, res);
			}	
		
		});

		app.get('/checkStatus/', function(req, res) {
			mp3.getStatus(req, res);
		});
		
		app.get('/download/', function(req, res) {
			mp3.download(req, res);
		});
		
		
	}
	
};
