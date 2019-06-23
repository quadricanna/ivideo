var connection = require('../connection');
var fs = require('fs');
var dateFormat = require('dateformat');
var async = require('async');
var request = require('request');

var onesignal = require('node-opensignal-api');
var onesignal_client = onesignal.createClient();

var restApiKey = 'Mjg5YzNkNmEtOTExNS00YWU5LThjNzctYTYxNGFmMDZhNWY0';
var appId = 'e51bbf47-c566-485e-a41b-492b1789ddd5';
var activeDays= 30;

var sandbox = false;

var Verifier = require('google-play-billing-validator')

function Payment() {

	
	this.checkActivePayments = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select username, id , expires, pushid from users where admob != 0 ', function(err, users) {
				if (err) {
					console.log(err);
				}
				async.forEachOf(users, function (user, i, request_inner_update_payment_callback){
					if( user.expires <= Date.now()){
						con.query('update users set admob = 0, payedtimes = payedtimes + 1 where id=?',[ user.id], function(err, updated) {
							if (err) {
								console.log(err);
							}else{
								sendPushExpired( user.username, user.pushid);
							}
							request_inner_update_payment_callback(null);
						});	
					}else{
						request_inner_update_payment_callback(null);
					}
					
				}, function(err){
					con.release();
					res.send({status: 1, message: 'Done'});
				});
				
			});
		});	
	};
	
	function sendPushExpired(username, pushid){
		var params = {
				app_id: appId,
				contents: {
					'en': 'Hey '+username+', please login and check your payment status for removing player ads'
				},
				headings: {
					'en': 'Subscription Expired'
				},
				include_player_ids: [pushid]
			};
			onesignal_client.notifications.create(restApiKey, params, function (err, response) {
				if (err) {
					console.log(err);
				} else {
					//console.log(response);
				}
			});
	}

	
	this.restore = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select id, expires from users where deleted = 0 and banned = 0 and utoken = ? ',req.headers.utoken, function(err, userId) {
				if (err) {
					console.log(err);
				}
				if (userId[0].expires  <= Date.now()) {
					con.release();
					res.send({status: 1, message: 'Failed to pay'});
					
				}else{
					con.query('update users set admob = 1 where id=?',[userId[0].id], function(err, updated) {
						if (err) {
							con.release();
							res.send({status: 1, message: 'Failed to pay'});
		
						}else{
							con.release();
							res.send({status: 2, message: 'Payed'});
						}
					});	
				}
				
				
			});		

		});	
	};
		
	this.checkVoucher = function(req, res) {

		connection.acquire(function(err, con) {
			con.query('select id from users where deleted = 0 and banned = 0 and utoken = ? and voucher1 = 0  ',req.headers.utoken, function(err, userIdResult) {
				if (err) {
					console.log(err);
				}
				addSongs = 0;

				if(userIdResult[0]){
					var userId = userIdResult[0].id;

					if(req.query.voucher.toUpperCase() == '25free'.toUpperCase()) {
						addSongs = 25;
					}
					if(addSongs>0){
						con.query('update users set amountSongs = amountSongs + ?, voucher1 = 1  where utoken=?',[addSongs,  req.headers.utoken], function(err, updated) {
							if (err) {
								console.log(err);
								con.release();
								res.send({status: 1, message: 'Failed to pay'});

							}else{
								con.release();
								res.send({status: 2, message: 'Payed', addSongs: addSongs});
							}
						});	
					}else{
						res.send({status: 1, message: 'Not Payed', addSongs: addSongs});

					}
				}else{
					con.release();
					res.send({status: 1, message: 'Not Payed', addSongs: addSongs});

				}
					
			});
				

		});
	};
	
	function isBlank(str) {
		return (!str || /^\s*$/.test(str) || 0 === str.length);
	}
	
	
}
module.exports = new Payment();