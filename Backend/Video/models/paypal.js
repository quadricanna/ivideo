var connection = require('../connection');
var dateFormat = require('dateformat');
var async = require('async');
var request = require('request');


//need for Token generation
var hostnameNewToken = "https://api.paypal.com/v1/oauth2/token";
var newTokenAuth ="EJldWHRh_tBluuukGvoBcOTpNitG2ho8HLTafH0xj2h7M2ua18CIcf-W5Hs1i5dzKZP2sdkMvh6xz_X6";

//need for Payment
var hostname = "https://api.paypal.com/v1/payments/payment/";
var accessToken = '';
var type="prod";

var sandbox = false;

var activeDays= 30;

function Paypal() {
		this.checkPayment = function(req, res) {

			connection.acquire(function(err, con) {
				con.query('select id from users where deleted = 0 and banned = 0 and utoken = ?  ',req.headers.utoken, function(err, userId) {
					if (err) {
						console.log(err);
						con.release();
					}

					var userId = userId[0].id;
					if (userId.length != 0) {
						if(sandbox){
							hostname = "https://api.sandbox.paypal.com/v1/payments/payment/";
							type="sandbox";
						}
						
						con.query('select token from tokens where name=?',type, function(err, tokenResponse) {
								if (err) {
									console.log(err);
									con.release();
								}
								
								accessToken = tokenResponse[0].token;

							var options = {
							  url: hostname + req.headers.ppid,
							  headers: {
								'Content-Type': 'application/json',
								'Authorization' : accessToken
							  }
							};
							request(options, function (error, response, body) {
								var reponseBody = JSON.parse(body);
								
								if(reponseBody.error== "invalid_token"){
									generateNewToken(req, con, res, options, userId);
								}else{
									processPaypalPayment(req, con, res, reponseBody, userId);
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
		
	function generateNewToken(req, con, res, options, userId){
		//new Token
		if(sandbox){
			hostnameNewToken = "https://api.sandbox.paypal.com/v1/oauth2/token";
			newTokenAuth ="EGn2mF3mjrcbY0LUlewL6kWG-RwN-OCcDnDZCw8ONrk0NZTgT8TlYAGmsGHw2Gl7nqwVyz0y1yciaUPM";
		}	

		request.post({
		  headers: {'content-type' : 'application/x-www-form-urlencoded', 
		  'Accept-Language' : 'en_US',
		  'Authorization' : newTokenAuth
		  },
		  url:     hostnameNewToken,
		  body:    "grant_type=client_credentials"
		},  function (errorNewToken, responseNewToken, bodyNewToken) {
			var reponseBodyNewToken = JSON.parse(bodyNewToken);

			if(reponseBodyNewToken.access_token.length > 0){
				//new Request for payment
				newTokenAuthPP = 'Bearer ' + reponseBodyNewToken.access_token;
				
				con.query('update tokens set token = ?  where name=?',[newTokenAuthPP, type], function(err, tokenResponse) {
						if (err) {
							console.log(err);
							con.release();
						}

					console.log('New Token' + newTokenAuthPP);
					var optionsWithNewToken = {
					  url: options.url,
					  headers: {
						'Content-Type': 'application/json',
						'Authorization' :  newTokenAuthPP
					  }
					};
					
					request(optionsWithNewToken, function (error, response, bodyWithNewToken) {
						var reponseBodyWithNewToken = JSON.parse(bodyWithNewToken);
												
						if(reponseBodyWithNewToken.error== "invalid_token"){
							console.log(err);
							con.release();
							res.send({status : 1, message:'Failed to set new payment'});
						}else{
							processPaypalPayment(req, con, res, reponseBodyWithNewToken, userId);
						}	
					});
				});	
			}else{
				console.log(err);
				con.release();
				res.send({status : 1, message:'Failed to set new payment'});
			}
	
		});
	}	
		
	function processPaypalPayment(req, con, res, reponseBody, userId){
		console.log(reponseBody);
		if(reponseBody.state== "approved"){
			var totalAmount = parseFloat(reponseBody.transactions[0].amount.total).toFixed(2); 
			var fees = parseFloat(reponseBody.transactions[0].related_resources[0].sale.transaction_fee.value).toFixed(2);
			var addAmount = totalAmount - fees;
			addAmount =addAmount.toFixed(2);

			var expires= Date.now() + activeDays*24*60*60*1000;

			con.query('update users set admob = 1, expires= ?, lastreceipt = ? where utoken=?',[expires, req.headers.ppid, req.headers.utoken], function(err, updated) {
				if (err) {
					console.log(err);
					con.release();
					res.send({status: 1, message: 'Failed to pay'});

				}else{
					con.release();
					res.send({status: 2, message: 'Payed'});
				}
			});	
			
		}else{
			con.release();
			res.send({status : 1, message:'Failed to process payment'});
		}
	}	
	
}
module.exports = new Paypal();	