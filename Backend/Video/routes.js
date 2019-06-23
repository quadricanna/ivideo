var users = require('./models/users');
var video = require('./models/video');
var cors = require('cors')
var payment = require('./models/payment');

var paypal = require('./models/paypal');
var paypalSongs = require('./models/paypalSongs');

module.exports = {
  configure: function(app) {
	app.use(cors());
	 
	app.get('/getVideoInfo/', function(req, res) {
    video.getVideoInfo(req, res);
    });
	
	app.get('/getVideoInfoByName/', function(req, res) {
    video.getVideoInfoByName(req, res);
    });
	
	app.get('/clean/', function(req, res) {
      //video.clean(req, res);
  });
	
	app.get('/getSimilarMusic/', function(req, res) {
    video.getSimilarMusic(req, res);
    });
	
	app.get('/getThumb/', function(req, res) {
    video.getThumb(req, res);
    });

	//For inserting news for all persons
	app.get('/insertAll/', function(req, res) {
     // video.insertAll(req, res);
  });

	app.get('/getUsers/', function(req, res) {
    video.getUsers(req, res);
  });
	
	app.get('/getNotifications/', function(req, res) {
    video.getNotifications(req, res);
  });
	
	app.get('/hasWatched/', function(req, res) {
    video.hasWatched(req, res);
  });
	
	app.get('/getWatched/', function(req, res) {
    video.getWatched(req, res);
  });

  app.get('/hasDownloaded/', function(req, res) {
    video.hasDownloaded(req, res);
  });

	app.post('/share/', function(req, res) {
    video.share(req, res);
    });
	
	app.get('/enablePush/', function(req, res) {
      users.enablePush(req, res);
    });
	
	
    app.get('/users/', function(req, res) {
      users.get(res);
    });
	
	app.get('/updateUser/', function(req, res) {
      users.updateUser(req,res);
    });


	app.get('/restore/', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      video.restore(req, res);
    });
	
	 app.post('/backup/', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      video.backup(req, res);
    });

    app.post('/register/', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      users.register(req.body, res);
    });
 
    app.get('/login/', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		users.login(req, res);
    });

	  app.get('/updateMail/', function(req, res) {
      users.updateMail(req, res);
    });

    app.get('/changePW/', function(req, res) {
      users.changePW(req, res);
    });
    
    app.get('/sendPW/', function(req, res) {
      users.sendPW(req, res);
    });



    app.post('/checkPayment/', function(req, res) {
        paypal.checkPayment(req, res);
      });
  
      app.post('/checkPaymentSongs/', function(req, res) {
        paypalSongs.checkPayment(req, res);
      });
  
      app.get('/hasWatchedVideo/', function(req, res) {
        video.hasWatchedVideo(req, res);
      });

      app.get('/hasFreebie/', function(req, res) {
        video.hasFreebie(req, res);
      });
  
  
      app.post('/restorePayment/', function(req, res) {
        payment.restore(req, res);
      });
  
      app.get('/checkActivePayments/', function(req, res) {
        payment.checkActivePayments(req, res);
      });

      app.get('/checkVoucher/', function(req, res) {
        payment.checkVoucher(req, res);
      });

      
  }
};