var connection = require('../connection');
var sha512 = require('js-sha512');
 
var onesignal = require('node-opensignal-api');
var onesignal_client = onesignal.createClient();
 
var restApiKey = 'Mjg5YzNkNmEtOTExNS00YWU5LThjNzctYTYxNGFmMDZhNWY0';
var appId = 'e51bbf47-c566-485e-a41b-492b1789ddd5';
 
var nodemailer = require('nodemailer');


function generateUUID(){
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}


function Users() {
 
   this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from users', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  
  this.register = function(user, res) {
	var errorRegister= false;
	user.username=user.username.trim();
	if(user.username.length < 4){
		errorRegister= true;
		res.send({status: 0, message: 'Username to short'});
	}else if(user.password.length < 8){
		errorRegister= true;
		res.send({status: 0, message: 'Password to short'});
	} 
	if(errorRegister == false){
		connection.acquire(function(err, con) {
			con.query('select * from users where username= ?', user.username, function(err, result) {

				if (err) {
					console.log(err);
					con.release();
				}
				
				if (result.length == 0) {


					con.query('select * from users where uuid = ? ', user.uuid, function(err, secCheck) {

						if (err) {
							console.log(err);
						}

						if (secCheck.length == 0) {
							user.amountSongs=16;
						}else if (secCheck.length > 0 && secCheck.length <= 2) {
							user.amountSongs=1;
						}else{
							con.release();

							res.send({status: 1, message: 'You have too much accounts'});
							return;
						}

						var hash =sha512(user.password);
						user.password=hash;
						user.utoken=generateUUID();
						
						con.query('insert into users set ?', user, function(err, result) {
							
							if (err) {
								res.send({status: 1, message: 'User creation failed'});
							} else {
								res.send({status: 2, message: user.utoken});
								con.query("insert into news (ytId, songname, picture, comment, fromUser, toUser ) VALUES ('GBuMFcQ2kP8','How To Use Video Player','http://img.youtube.com/vi/GBuMFcQ2kP8/hqdefault.jpg','Please share the app with friends and rate us on app store',3,(Select id from users where utoken=?))", [user.utoken], function(err, result) {
									if (err) {
										console.log(JSON.stringify(err));
									}
									con.query("insert into news (ytId, songname, picture, comment, fromUser, toUser ) VALUES ('Piew_RBg8Ug','How to Activate Push Notifications on Iphone','http://img.youtube.com/vi/Piew_RBg8Ug/hqdefault.jpg','For The Best Support: Please check that your Push Notifications are enabled',3, (Select id from users where utoken=?))", [user.utoken], function(err, result) {
										if (err) {
											console.log(JSON.stringify(err));
										}

									});
								});
									
							}
						});
												
										
					});		
									

				}else{
					con.release();
					res.send({status: 1, message: 'User still exists'});
				}
			});
		});
	}

  };
  
   this.login = function(user, res) { 

	var hash =sha512(user.query.pwd);
	var userpassword=hash;
							
	connection.acquire(function(err, con) {
		if (err) {
			console.log(err);
			con.release();
		}

		con.query('select * from users where username = ? and password = ?', [user.query.username, userpassword], function(err, result) {

			if (err) {
				console.log(err);
				con.release();
			}
			
			if (result.length == 1) {
				if(result[0].banned == 1){
					res.send({status: 1, message: 'User banned'});
				}else{
					var newUtoken=generateUUID();
					var now = new Date();

					con.query('update users set uuid = ?, utoken = ?, lastlogin = ?, model = ?, platform = ?, platformversion = ?, pushid= ?, pushtoken=? where username = ?', [user.query.uuid, newUtoken, now, user.query.model, user.query.platform ,user.query.platformversion,user.query.pushid,user.query.pushtoken, user.query.username], function(err, result) {
						con.release();
						if (err) {
							console.log(err);
						  res.send({status: 1, message: 'Login failed'});
						} else {
						  res.send({status: 2, message: newUtoken});
						}
					});

				}
				
			}else{	
				res.send({status: 0, message: 'Credentials are wrong'});
			}
			
		});	
	});	
			
  };
  
  this.updateMail = function(req, res) { 
			
	connection.acquire(function(err, con) {
		if (err) {
			console.log(err);
			con.release();
		}
			con.query('update users set email = ? where utoken = ? and banned = 0', [req.query.email,  req.headers.utoken], function(err, result) {
				con.release();
				if (err) {
					console.log(err);
					res.send({status: 1, message: 'failed'});
				} 
				
				if (result.affectedRows == 1) {
					res.send({status: 2, message: 'Success'});
				}else{
					res.send({status: 1, message: 'failed'});
				} 
			});

	});	
		
};

this.sendPW = function(req, res) { 
		
	connection.acquire(function(err, con) {
		if (err) {
			console.log(err);
			con.release();
		}
			con.query('select id, pushid, email from users where username = ? and banned = 0', [req.query.username], function(err, resultUser) {

				if (err) {
					console.log(err);
					res.send({status: 1, message: 'failed'});
				} else{
					var tempWP = Math.random().toString(36).substr(2, 8);
					var newPW =sha512(tempWP);

					con.query('update users set password = ? where username = ? and banned = 0', [newPW,  req.query.username], function(err, result) {
						con.release();
						if (err) {
							console.log(err);
							res.send({status: 1, message: 'failed'});
						} 
						
						if (result.affectedRows == 1) {
							var username = req.query.username;
							var pushid = resultUser[0].pushid;
							var email = resultUser[0].email;
							pushMessage( pushid, tempWP, username);
							res.send({status: 2, message: 'Success'});
						}else{
							res.send({status: 1, message: 'failed'});
						} 
					});
				}
				

			});

	});	
		
};

function pushMessage( pushid, password, username){

					var params = {
						app_id: appId,
						contents: {
							'en': "Hi "+ username + " your new password is: "+ password
						},
						headings: {
							'en': 'Your new password'
						},
						include_player_ids: [pushid]
					};
					onesignal_client.notifications.create(restApiKey, params, function (err, response) {
						if (err) {
							//console.log('Encountered error', err);
						} else {
							//console.log(response);
						}
					});

}




this.changePW = function(req, res) { 
	var hash =sha512(req.query.oldPW);
	var newPW =sha512(req.query.newPW);

	if(newPW != hash ||  req.query.newPW.length <= 5){
		connection.acquire(function(err, con) {
			if (err) {
				console.log(err);
				con.release();
			}
				con.query('update users set password = ? where utoken = ? and banned = 0 and id in  (select id from (Select id from users where password= ?) as s) ', [newPW,  req.headers.utoken, hash], function(err, result) {
					con.release();
					if (err) {
						console.log(err);
						res.send({status: 1, message: 'failed'});
					} 

					if (result.affectedRows > 0) {
						res.send({status: 2, message: 'Success'});
					}else{
						res.send({status: 1, message: 'failed'});
					} 
				});

		});	
	}else{
		res.send({status: 1, message: 'failed'});
	}
		
};

  this.updateUser = function(req, res) { 
			
		connection.acquire(function(err, con) {
			con.query('select id, sessions, email, banned, deleted, username, admob, amountSongs, pushid, lastlogin from users where utoken = ?', [req.headers.utoken], function(err, result) {
	
				if (err) {
					console.log(JSON.stringify(err));
					con.release();
					res.send({status: 0, message: 'Credentials are wrong'});
				}
				
				if (result.length == 1) {
					var admob = result[0].admob;
					
					if(result[0].deleted ==1 || result[0].banned == 1){
						res.send({status: 1, message: 'User banned'});
					}else{
						var userId= result[0].id;
						var username= result[0].username;
						var amountSongs= result[0].amountSongs;
						var lastlogin= result[0].lastlogin;
						var sessions= result[0].sessions;
						var email= result[0].email;
						var d = new Date(lastlogin);
	
						var now = new Date();
						d.setHours(d.getHours()  -1);
						
						if(d.getDate() != now.getDate()){
							var amountSongs = amountSongs + 1;
							
								var params = {
									app_id: appId,
									contents: {
										'en': 'You have received 1 Coin.'
									},
									headings: {
										'en': 'Welcome Back - Daily Reward'
									},
									include_player_ids: [result[0].pushid]
								};
								onesignal_client.notifications.create(restApiKey, params, function (err, response) {
									if (err) {
										//console.log('Encountered error', err);
									} else {
										//console.log(response);
									}
								});
						
						}
						con.query('update users set lastlong=?, lastlat=?, sessions= sessions+1, lastlogin= now(), language=?, uuid = ?, platform=?, model=?, platformversion=?, appversion=?, amountSongs = ? where id = ?', [req.query.lastlong, req.query.lastlat,req.query.language, req.query.uuid, req.query.platform, req.query.model, req.query.platformversion, req.query.appversion, amountSongs, userId], function(err, result) {
							con.release();
							if (err) {
								console.log(err);
								res.send({status: 1, message: 'Update failed'});
							} else {
								res.send({status: 2,email:email, sessions:sessions, message: username, admob: admob, amountSongs:amountSongs});
							}
						});
	
					}
					
				}else{	
					res.send({status: 0, message: 'Credentials are wrong'});
				}
				
			});	
		});	
				
		};
  
  this.enablePush = function(req, res) { 
				
	connection.acquire(function(err, con) {
		if (err) {
			console.log(err);
			con.release();
		}

		con.query('select id, banned, deleted, username from users where utoken = ?', [req.headers.utoken], function(err, result) {

			if (err) {
				console.log(err);
				con.release();
			}
			
			if (result.length == 1) {
				if(result[0].deleted ==1 || result[0].banned == 1){
					res.send({status: 1, message: 'User banned'});
				}else{
					var userId= result[0].id;


					con.query('update users set pushid=?, pushtoken=? where id = ?', [req.query.pushId, req.query.pushToken, userId], function(err, result) {
						con.release();
						if (err) {
							console.log(err);
						  res.send({status: 1, message: 'Enable failed'});
						} else {
						  res.send({status: 2, message: 'Push Token Updated'});
						}
					});

				}
				
			}else{	
				res.send({status: 0, message: 'Credentials are wrong'});
			}
			
		});	
	});	
			
  };
  
}
module.exports = new Users();