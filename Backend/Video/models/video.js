var connection = require('../connection');
var connectionMusicDB = require('../connectionMusicDB');

var async = require('async');
var youtubeThumbnail = require('youtube-thumbnail');
var ytdl = require('ytdl-core');
var fs = require("fs");

var onesignal = require('node-opensignal-api');
var onesignal_client = onesignal.createClient();
var restApiKey = 'Mjg5YzNkNmEtOTExNS00YWU5LThjNzctYTYxNGFmMDZhNWY0';
var appId = 'e51bbf47-c566-485e-a41b-492b1789ddd5';

	
function Video() {

	 this.getVideoInfo = function(req, res) {
		ytdl.getInfo(req.query.videoUrl, function(err, info) {
				res.send(info);
		});
	};
	
	
	this.getThumb = function(req, res) {
				res.send(youtubeThumbnail('https://www.youtube.com/watch?v='+ req.query.thumb));
		
	};
		
	this.restore = function(req, res) {
		var songList = [];
		
		connection.acquire(function(err, con) {
			con.query('select id from users where utoken = ? ', [req.headers.utoken], function(err, userResult) {
				if (userResult.length > 0) {

							con.query('select s.videoId, s.name as sName, p.name as pName from songs s, playlists p where s.playlistId = p.pid and s.userid = ?', [userResult[0].id], function(err, resultSongs) {
								if (err) {
								  console.log(JSON.stringify(err));
								  res.send({status: 0, message: 'error get backup'});
								}
								
								for (var j = 0; j < resultSongs.length; j++) {
								  var song = {
									  playlist: resultSongs[j].pName,
									  song : resultSongs[j].videoId,
									  title : resultSongs[j].sName.replace(".mp4",""),
									  thumb: youtubeThumbnail('https://www.youtube.com/watch?v='+ resultSongs[j].videoId).high.url
								  }
								 
								  songList.push(song);
								}						
								res.send({status: 2, message: JSON.stringify(songList)});
							});
				}else{
					res.send({status: 0, message: 'error user'});
				}
			});
		});		
	}	
		
	function getPlaylists(input) {
		var array = [];
		input.forEach(function(element) {
			if(!array.includes(element.playlist)){
				array.push(element.playlist);
			}
		  });

		return array;
	}

	function getSongs(input) {
		var array = [];
		input.forEach(function(element) {
			if(!array.includes(element.songname)){
				array.push(element.song);
			}
		});

		return array;
	}

	this.backup = function(req, res) {
		console.log(JSON.stringify(req.body));
		 var playlistNames = getPlaylists(req.body);
		 var songs = getSongs(req.body);

		connection.acquire(function(err, con) {
			connectionMusicDB.acquire(function(err, conMusicDB) {
				

				con.query('select id from users where utoken = ? ', [req.headers.utoken], function(err, userResult) {

					if (userResult.length > 0) {
						//delete all playlists and songs
						con.query('Delete from playlists where userid = ? and (created < NOW() - INTERVAL 5 DAY or name in ?) ', [userResult[0].id, [playlistNames]], function(err, result) {
							if (err) {
								console.log(JSON.stringify(err));
							  res.send({status: 0, message: 'error backup'});
							} else {
								con.query('Delete from songs where userid = ? and (created < NOW() - INTERVAL 5 DAY or name in ?)', [userResult[0].id, [songs]], function(err, result) {
									if (err) {
										console.log(JSON.stringify(err));
									  res.send({status: 0, message: 'error backup'});
									} else {
										var insertError = false;
										
										// Add Playlists
										var counterPlayist = 0;
										async.forEachOf(req.body, function (tempPlaylist, i, inner_callback_playlist){
											var d = new Date().getTime();

											var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
												var r = (d + Math.random()*16)%16 | 0;
												d = Math.floor(d/16);
												return (c=='x' ? r : (r&0x3|0x8)).toString(16);
											});
														
											con.query('insert into playlists (userId, name, pid ) VALUES (?,?,?) ON DUPLICATE KEY UPDATE created = now()', [userResult[0].id, tempPlaylist.playlist, uuid], function(err, resultPlaylist) {
												if (err) {
													insertError = true;
													console.log(JSON.stringify(err));
													res.send({status: 0, message: 'error insert'});
												}
												
												inner_callback_playlist(null);
													
											});
										}, function(err){
											if(err){
												res.send({status: 0, message: 'error insert'});
												//handle the error if the query throws an error
											
												backUpSongs(req, res, userResult, conMusicDB, con, insertError);
											}else{
												res.send({status: 2, message: 'successfully updated'});
												//whatever you wanna do after all the iterations are done
												
												backUpSongs(req, res, userResult, conMusicDB, con, insertError);
											}
										});
									}
								});
							}
						});
					}else{
						res.send({status: 0, message: 'error user'});
					}
				});
				conMusicDB.release();
			});
			con.release();
		});
	};

	function backUpSongs(req, res, userResult, conMusicDB, con, insertError){
		// Add songs
											
		async.forEachOf(req.body, function (tempSong, i, inner_callback_songs){
					conMusicDB.query('Select ytId from songs where path LIKE ? ', ["%" + tempSong.song], function(err, videoIDResult) {
						if(videoIDResult[0]){
							con.query('select pid from playlists where userid = ? and name =?', [userResult[0].id, tempSong.playlist], function(err, resultPlaylistExist) {

								con.query('insert into songs (userId, name, videoId, playlistId ) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE created = now()', [userResult[0].id, tempSong.song, videoIDResult[0].ytId, resultPlaylistExist[0].pid], function(err, result) {
									if (err) {
									  insertError = true;
									  console.log(JSON.stringify(err));
									}
									inner_callback_songs(null);

								});
							});
						}	
					});
		}, function(err){
			if(err){
				res.send({status: 0, message: 'error insert all songs'});
			  //handle the error if the query throws an error
			}else{
				res.send({status: 2, message: 'Backup created'});
			  //whatever you wanna do after all the iterations are done
			}
		});
	}
	
	this.getUsers = function(req, res) {
		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userId) {
				if (err) {
					console.log(err);
				}
				
				var userId = userId[0].id;

				if (userId.length != 0) {
					con.query("select id, username from users  where NOT (id = ?) and deleted = 0 and username LIKE ?  LIMIT 5", [userId, req.query.name + "%"], function(err, result) {
						
						if (err) {
							console.log(err);
							con.release();
							res.send({status: 1, message: 'Failed to load users'});
						} else {
							res.send(JSON.stringify(result));
							con.release();
						}
					});
					
				}else{
					con.release();
					res.send({status: 1, message: 'Failed to auth'});
				}	
			});
		});
	};
		
	this.getNotifications = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userId) {
				if (err) {
					console.log(err);
				}
				
				var userId = userId[0].id;

				if (userId.length != 0) {
					con.query("select n.id, u.username, n.ytId, n.comment, n.watched, n.picture, n.songname,n.type, n.time from news n, users u where n.toUser = ? and u.id=n.toUser ORDER BY time DESC LIMIT 25", [userId], function(err, result) {
						
						if (err) {
							console.log(err);
							con.release();
							res.send({status: 1, message: 'Failed to load news'});
						} else {
							res.send(JSON.stringify(result));
							con.release();
						}
					});
					
				}else{
					con.release();
					res.send({status: 1, message: 'Failed to auth'});
				}	
			});
				

		});
	};
		
		
	this.share = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select id, username from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userIdResult) {
				if (err) {
					console.log(err);
				}
				if(userIdResult[0]){
					var userId = userIdResult[0].id;
					var fromUsername = userIdResult[0].username;
					
					var insertError = false;
					
					if (userId.length != 0 && req.body.users.length > 0) {
						async.forEachOf(req.body.users, function (tempUsersToShare, i, inner_callback_share){

									con.query("insert into news (ytId, songname, picture, comment, fromUser, toUser ) VALUES (?,?,?,?,?,?)", [req.body.videoId, req.body.videoTitle, req.body.picture, req.body.comment, userId, tempUsersToShare.id], function(err, result) {
										
										if (err) {
											insertError = true;
											console.log(err);
											
										} else {
											inner_callback_share(null);
											//send push to users
											con.query('select pushid from users where deleted = 0 and banned = 0 and id = ?  ',tempUsersToShare.id, function(err, pushUsers) {
												if (err) {
													console.log(err);
												}
												if (pushUsers.length > 0) {
														var params = {
															app_id: appId,
															contents: {
																'en': fromUsername + ' has shared a video: '+ req.body.videoTitle +' with you. Check it out =)'
															},
															headings: {
																'en': 'New Music'
															},
															include_player_ids: [pushUsers[0].pushid]
														};
														onesignal_client.notifications.create(restApiKey, params, function (err, response) {
															if (err) {
																//console.log('Encountered error', err);
															} else {
																//console.log(response);
															}
														});
												}
											});
										}
									});					
						}, function(err){
							if(err){
								insertError = true;
							}
							if (insertError) {
								res.send({status: 0, message: 'error share song'});
							} else {
								res.send({status: 2, message: 'Song Successful shared'});
							}
							con.release();
							
						});
					}else{
						con.release();
						res.send({status: 1, message: 'Failed to auth'});
					}
				}else{
					con.release();
					res.send({status: 1, message: 'Failed to auth'});
				}	
			});
				

		});
	};
		
	this.hasWatched = function(req, res) {
		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userId) {
				if (err) {
					console.log(err);
				}
				
				var userId = userId[0].id;

				if (userId.length != 0) {
					con.query("update news set watched=watched +1 where id = ?", [req.query.notificationId], function(err, result) {
						
						if (err) {
							console.log(err);
							con.release();
							res.send({status: 1, message: 'Failed to update news'});
						} else {
							res.send({status: 2, message: 'Successful update news'});
							con.release();
						}
					});
					
				}else{
					con.release();
					res.send({status: 1, message: 'Failed to auth'});
				}	
			});
		});
	};

	this.hasWatchedVideo = function(req, res) {
			connection.acquire(function(err, con) {
				con.query("update users set amountSongs = amountSongs + ? where utoken = ? and banned = 0", [req.query.id,req.headers.utoken], function(err, result) {
							
					if (err) {
						console.log(err);
						con.release();
						res.send({status: 1, message: 'Failed to update news'});
					} else {
						con.query("Select amountSongs from  users where utoken = ?", [req.headers.utoken], function(err, result) {
							
							if (err) {
								console.log(err);
								con.release();
								res.send({status: 1, message: 'Failed to update news'});
							} else {
								res.send({status: 2, message: 'Successful update news', amountSongs:result[0].amountSongs});
							}
						});
					}
				});
			});
	};

	this.hasFreebie = function(req, res) {
		if(req.query.id <= 1 && req.sec != 1){
			connection.acquire(function(err, con) {
				con.query("update users set amountSongs = amountSongs + ? where utoken = ? and banned = 0", [req.query.id,req.headers.utoken], function(err, result) {
							
					if (err) {
						console.log(err);
						con.release();
						res.send({status: 1, message: 'Failed to update news'});
					} else {
						con.query("Select amountSongs from  users where utoken = ?", [req.headers.utoken], function(err, result) {
							
							if (err) {
								console.log(err);
								con.release();
								res.send({status: 1, message: 'Failed to update news'});
							} else {
								res.send({status: 2, message: 'Successful update news', amountSongs:result[0].amountSongs});
							}
						});
					}
				});
					

			});
		}else{
			res.send({status: 1, message: 'Failed to update news'});
		}
		
	};

	this.hasDownloaded = function(req, res) {
		
		connection.acquire(function(err, con) {

			con.query("Select amountSongs from  users where utoken = ?", [req.headers.utoken], function(err, result) {
				
				if (err) {
					console.log(err);
					con.release();
					res.send({status: 1, message: 'Failed to update news'});
				} else {
					res.send({status: 2, message: 'Successful loaded', amountSongs:result[0].amountSongs});
				}
			});
		});
	};


	this.getWatched = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userIdResult) {
				if (err) {
					console.log(err);
				}
				if(userIdResult[0]){
					var userId = userIdResult[0].id;

					if (userId.length != 0) {
						con.query("Select count(*) as count from news where watched = 0 and toUser = ?", [userId], function(err, result) {
							
							if (err) {
								console.log(err);
								con.release();
								res.send({status: 1, message: 'Failed to update news'});
							} else {
								res.send({status: 2, message: result[0].count});
								con.release();
							}
						});
						
					}else{
						con.release();
						res.send({status: 1, message: 'Failed to auth'});
					}
				}
					
			});
		});
	};
		
	this.getVideoInfoByName = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userId) {
				if (err) {
					console.log(err);
				}
				
				var userId = userId[0].id;

				if (userId.length != 0) {
					connectionMusicDB.acquire(function(err, conMusicDB) {
						conMusicDB.query('Select ytId from songs where path LIKE ? ', ["%" + req.query.title], function(err, result) {
							
							if (err) {
								console.log(err);
								con.release();
								conMusicDB.release();
								res.send({status: 1, message: 'Failed to load song'});
							} else {
								var picture = youtubeThumbnail('https://www.youtube.com/watch?v='+ result[0].ytId);
								res.send({status: 2, videoId: result[0].ytId, picture: picture});
								con.release();
								conMusicDB.release();
							}
						});
					});
					
				}else{
					con.release();
					res.send({status: 1, message: 'Failed to auth'});
				}	
			});
		});
	};
	
	this.insertAll = function (req, res){
		// Add songs
		connection.acquire(function(err, con) {
			con.query('select id from users',req.headers.utoken, function(err, userIds) {
				if (err) {
					console.log(err);
				}								
				async.forEachOf(userIds, function (tempUserId, i, inner_callback_insert){
						con.query("insert into news (ytId, songname, picture, comment, fromUser, toUser ) VALUES ('GBuMFcQ2kP8','How To Use iMusic - Load & Stream Offline','http://img.youtube.com/vi/GBuMFcQ2kP8/hqdefault.jpg','Please share the app with friends and rate us on app store',5,?)", [tempUserId.id], function(err, result) {
							if (err) {
							  insertError = true;
							  console.log(JSON.stringify(err));
							}
							inner_callback_insert(null);
							
						});	
				}, function(err){
					if(err){
						
						res.send({status: 0, message: 'error insert all'});
					  //handle the error if the query throws an error
					}else{
						
						res.send({status: 2, message: 'Inserted'});
					  //whatever you wanna do after all the iterations are done
					}
				});
			});
		});	
	};
	
	this.getSimilarMusic = function(req, res) {
		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userId) {
				if (err) {
					console.log(err);
				}
				if(userId[0]){
					var userId = userId[0].id;
					var songs = [];
					
					if (userId.length != 0) {
						con.query("select  DISTINCT s.videoId, s.name as videoName, s.created  FROM `songs` s INNER JOIN (select playlistId  FROM `songs` where videoId in( select videoId  from songs where userid = ? ) and userid != ?  GROUP BY playlistId ORDER BY count('videoId') DESC LIMIT 10) as v2 ON s.playListId = v2.playlistId  ORDER BY RAND() LIMIT 75", [userId, userId], function(err, resultSimilarSongs) {
							
							if (err) {
								console.log(err);
								con.release();
								res.send({status: 1, message: 'Failed to load songs'});
							} else {

								if(resultSimilarSongs.length == 0){
									con.query("select  DISTINCT s.videoId, s.name as videoName, s.created  FROM `songs` s   ORDER BY RAND() LIMIT 75", [], function(err, resultSimilarSongs) {
							
										if (err) {
											console.log(err);
											con.release();
											res.send({status: 1, message: 'Failed to load songs'});
										} else {
											for  (var j = 0; j < resultSimilarSongs.length; j++) {
											  var song = {
												  publishedAt:resultSimilarSongs[j].created,
												channelId : resultSimilarSongs[j].videoId,
												title : resultSimilarSongs[j].videoName.replace(".mp4",""),
												thumbnails: {
													  "default": {
														"url": youtubeThumbnail('https://www.youtube.com/watch?v='+ resultSimilarSongs[j].videoId).high.url,
														"width": 120,
														"height": 90
													  },
													  "high": {
														"url": youtubeThumbnail('https://www.youtube.com/watch?v='+ resultSimilarSongs[j].videoId).high.url,
														"width": 120,
														"height": 90
													  }
												},
												resourceId: {
												  videoId: resultSimilarSongs[j].videoId
												}
											  }

											  songs.push({snippet:song});
											  if(j ==resultSimilarSongs.length-1){
												res.send({items:songs});					
												con.release();
											  }
											}						

										}
									});
								}	
								
								for (var j = 0; j < resultSimilarSongs.length; j++) {
								  var song = {
									  publishedAt:resultSimilarSongs[j].created,
									channelId : resultSimilarSongs[j].videoId,
									title : resultSimilarSongs[j].videoName.replace(".mp4",""),
									thumbnails: {
										  "default": {
											"url": youtubeThumbnail('https://www.youtube.com/watch?v='+ resultSimilarSongs[j].videoId).high.url,
											"width": 120,
											"height": 90
										  },
										  "high": {
											"url": youtubeThumbnail('https://www.youtube.com/watch?v='+ resultSimilarSongs[j].videoId).high.url,
											"width": 120,
											"height": 90
										  }
									},
									resourceId: {
									  videoId: resultSimilarSongs[j].videoId
									}
								  }
								 
								  songs.push({snippet:song});

								  if(j ==resultSimilarSongs.length-1){
									res.send({items:songs});					
									con.release();
								  }
								}	
							}
						});
						
					}else{
						con.release();
						res.send({status: 1, message: 'Failed to auth'});
					}	
				}else{
					con.release();
					res.send({status: 1, message: 'Failed to auth'});
				}	
			});
				

		});
	};	
	
	this.clean = function(req, res) {
		connectionMusicDB.acquire(function(err, conMusicDB) {
			conMusicDB.query('Select path from songs where downloaded < 6 and status != "progressing"', function(err, result) {
				
				if (err) {
					console.log(err);
					con.release();
					conMusicDB.release();
					res.send({status: 1, message: 'Failed to load song'});
				} else {
				
					for (var j = 0; j < result.length; j++) {
						result[j].path = result[j].path.replace("YOUR DOMAIN","Your local path fo downloaded files");
							if (fs.existsSync(result[j].path)) {

								fs.unlink(result[j].path, function(error) {
									if (error) {
										console.log(error);
									}
									
								});
							}
					}
					res.send(result);
					conMusicDB.release();
				}
			});
		});
	}

}
module.exports = new Video();