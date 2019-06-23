webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaySongs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_rate__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_timeout__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PaySongs = (function () {
    function PaySongs(appRate, admobService, toastCtrl, loadingCtrl, platform, viewCtrl, globalVariablesService, http) {
        var _this = this;
        this.appRate = appRate;
        this.admobService = admobService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.globalVariablesService = globalVariablesService;
        this.http = http;
        this.payments = [
            {
                "songs": 25,
                "payment": 2.99,
                "image": "./assets/imgs/deephouse.jpg"
            }, {
                "songs": 50,
                "payment": 4.99,
                "image": "./assets/imgs/house.jpg"
            }, {
                "songs": 100,
                "payment": 9.99,
                "image": "./assets/imgs/us.jpg"
            }
        ];
        this.frees = [
            {
                "songs": 1,
                "key": "iner",
                "desc": "Click the advertisement",
                "image": "./assets/imgs/rap.jpg"
            }, {
                "songs": '3',
                "key": "rate",
                "desc": "Rate App Positively - IMPORTANT: Use your Username as Name - Just one time",
                "image": "./assets/imgs/deephouse.jpg"
            }, {
                "songs": '1',
                "key": "daily",
                "desc": "Daily Login",
                "image": "./assets/imgs/charts.jpg"
            }
        ];
        this.hasRated = "0";
        this.securityId = "init";
        this.lastSecurityId = "";
        this.voucher = "";
        var local_this1 = this;
        var local_this = this;
        document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function (e) {
            var toast = local_this1.toastCtrl.create({
                message: "Actually there are no ads available. Try again in some minutes ;)",
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
        document.addEventListener('admob.interstitial.events.EXIT_APP', function (err) {
            if (_this.lastSecurityId != _this.securityId) {
                var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                headers.append('Content-Type', 'application/json');
                headers.append('utoken', window.localStorage.getItem('utoken'));
                headers.append('type', 'Interstitial Click');
                local_this.http.get(_this.globalVariablesService.hostnameSecure + "hasFreebie?id=1&sec=1&sec2=" + _this.securityId, { headers: headers }).subscribe(function (data) {
                    window.localStorage.setItem('amountSongs', data.json().amountSongs);
                    local_this.admobService.addAdmob();
                    _this.lastSecurityId = _this.securityId;
                    var toast = local_this.toastCtrl.create({
                        message: "Thank you for your support. You can watch more video",
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }, function (error) {
                    console.log(JSON.stringify(error));
                });
            }
            else {
                var toast = local_this.toastCtrl.create({
                    message: "Sorry but you have to load a new ad for getting coins",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        });
        document.addEventListener('admob.rewardvideo.events.REWARD', function (err) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            headers.append('type', 'Rewardvideo');
            local_this.http.get(_this.globalVariablesService.hostnameSecure + "hasFreebie?id=1&sec=1", { headers: headers }).subscribe(function (data) {
                window.localStorage.setItem('amountSongs', data.json().amountSongs);
                local_this.admobService.addAdmob();
                var toast = local_this.toastCtrl.create({
                    message: "Thank you for your support. You can watch more video",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        });
        document.addEventListener('admob.rewardvideo.events.EXIT_APP', function (err) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            headers.append('type', 'Rewardvideo Click');
            local_this.http.get(_this.globalVariablesService.hostnameSecure + "hasFreebie?id=1&sec=1", { headers: headers }).subscribe(function (data) {
                window.localStorage.setItem('amountSongs', data.json().amountSongs);
                local_this.admobService.addAdmob();
                var toast = local_this.toastCtrl.create({
                    message: "Thank you for your support. You can watch more video",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        });
    }
    PaySongs.prototype.ionViewDidLoad = function () {
        this.hasRated = window.localStorage.getItem('rated');
    };
    PaySongs.prototype.initPayPal = function (element) {
        if (window.localStorage.getItem('username') == 'Credentials are wrong') {
            var toast = this.toastCtrl.create({
                message: 'Actually you are not logged in, please relogin otherwise we can not add credits to your account',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        this.paypal_initialized = true;
        var paypalbuttoncontainer = this.paypalbuttoncontainer.nativeElement;
        var newthis = this;
        paypal.Button.render({
            env: 'production',
            local: 'en_US',
            style: {
                size: 'responsive',
                color: 'blue',
                shape: 'rect',
                label: 'buynow',
                tagline: false
            },
            client: {
                sandbox: 'YOUR KEY',
                production: 'YOUR KEY'
            },
            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,
            payment: function (data, actions) {
                return actions.payment.create({
                    //weight_unit: "kgs",
                    enableShippingAddress: true,
                    payment: {
                        transactions: [
                            {
                                amount: {
                                    total: element.payment,
                                    currency: "EUR"
                                },
                                description: 'iVideo: ' + window.localStorage.getItem('username'),
                                custom: window.localStorage.getItem('username')
                            }
                        ]
                    }
                });
            },
            onCancel: function (data, actions) {
                //return actions.redirect();
            },
            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function (data, actions, error) {
                if (error) {
                    console.log("---------WE HAVE AN ERROR-------------------");
                    console.log("ERROR: " + error);
                }
                if (error === 'INSTRUMENT_DECLINED') {
                    actions.restart();
                }
                actions.payment.get().then(function (paymentDetails) {
                });
                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function (data) {
                    newthis.sendReceiptToServer(data);
                });
            }
        }, paypalbuttoncontainer);
    };
    PaySongs.prototype.sendReceiptToServer = function (receipt) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Verify your payment...',
        });
        this.loading.present();
        var path = "/checkPaymentSongs";
        var url = this.globalVariablesService.getHostname() + path;
        var data = {
            receipt: receipt
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        headers.append('ppid', receipt.id);
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.http.post(url, data, options).timeout(600000)
            .subscribe(function (response) {
            _this.loading.dismissAll();
            if (response.json().status == 2) {
                var availableSongs = parseInt(window.localStorage.getItem('amountSongs')) + parseInt(response.json().addSongs);
                window.localStorage.setItem('amountSongs', availableSongs.toString());
                var toast = _this.toastCtrl.create({
                    message: "Thank you for your support. We have added " + response.json().addSongs + " more songs",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: "Actually there was a problem with your payment. Maybe you should contact us",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (error) {
            _this.loading.dismissAll();
            // probably a bad url or 404
            console.log(JSON.stringify(error));
        });
    };
    PaySongs.prototype.dismiss = function () {
        var notification = {
            amountSongs: window.localStorage.getItem('amountSongs')
        };
        this.viewCtrl.dismiss(notification);
    };
    PaySongs.prototype.selectPackage = function (selectedPackage) {
        this.selectedPackage = selectedPackage;
        this.paypalbuttoncontainer.nativeElement.innerHTML = '';
        this.initPayPal(selectedPackage);
    };
    PaySongs.prototype.reward = function (free) {
        if (free.key == "video") {
            this.admobService.addRewardAdmob();
        }
        else if (free.key == "rate") {
            this.appRate.preferences.storeAppURL = {
                ios: '1435004764'
            };
            this.appRate.preferences.callbacks = {
                onRateDialogShow: function (callbacks) {
                    window.localStorage.setItem('rated', '1');
                },
                onButtonClicked: function (callbacks) {
                    window.localStorage.setItem('rated', '1');
                },
                handleNegativeFeedback: function (callbacks) {
                    window.localStorage.setItem('rated', '1');
                    var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                    headers.append('Content-Type', 'application/json');
                    headers.append('utoken', window.localStorage.getItem('utoken'));
                    headers.append('type', 'Rate App negativ');
                    this.http.get(this.globalVariablesService.hostnameSecure + "hasFreebie/?sec=1&id=-" + free.songs, { headers: headers }).subscribe(function (data) {
                        var availableSongs = parseInt(window.localStorage.getItem('amountSongs')) - 3;
                        window.localStorage.setItem('amountSongs', availableSongs.toString());
                    }, function (error) {
                        console.log(JSON.stringify(error));
                    });
                    alert('Please provide us some information what we can optimise');
                }
            };
            this.appRate.navigateToAppStore();
        }
        else if (free.key == "iner") {
            this.securityId = this.guid();
            this.admobService.addIntersAdmob();
        }
    };
    PaySongs.prototype.redeemVoucher = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Verify your payment...',
        });
        this.loading.present();
        var path = "/checkVoucher?voucher=" + this.voucher;
        var url = this.globalVariablesService.getHostname() + path;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.http.get(url, options).timeout(600000)
            .subscribe(function (response) {
            _this.loading.dismissAll();
            if (response.json().status == 2) {
                var availableSongs = parseInt(window.localStorage.getItem('amountSongs')) + parseInt(response.json().addSongs);
                window.localStorage.setItem('amountSongs', availableSongs.toString());
                var toast = _this.toastCtrl.create({
                    message: "Thank you for your support. We have added " + response.json().addSongs + " more songs",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: "Actually there was a problem with your voucher.",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    PaySongs.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    return PaySongs;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('paypalbuttoncontainer'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], PaySongs.prototype, "paypalbuttoncontainer", void 0);
PaySongs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-paySongs',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/paySongs/paySongs.html"*/'<ion-header>\n  <ion-navbar>\n\n    <ion-title>\n      Add more Videos\n    </ion-title>\n\n    <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">Back</span>\n          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list-header>\n    Get Free Videos\n  </ion-list-header>\n\n    <ion-list>\n      <ng-container *ngFor="let free of frees; let i = index;">\n        <ion-item *ngIf="(hasRated != \'1\' && free.key == \'rate\')||  free.key != \'rate\'" (click) = "reward(free)">\n            <ion-thumbnail  item-start>\n                <img src="{{free.image}}">\n              </ion-thumbnail>\n              <h2>{{free.songs}} Coin</h2>\n              <p text-wrap>{{free.desc}}</p>\n        </ion-item>\n      </ng-container>\n\n    </ion-list>\n\n  <ion-list-header>\n    Choose your package\n  </ion-list-header>\n  <div #paypalbuttoncontainer id="paypal-button-container" ></div>\n\n    <ion-list>\n      <ion-item *ngFor="let payment of payments; let i = index;" (click) = "selectPackage(payment)">\n          <ion-thumbnail item-start>\n            <img src="{{payment.image}}">\n          </ion-thumbnail>\n          <h2>{{payment.songs}} Coins</h2>\n\n          <button ion-button clear item-end>\n            <button item-start text-center *ngIf="selectedPackage == payment">\n                <ion-icon style="margin-top:5px;font-size:25px;color:rgb(52, 55, 196)" name="star" ></ion-icon>\n              </button>\n              <ion-badge style="font-size:15px;" item-end>{{payment.payment}}€</ion-badge>  \n          </button>\n        \n      </ion-item>\n\n    </ion-list>\n\n    <ion-list-header>\n        Redeem Voucher\n      </ion-list-header>\n    \n        <ion-list>\n            <ion-item>\n                <ion-label color="primary"  floating>Voucher</ion-label>\n                <ion-input [value]="voucher" [(ngModel)]="voucher" ></ion-input>\n              </ion-item>\n              <button (click) = "redeemVoucher()" ion-button block>redeem</button>\n\n        </ion-list>\n    \n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/paySongs/paySongs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_app_rate__["a" /* AppRate */], __WEBPACK_IMPORTED_MODULE_4__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], PaySongs);

//# sourceMappingURL=paySongs.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users_users__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_notification__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_service__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_moreAction__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_share__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_pro__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var HomePage = (function () {
    function HomePage(pro, alertCtrl, geolocation, device, shareSrv, modalCtrl, moreActionService, admobService, backgroundMode, loadingCtrl, platform, toastCtrl, globalVariablesService, navCtrl, authserviceCtrl, http) {
        this.pro = pro;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.device = device;
        this.shareSrv = shareSrv;
        this.modalCtrl = modalCtrl;
        this.moreActionService = moreActionService;
        this.admobService = admobService;
        this.backgroundMode = backgroundMode;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.globalVariablesService = globalVariablesService;
        this.navCtrl = navCtrl;
        this.authserviceCtrl = authserviceCtrl;
        this.http = http;
        this.videos = [];
        this.maxResults = 30;
        this.searchModel = "";
        this.username = "";
        this.appVersion = "1.3.1";
        this.notWatched = 0;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        if (window.localStorage.getItem('utoken') == null) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (window.localStorage.getItem('utoken') != null) {
            this.platform.ready().then(function () {
                _this.getNewNotifications();
                _this.geolocation.getCurrentPosition().then(function (resp) {
                    _this.updateUser(resp.coords.longitude, resp.coords.latitude);
                }).catch(function (error) {
                    _this.updateUser("", "");
                });
                _this.admobService.addAdmob();
            });
        }
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.videos.forEach(function (element) {
            element.snippet.channelId = 'false';
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (window.localStorage.getItem('utoken') != null) {
            this.platform.ready().then(function () {
                _this.backgroundMode.enable();
                _this.username = window.localStorage.getItem('username');
            });
        }
    };
    HomePage.prototype.getNewNotifications = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.http.get(this.globalVariablesService.getHostname() + "getWatched", { headers: headers }).subscribe(function (data) {
            _this.notWatched = data.json().message;
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomePage.prototype.updateUser = function (lng, lat) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Headers */]();
        headers.append('utoken', window.localStorage.getItem('utoken'));
        var creds = "/updateUser?lastlong=" + lng + "&lastlat=" + lat + "&language=" + navigator.language + "&uuid=" + this.device.uuid + "&platform=" + this.device.platform + "&model=" + this.device.model + "&platformversion=" + this.device.version + "&appversion=" + this.appVersion;
        this.http.get(this.globalVariablesService.getHostname() + creds, { headers: headers }).subscribe(function (data) {
            window.localStorage.setItem('username', data.json().message);
            if (window.localStorage.getItem('username') == 'Credentials are wrong') {
                var toast = _this.toastCtrl.create({
                    message: 'Actually you are not logged in, please relogin or create a new Account',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
            window.localStorage.setItem('admob', data.json().admob);
            window.localStorage.setItem('amountSongs', data.json().amountSongs);
            window.localStorage.setItem('sessions', data.json().sessions);
            window.localStorage.setItem('email', data.json().email);
            _this.username = data.json().message;
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    HomePage.prototype.getItems = function () {
        var _this = this;
        // set val to the value of the searchbar
        var val = this.searchModel;
        this.videos = [];
        if (typeof val != 'undefined' && val.length > 0) {
            var creds = "search?key=<YOUR YT API KEY >&maxResults=" + this.maxResults + "&part=snippet&q=" + val;
            this.http.get(this.globalVariablesService.getAPI() + creds).subscribe(function (data) {
                var videosLocal = data.json().items;
                videosLocal.forEach(function (element) {
                    element.snippet.channelId = 'false';
                    _this.videos.push(element);
                });
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    };
    HomePage.prototype.loadingVideo = function (video) {
        if (video.snippet.channelId == 'false') {
            video.snippet.channelId = 'true';
        }
    };
    HomePage.prototype.more = function (video) {
        this.moreActionService.getDirectories();
        this.globalVariablesService.setVideo(video.id.videoId);
        this.globalVariablesService.setTitle(video.snippet.title);
        this.globalVariablesService.setThumb(video.snippet.thumbnails.high.url);
    };
    HomePage.prototype.share = function (video) {
        var _this = this;
        var videoId = video.id.videoId;
        var videoTitle = video.snippet.title;
        var picture = video.snippet.thumbnails.high.url;
        var usersModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__users_users__["a" /* Users */], { videoTitle: videoTitle, videoId: videoId, picture: picture });
        usersModal.onDidDismiss(function (data) {
            var notification = data;
            _this.shareSrv.sendSharing(notification);
        });
        usersModal.present();
    };
    HomePage.prototype.notification = function () {
        var _this = this;
        var notificationsModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__notification_notification__["a" /* NotificationPage */]);
        notificationsModal.onDidDismiss(function (data) {
            _this.getNewNotifications();
        });
        notificationsModal.present();
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Logout',
            message: 'Would you like to leave the app?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.authserviceCtrl.logout(_this.tabBarElement);
                    }
                }
            ]
        });
        confirm.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only small (click)="notification()">\n              <ion-icon *ngIf="notWatched == 0" name="ios-notifications-outline"></ion-icon>\n              <ion-icon  *ngIf="notWatched != 0" name="notifications"></ion-icon><span *ngIf="notWatched != 0">{{notWatched}}</span>\n            </button>\n          <br/><br/>\n       \n      </ion-buttons>\n    <ion-title>Search</ion-title>\n    \n   <br/> <br/><br/>\n  <ion-buttons end>\n      <button ion-button clear small end style="float: right;background-color:transparent !important; color: grey; font-size:14px;" (click)="logout()">\n         {{username}} <br/>Logout?\n      </button>\n      <br/><br/>\n    \n  </ion-buttons>\n\n  </ion-navbar>\n  <ion-searchbar type="search" autocomplete="on"  debounce="800" autocorrect="off" (ionInput)="getItems()" [(ngModel)] = "searchModel"></ion-searchbar>\n</ion-header>\n\n<ion-content padding>\n\n  <span *ngFor="let video of videos">\n    <ion-card *ngIf="video.id.videoId">\n      \n        <ion-item >\n          <ion-avatar item-start>\n            <img src="{{video.snippet.thumbnails.default.url}}">\n          </ion-avatar>\n          <h2>{{video.snippet.title}}</h2>\n          <p>{{video.snippet.publishedAt | amTimeAgo}} </p>\n        </ion-item>\n\n        <img *ngIf="video.snippet.channelId == \'false\'" src="{{video.snippet.thumbnails.high.url}}" (click)="loadingVideo(video)">\n        \n        <iframe *ngIf="video.snippet.channelId == \'true\'" [src]="video.id.videoId | youtube" frameborder="0" width="100%" height="315"></iframe>\n        \n      \n        <ion-card-content>\n          <p>{{video.snippet.description}}</p>\n        </ion-card-content>\n\n        <ion-grid center text-center>\n          <ion-row >\n            <ion-col col-12 align-items-center  >\n              <button ion-button icon-left small outline  (click)="loadingVideo(video)">\n                <ion-icon name="play"></ion-icon>\n                <div>Play</div>\n              </button>\n\n              <button ion-button outline  icon-left outline small  (click)="share(video)">  \n                <ion-icon name="share"></ion-icon>\n                <div>Share</div>\n              </button>\n              <button ion-button outline  icon-left outline small  (click)="more(video)">  \n                <ion-icon name="cloud-download"></ion-icon>\n                <div>Download</div>\n              </button>\n\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </span>\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/home/home.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_7__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_14__ionic_native_pro__["a" /* Pro */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_10__providers_share__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_9__providers_moreAction__["a" /* MoreActionService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__providers_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__password_password__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPage = (function () {
    function LoginPage(modalCtrl, loadingCtrl, oneSignal, platform, menu, authserviceCtrl, navcontroller, globalVariablesServ) {
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.oneSignal = oneSignal;
        this.platform = platform;
        this.menu = menu;
        this.authserviceCtrl = authserviceCtrl;
        this.navcontroller = navcontroller;
        this.globalVariablesServ = globalVariablesServ;
        this.agbs = false;
        this.myservice = authserviceCtrl;
        this.nav = navcontroller;
        this.usercreds = {
            name: '',
            password: ''
        };
        globalVariablesServ.setIsLoggedIn(false);
        this.mode = 1;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.tabBarElement.style.display = 'none';
    }
    LoginPage.prototype.login = function (usercreds) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Login...',
        });
        this.loading.present();
        if (this.platform.is('android')) {
            //   this.oneSignal.startInit("YOUR ID", "YOUR ID");
        }
        else {
            //   this.oneSignal.startInit("YOUR ID", "");
        }
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(function () {
            // do something when the notification is received.
        });
        this.oneSignal.handleNotificationOpened().subscribe(function () {
            // do something when the notification is opened.
        });
        this.oneSignal.endInit();
        this.oneSignal.getIds().then(function (pushData) {
            // this gives you back the new userId and pushToken associated with the device. Helpful.
            _this.loading.dismissAll();
            _this.myservice.login(usercreds, pushData.userId, pushData.pushToken, _this.tabBarElement);
        });
    };
    LoginPage.prototype.register = function (usercreds) {
        var _this = this;
        if (this.agbs == true) {
            this.loading = this.loadingCtrl.create({
                content: 'Register...',
            });
            this.loading.present();
            if (this.platform.is('android')) {
                //   this.oneSignal.startInit("YOUR ID", "YOUR ID");
            }
            else {
                //   this.oneSignal.startInit("YOUR ID", "");
            }
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.setSubscription(true);
            this.oneSignal.handleNotificationReceived().subscribe(function () {
                // do something when the notification is received.
            });
            this.oneSignal.handleNotificationOpened().subscribe(function () {
                // do something when the notification is opened.
            });
            this.oneSignal.endInit();
            //pushData.userId
            //pushData.pushToken
            this.oneSignal.getIds().then(function (pushData) {
                _this.loading.dismissAll();
                _this.myservice.register(usercreds, pushData.userId, pushData.pushToken, _this.tabBarElement);
            });
        }
        else {
            alert('Please check our Conditions');
        }
    };
    LoginPage.prototype.checkAGBS = function () {
        this.agbs = !this.agbs;
    };
    LoginPage.prototype.passwordReset = function () {
        var passwordModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__password_password__["a" /* Password */]);
        passwordModal.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/login/login.html"*/'<!--\n  Generated template for the Login page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <ion-title *ngIf="mode==0">Login</ion-title>\n      <ion-title *ngIf="mode==1">Register</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  \n  <ion-content padding>\n  \n  <ion-list *ngIf="mode==0">\n   \n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="usercreds.name" type="text"></ion-input>\n    </ion-item>\n   \n    <ion-item style="margin-bottom:40px">\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="usercreds.password" type="password"></ion-input>\n    </ion-item>\n  \n      <button full ion-button icon-left (click)="login(usercreds)" style="margin-bottom:10px">\n        <ion-icon name="contact"></ion-icon>\n         Login\n      </button>\n  \n      <ion-grid>\n          <ion-row>\n            <ion-col col-6>\n                <button outline full  ion-button icon-left (click)="mode=1">\n                  <ion-icon name="contacts"></ion-icon>\n                    No Account? \n                </button>\n            </ion-col>\n            <ion-col col-6>\n                <button outline full ion-button icon-left (click)="passwordReset()">\n                    <ion-icon name="contact"></ion-icon>\n                      Password reset?\n                  </button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n  </ion-list>\n  \n  <ion-list *ngIf="mode==1">\n   \n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input [(ngModel)]="usercreds.name" type="text"></ion-input>\n    </ion-item>\n  \n    <ion-item style="margin-bottom:10px">\n      <ion-label floating>Password</ion-label>\n      <ion-input [(ngModel)]="usercreds.password" type="password"></ion-input>\n    </ion-item>\n  \n    <ion-item >\n        <ion-label>App-Store AGBs</ion-label>\n        <ion-checkbox click="checkAGBS()" [(ngModel)]="agbs"></ion-checkbox>\n    </ion-item>\n  <br/>\n    <button full ion-button icon-left (click)="register(usercreds)" style="margin-bottom:10px">\n        <ion-icon name="contacts"></ion-icon>\n         Register\n      </button>\n  \n      <ion-grid>\n          <ion-row>\n            <ion-col col-6>\n                <button outline full ion-button icon-left (click)="mode=0">\n                  <ion-icon name="contact"></ion-icon>\n                    Login?\n                </button>\n            </ion-col>\n            <ion-col col-6>\n                <button outline  full ion-button icon-left (click)="passwordReset()">\n                  <ion-icon name="contact"></ion-icon>\n                    Password reset?\n                </button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n  \n  </ion-list>\n  \n  </ion-content>\n  '/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/login/login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__["a" /* GlobalVariablesService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVariablesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var GlobalVariablesService = (function () {
    function GlobalVariablesService(http) {
        this.http = http;
        this.videoId = [];
        this.title = "";
        this.thumb = "";
        this.mp3Api = "";
        this.autoPlay = false;
        this.refresh = true;
        this.moveDir = [];
        this.isLoggedin = false;
        this.hostname = "http://YOUR API/";
        this.hostnameSecure = "http://YOUR API/";
        this.allAppHostname = "http://YOUR API/";
        this.api = "https://www.googleapis.com/youtube/v3/";
        this.mp3Api = "http://YOUR DOWNLOAD API/";
    }
    GlobalVariablesService.prototype.setIsLoggedIn = function (value) {
        this.isLoggedin = value;
    };
    GlobalVariablesService.prototype.getAutoPlay = function () {
        return this.autoPlay;
    };
    GlobalVariablesService.prototype.setAutoPlay = function (autoPlay) {
        this.autoPlay = autoPlay;
    };
    GlobalVariablesService.prototype.getVideo = function () {
        return this.videoId;
    };
    GlobalVariablesService.prototype.setVideo = function (videoId) {
        this.videoId = videoId;
    };
    GlobalVariablesService.prototype.getThumb = function () {
        return this.thumb;
    };
    GlobalVariablesService.prototype.setThumb = function (thumb) {
        this.thumb = thumb;
    };
    GlobalVariablesService.prototype.getTitle = function () {
        return this.title;
    };
    GlobalVariablesService.prototype.setTitle = function (title) {
        this.title = title;
    };
    GlobalVariablesService.prototype.getMP3Api = function () {
        return this.mp3Api;
    };
    GlobalVariablesService.prototype.getAPI = function () {
        return this.api;
    };
    GlobalVariablesService.prototype.getIsLoggedIn = function () {
        return this.isLoggedin;
    };
    GlobalVariablesService.prototype.getHostname = function () {
        return this.hostname;
    };
    return GlobalVariablesService;
}());
GlobalVariablesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], GlobalVariablesService);

//# sourceMappingURL=global-variables.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__news_news__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_player__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playlist_playlist__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__news_news__["a" /* NewsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__playlist_playlist__["a" /* PlaylistPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__player_player__["a" /* PlayerPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Search" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Charts" tabIcon="star"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="My Playlists" tabIcon="contacts"></ion-tab>  \n  <ion-tab [root]="tab4Root" tabTitle="Player" tabIcon="musical-notes"></ion-tab>\n</ion-tabs>\n\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__myapps_myapps__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__subnews_subnews__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NewsPage = (function () {
    function NewsPage(loadingCtrl, modalCtrl, admobService, navCtrl, http, globalVariablesService, platform, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.admobService = admobService;
        this.navCtrl = navCtrl;
        this.http = http;
        this.globalVariablesService = globalVariablesService;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.type = "classic";
        this.videos = [];
        this.arrayOfListKeys = [];
        this.currentIndex = 0;
        this.listCharts = {
            albums: [],
            lists: [],
            popular: [],
            classic: [
                {
                    "listId": "PL6D4C31FFA7EBABB5",
                    "results": 50,
                    "image": "./assets/imgs/charts.jpg",
                    "name": "Top Charts",
                    "tracks": ""
                }, {
                    //"listId":"PLV6K7Y6qgT3XEUqr0wdcMsJURoj_K5574",
                    "listId": "PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj",
                    "results": 50,
                    "image": "./assets/imgs/pop.jpg",
                    "name": "Pop & Rock",
                    "tracks": ""
                }, {
                    "listId": "PL7Vr8XNhXsJAKgFY8jlTUAgiMDByR3oaw",
                    "results": 50,
                    "image": "./assets/imgs/house.jpg",
                    "name": "House Music",
                    "tracks": ""
                }, {
                    "listId": "PLToQGg12V725ccu7cfjFY1tsOYGeqHyV8",
                    "results": 50,
                    "image": "./assets/imgs/house2.jpg",
                    "name": "House Music",
                    "tracks": ""
                }, {
                    "listId": "PLFqEc99ShGt14pTbICAYb7wIjBBvTRSpo",
                    "results": 50,
                    "image": "./assets/imgs/workout.jpg",
                    "name": "Workout",
                    "tracks": ""
                }, {
                    "listId": "PLN3h3MQ8RhVy7CtflMwSvV7AN3-dxxBZH",
                    "results": 50,
                    "image": "./assets/imgs/us.jpg",
                    "name": "US Top Charts",
                    "tracks": ""
                }, {
                    "listId": "PLlYKDqBVDxX03U-pKzWErlAdOfuJUEs4v",
                    "results": 50,
                    "image": "./assets/imgs/germanrap.jpg",
                    "name": "German Rap",
                    "tracks": ""
                }, {
                    "listId": "PLjzeyhEA84sS6ogo2mXWdcTrL2HRfJUv8",
                    "results": 50,
                    "image": "./assets/imgs/deephouse.jpg",
                    "name": "Deep House Music",
                    "tracks": ""
                }, {
                    "listId": "PLMmqTuUsDkRLtdjad9RRXnKcYyazZKrI5",
                    "results": 50,
                    "image": "./assets/imgs/rap.jpg",
                    "name": "Rap Music",
                    "tracks": ""
                }, {
                    "listId": "PLRZlMhcYkA2EQRcAq4nf7pFP3LcD5uX7h",
                    "results": 50,
                    "image": "./assets/imgs/us.jpg",
                    "name": "Rap Music",
                    "tracks": ""
                }
            ]
        };
    }
    NewsPage.prototype.showSubNews = function (type, index, name, key, listId) {
        var videos = this.listCharts.classic;
        this.loadMusicGenre(index, type, name);
    };
    NewsPage.prototype.loadMusicGenre = function (index, type, name) {
        var _this = this;
        var videos = [];
        if (index == 3 && this.listCharts.classic[3].tracks.length == 0) {
            this.loading = this.loadingCtrl.create({
                content: 'Loading...',
            });
            this.loading.present();
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            var creds = "getSimilarMusic";
            this.http.get(this.globalVariablesService.getHostname() + creds, { headers: headers }).timeout(10000).subscribe(function (data) {
                var tempVideos = data.json().items;
                tempVideos.forEach(function (element) {
                    element.snippet.channelId = 'false';
                    if (element.snippet.thumbnails) {
                        videos.push(element);
                    }
                });
                _this.listCharts.classic[3].tracks = videos;
                _this.loading.dismissAll();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__subnews_subnews__["a" /* SubnewsPage */], { videos: _this.listCharts.classic[3].tracks, type: type, name: name });
            }, function (err) {
                _this.loading.dismissAll();
            });
        }
        else if (this.listCharts.classic[index].tracks.length == 0) {
            this.loading = this.loadingCtrl.create({
                content: 'Loading...',
            });
            this.loading.present();
            var creds = "playlistItems?part=snippet&playlistId=" + this.listCharts.classic[index].listId + "&key=YOUR API KEY&maxResults=" + this.listCharts.classic[index].results;
            this.http.get(this.globalVariablesService.getAPI() + creds).timeout(10000).subscribe(function (data) {
                var tempVideos = data.json().items;
                tempVideos.forEach(function (element) {
                    element.snippet.channelId = 'false';
                    if (element.snippet.thumbnails) {
                        videos.push(element);
                    }
                });
                _this.listCharts.classic[index].tracks = videos;
                _this.loading.dismissAll();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__subnews_subnews__["a" /* SubnewsPage */], { videos: _this.listCharts.classic[index].tracks, type: type, name: name });
            }, function (err) {
                _this.loading.dismissAll();
            });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__subnews_subnews__["a" /* SubnewsPage */], { videos: this.listCharts.classic[index].tracks, type: type, name: name });
        }
    };
    NewsPage.prototype.showApps = function () {
        var myApps = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__myapps_myapps__["a" /* MyApps */]);
        myApps.present();
    };
    return NewsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
], NewsPage.prototype, "slides", void 0);
NewsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-news',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/news/news.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Charts &amp; More\n    </ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only small style="float: right;background-color:transparent !important; color: rgb(52, 55, 196) !important;" (click)="showApps()">\n            <ion-icon name="appstore"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="type">\n      <ion-segment-button value="classic">\n          Classic\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-list>\n      <ion-list-header>{{ type }}</ion-list-header>\n      <ion-item *ngFor="let item of getItems(type);let i = index;" (click)="showSubNews(type, i, item.name, \'\', item.id)">\n          <ion-thumbnail item-start>\n              <img [src]="item.image">\n          </ion-thumbnail>\n        {{ item.name }}\n      </ion-item>\n    </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/news/news.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
], NewsPage);

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_market__ = __webpack_require__(219);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApps = (function () {
    function MyApps(market, loadingCtrl, platform, viewCtrl, globalVariablesService, http) {
        this.market = market;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.globalVariablesService = globalVariablesService;
        this.http = http;
        this.apps = [];
    }
    MyApps.prototype.ionViewDidLoad = function () {
        this.getItems();
    };
    MyApps.prototype.getItems = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
        this.loading.present();
        this.apps = [];
        var creds = "info.html";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        this.http.get(this.globalVariablesService.allAppHostname + creds, { headers: headers }).subscribe(function (data) {
            _this.loading.dismissAll();
            _this.apps = data.json();
        }, function (error) {
            _this.loading.dismissAll();
            _this.viewCtrl.dismiss();
            console.log(JSON.stringify(error));
        });
    };
    MyApps.prototype.openApp = function (app) {
        var appId = app.keyIos;
        if (this.platform.is('android')) {
            appId = app.keyAndroid;
        }
        this.market.open(appId);
    };
    MyApps.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return MyApps;
}());
MyApps = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-myapps',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/myapps/myapps.html"*/'<ion-header>\n  <ion-navbar>\n\n    <ion-title>\n      More Apps\n    </ion-title>\n\n    <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">Back</span>\n          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n\n  <ion-list-header>\n    All Apps\n  </ion-list-header>\n\n    <ion-list>\n      <ion-item *ngFor="let app of apps; let i = index;" (click)="openApp(app)">\n        <ion-thumbnail item-start>\n          <img src="{{app.image}}">\n        </ion-thumbnail>\n        <h2>{{app.name}}</h2>\n        <p>{{app.desc}}</p>\n      </ion-item>\n    </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/myapps/myapps.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ionic_native_market__["a" /* Market */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], MyApps);

//# sourceMappingURL=myapps.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubnewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_share__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_download__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_moreAction__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SubnewsPage = (function () {
    function SubnewsPage(toastCtrl, moreActionService, dlService, httpCtrl, shareSrv, modalCtrl, moreActionSrv, platform, actionSheetCtrl, params, file, admobService, navCtrl, globalVariablesService) {
        this.toastCtrl = toastCtrl;
        this.moreActionService = moreActionService;
        this.dlService = dlService;
        this.httpCtrl = httpCtrl;
        this.shareSrv = shareSrv;
        this.modalCtrl = modalCtrl;
        this.moreActionSrv = moreActionSrv;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.params = params;
        this.file = file;
        this.admobService = admobService;
        this.navCtrl = navCtrl;
        this.globalVariablesService = globalVariablesService;
        this.videos = [];
        this.name = "Charts";
    }
    SubnewsPage.prototype.ionViewWillEnter = function () {
        this.videos = [];
        this.videos = this.params.get('videos');
        this.type = this.params.get('type');
        this.name = this.params.get('name');
    };
    SubnewsPage.prototype.loadingVideo = function (video) {
        if (video.snippet && video.snippet.channelId == 'false') {
            video.snippet.channelId = 'true';
        }
        else if (video.loaded && video.loaded == 'false') {
            video.loaded = 'true';
        }
    };
    SubnewsPage.prototype.ionViewDidLeave = function () {
        this.videos = [];
    };
    SubnewsPage.prototype.more = function (video) {
        this.moreActionService.getDirectories();
        if (video.snippet) {
            this.globalVariablesService.setVideo(video.snippet.resourceId.videoId);
            this.globalVariablesService.setTitle(video.snippet.title);
            this.globalVariablesService.setThumb(video.snippet.thumbnails.high.url);
        }
        else {
            this.globalVariablesService.setVideo(video.ytId);
            this.globalVariablesService.setTitle(video.ytName);
            this.globalVariablesService.setThumb(video.ytthumb);
        }
    };
    SubnewsPage.prototype.downloadList = function () {
        if (this.videos.length > window.localStorage.getItem('amountSongs')) {
            this.dlService.needToPay();
        }
        else {
            if (this.videos.length > 0) {
                this.moreActionService.listDirWithListLoad("download", this.videos);
            }
            else {
                var toast = this.toastCtrl.create({
                    message: 'Actual not all videos are loaded, please try again',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }
    };
    return SubnewsPage;
}());
SubnewsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-subnews',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/subnews/subnews.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        {{name}}\n    </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list *ngIf="type == \'classic\'">\n    <ion-item>\n        <button class="download" ion-button block outline (click)="downloadList()">\n            Download All?\n          </button>\n    </ion-item>\n    <ion-item *ngFor="let video of videos"  (click)="loadingVideo(video)" >\n      <ion-thumbnail item-start > \n        <img *ngIf="video.snippet.channelId == \'false\'" src="{{video.snippet.thumbnails.default.url}}" >\n        <iframe *ngIf="video.snippet.channelId == \'true\'" clear item-end [src]="video.snippet.resourceId.videoId | youtube" frameborder="0" width="60" height="60"></iframe>          \n      </ion-thumbnail>\n      <h2>{{video.snippet.title}}</h2>\n      <p>{{video.snippet.publishedAt | amTimeAgo}}</p>\n      <button class="more" ion-button item-end small outline (click)="more(video)">  \n        <ion-icon class="more" name="more"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf="type!=\'classic\'">\n    <ion-item>\n        <button class="download" ion-button block outline (click)="downloadList()">\n            Download All?\n          </button>\n    </ion-item>\n    <ion-item *ngFor="let video of videos"  (click)="loadingVideo(video)" >\n      <ion-thumbnail item-start > \n        <img *ngIf="video.loaded == \'false\'" [src]="video.ytthumb" >\n        <iframe *ngIf="video.loaded == \'true\'" clear item-end [src]="video.ytId | youtube" frameborder="0" width="60" height="60"></iframe>          \n      </ion-thumbnail>\n      <h2>{{video.ytName}}</h2>\n      <p>{{video.album_release_date | amTimeAgo}}</p>\n      <button class="more" ion-button item-end small outline (click)="more(video)">  \n        <ion-icon class="more" name="more"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/subnews/subnews.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_moreAction__["a" /* MoreActionService */], __WEBPACK_IMPORTED_MODULE_6__providers_download__["a" /* DownloadService */], __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_5__providers_share__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__providers_moreAction__["a" /* MoreActionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__["a" /* GlobalVariablesService */]])
], SubnewsPage);

//# sourceMappingURL=subnews.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_music_controls__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_media__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_streaming_media__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PlayerPage = (function () {
    function PlayerPage(http, toastCtrl, streamingMedia, fileObject, domSanitizer, media, admobService, musicControls, platform, navCtrl, globalVariablesService) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.streamingMedia = streamingMedia;
        this.fileObject = fileObject;
        this.domSanitizer = domSanitizer;
        this.media = media;
        this.admobService = admobService;
        this.musicControls = musicControls;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.globalVariablesService = globalVariablesService;
        this.displayFormat = 'portrait';
        this.isPortrait = "true";
        this.url = "";
        this.videoURL = [];
        this.playlistPara = 0;
        this.videoTitle = "";
        this.videoThumbPath = "";
        this.videoThumb = "";
        this.isSingleRepeating = "false";
        this.isShuffle = "false";
        this.hasPayed = 0;
    }
    PlayerPage.prototype.ionViewDidLeave = function () {
        this.globalVariablesService.setAutoPlay(false);
    };
    PlayerPage.prototype.ionViewDidLoad = function () {
        //check when interstitial is closed
        document.addEventListener('admob.interstitial.events.CLOSE', function (event) {
            // this.admobService.addAdmob();
        });
    };
    PlayerPage.prototype.ionViewWillEnter = function () {
        this.admobService.hideBanner();
        this.hasPayed = parseInt(window.localStorage.getItem('admob'));
        if (this.hasPayed != 1 && parseInt(window.localStorage.getItem('sessions')) < 10) {
            this.hasPayed = 1;
        }
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]({ enableLongStackTrace: false });
        this.setupPayPay();
        if (window.localStorage.getItem('admob') != '1' && parseInt(window.localStorage.getItem('sessions')) > 10) {
            this.admobService.addIntersAdmob();
        }
        if (this.globalVariablesService.getAutoPlay()) {
            this.videoURL = this.globalVariablesService.getVideo();
            if (this.videoURL.length > 0) {
                this.playlistPara = 0;
                this.play(this.playlistPara);
            }
        }
    };
    PlayerPage.prototype.playNext = function () {
        var _this = this;
        this.zone.run(function () {
            if (_this.isShuffle == "true") {
                _this.getShuffleIndex();
            }
            else if (_this.isSingleRepeating == "false") {
                _this.playlistPara += 1;
                //start from beginning
                if (_this.videoURL.length > _this.playlistPara) {
                }
                else {
                    _this.playlistPara = 0;
                }
            }
            _this.play(_this.playlistPara);
        });
    };
    PlayerPage.prototype.changeIsSingleRepeating = function () {
        if (this.isSingleRepeating == "false") {
            this.isShuffle = "false";
            this.isSingleRepeating = "true";
        }
        else {
            this.isSingleRepeating = "false";
        }
    };
    PlayerPage.prototype.changeIsShuffle = function () {
        if (this.isShuffle == "false") {
            this.isSingleRepeating = "false";
            this.isShuffle = "true";
        }
        else {
            this.isShuffle = "false";
        }
    };
    PlayerPage.prototype.changePortait = function () {
        if (this.isPortrait == "false") {
            this.displayFormat = "portrait";
            this.isPortrait = "true";
        }
        else {
            this.displayFormat = "landscape";
            this.isPortrait = "false";
        }
    };
    PlayerPage.prototype.playPre = function () {
        if (this.isShuffle == "true") {
            this.getShuffleIndex();
        }
        else if (this.isSingleRepeating == "false") {
            if (this.playlistPara > 0) {
                this.playlistPara -= 1;
            }
            else {
                this.playlistPara = this.videoURL.length - 1;
            }
        }
        this.play(this.playlistPara);
    };
    PlayerPage.prototype.getShuffleIndex = function () {
        var newIndex = this.playlistPara;
        if (this.videoURL.length > 1) {
            while (newIndex == this.playlistPara) {
                newIndex = Math.floor(Math.random() * this.videoURL.length);
            }
        }
        this.playlistPara = newIndex;
    };
    PlayerPage.prototype.play = function (paraId) {
        var _this = this;
        this.videoTitle = this.videoURL[paraId].name;
        var thumb = this.videoURL[paraId].name.replace(".mp4", ".jpg");
        var videoDict = this.videoURL[paraId].fullPath.replace(this.videoTitle, "");
        this.videoThumbPath = this.fileObject.dataDirectory + videoDict + thumb;
        this.fileObject.readAsDataURL(this.fileObject.dataDirectory + videoDict, thumb).then(function (file) {
            _this.videoThumb = file;
            _this.run(paraId);
        })
            .catch(function (err) {
            _this.run(paraId);
            console.log(JSON.stringify(err));
        });
    };
    PlayerPage.prototype.run = function (paraId) {
        this.url = this.videoURL[paraId].toURL();
        this.playvideo(this.url);
    };
    PlayerPage.prototype.onPlayed = function (direction, how) {
        if (direction == "for") {
            this.playNext();
        }
        else if (direction == "back") {
            this.playPre();
        }
    };
    PlayerPage.prototype.onErrorMusic = function (error) {
        console.log(JSON.stringify(error));
    };
    PlayerPage.prototype.playvideo = function (url) {
        var _this = this;
        if (this.streamingMedia && url.length > 0) {
            var options = {
                successCallback: function () {
                    _this.onPlayed('for', "auto");
                },
                errorCallback: function (e) { console.log('Error streaming'); },
                orientation: this.displayFormat.toString(),
                shouldAutoClose: true,
                controls: false
            };
            this.streamingMedia.playVideo(url, options);
        }
    };
    /*
       PAY
       */
    PlayerPage.prototype.setupPayPay = function () {
        if (!this.paypal_initialized) {
            this.initPayPal();
        }
    };
    PlayerPage.prototype.initPayPal = function () {
        this.paypal_initialized = true;
        var paypalbuttoncontainer = this.paypalbuttoncontainer.nativeElement;
        var _thiss = this;
        paypal.Button.render({
            env: 'production',
            local: 'en_US',
            style: {
                size: 'responsive',
                color: 'black',
                shape: 'rect',
                label: 'paypal',
                tagline: false
            },
            client: {
                sandbox: 'YOUR KEY',
                production: 'YOUR KEY'
            },
            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,
            payment: function (data, actions) {
                return actions.payment.create({
                    //weight_unit: "kgs",
                    enableShippingAddress: true,
                    payment: {
                        transactions: [
                            {
                                amount: {
                                    total: "1.99",
                                    currency: "EUR"
                                },
                                description: 'iVideo Monthly Subscription: ' + window.localStorage.getItem('username'),
                                custom: window.localStorage.getItem('username')
                            }
                        ]
                    }
                });
            },
            onCancel: function (data, actions) {
                //return actions.redirect();
            },
            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function (data, actions, error) {
                if (error) {
                    console.log("---------WE HAVE AN ERROR-------------------");
                    console.log("ERROR: " + error);
                }
                if (error === 'INSTRUMENT_DECLINED') {
                    actions.restart();
                }
                actions.payment.get().then(function (paymentDetails) {
                });
                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function (data) {
                    _thiss.sendReceiptToServer(data);
                });
            }
        }, paypalbuttoncontainer);
    };
    PlayerPage.prototype.sendReceiptToServer = function (receipt) {
        var _this = this;
        var path = "/checkPayment";
        var url = this.globalVariablesService.getHostname() + path;
        var data = {
            receipt: receipt
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        headers.append('ppid', receipt.id);
        var options = new __WEBPACK_IMPORTED_MODULE_9__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.http.post(url, data, options).timeout(600000)
            .subscribe(function (response) {
            if (response.json().status == 2) {
                window.localStorage.setItem('admob', "1");
                _this.hasPayed = 1;
                var toast = _this.toastCtrl.create({
                    message: "Thank you for your support. Ads are now removed for 1 month from player",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: "Actually there is no active payment",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (error) {
            // probably a bad url or 404
            console.log(JSON.stringify(error));
        });
    };
    return PlayerPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('paypalbuttoncontainer'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], PlayerPage.prototype, "paypalbuttoncontainer", void 0);
PlayerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-player',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/player/player.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        MyMusicloader.de\n    </ion-title>\n    <button *ngIf="isPortrait == \'true\'" >\n        <ion-icon style="font-size:25px;" name="phone-portrait" (click)="changePortait()"></ion-icon>\n      </button> \n      <button *ngIf="isPortrait == \'false\'" >\n        <ion-icon style="font-size:25px;" name="phone-landscape" (click)="changePortait()"></ion-icon>\n      </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    \n\n        <ion-card style="white-space: normal;background:none">\n        <br/><br/>\n          <img *ngIf="videoThumb" [src]="videoThumb | imagePipe"/>\n\n                <ion-card-content>\n                    <ion-card *ngIf="hasPayed == 0"style="background:none; background-color:none; border:1px solid #2e2e2e">\n                        <ion-card-title *ngIf="hasPayed == 0" justify-content-center align-items-center style="color:White;text-align: center;">\n                            Remove Player Ads and Donate - 1,99€ <span sytle="font-size:8px;">for one month</span>\n                        </ion-card-title>\n                          <div #paypalbuttoncontainer *ngIf="hasPayed == 0" id="paypal-button-container"></div>\n                          <br/>\n                        </ion-card>  \n                        \n                    <ion-card-title justify-content-center align-items-center style="color:White;text-align: center;">\n                        {{videoTitle | titlePipe}}\n                    </ion-card-title>\n                    \n                    <ion-card style="background:none; background-color:none; border:1px solid #2e2e2e">\n                      <ion-item style="background:none; background-color:none">\n                          <ion-grid> \n                              <ion-row justify-content-center align-items-center>\n                                  <button *ngIf="isSingleRepeating == \'true\'" style="border:1px outset white;border-radius:5px;">\n                                      <ion-icon style="font-size:25px;color:white;" name="repeat" (click)="changeIsSingleRepeating()"></ion-icon>\n                                    </button> \n                                    <button *ngIf="isSingleRepeating == \'false\'">\n                                      <ion-icon style="font-size:25px;color:white;" name="repeat" (click)="changeIsSingleRepeating()"></ion-icon>\n                                    </button>\n\n                                <button>\n                                    <ion-icon style="font-size:35px;color:white;" name="md-skip-backward" (click)="onPlayed(\'back\', \'manual\')"></ion-icon>\n                                  </button>\n\n                                  <button>\n                                    <ion-icon style="font-size:45px;color:white;" name="md-play" (click)="playvideo(url)"></ion-icon>\n                                  </button>\n                                  <button>\n                                    <ion-icon style="font-size:35px;color:white;" name="md-skip-forward" (click)="onPlayed(\'for\', \'manual\')"></ion-icon>\n                                  </button>\n\n                                  <button *ngIf="isShuffle == \'true\'" style="border:1px outset white;border-radius:5px;">\n                                      <ion-icon style="font-size:25px;color:white;" name="shuffle" (click)="changeIsShuffle()"></ion-icon>\n                                    </button> \n                                    <button *ngIf="isShuffle == \'false\'">\n                                      <ion-icon style="font-size:25px;color:white;" name="shuffle" (click)="changeIsShuffle()"></ion-icon>\n                                    </button>\n                              </ion-row>\n                            </ion-grid>\n                            \n                      </ion-item> \n                    </ion-card>\n                    \n            </ion-card-content>\n          </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/player/player.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_streaming_media__["a" /* StreamingMedia */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_6__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_music_controls__["a" /* MusicControls */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_variables__["a" /* GlobalVariablesService */]])
], PlayerPage);

//# sourceMappingURL=player.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_music_controls__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__subplaylist_subplaylist__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__settings_playlist_settings_playlist__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__paySongs_paySongs__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var PlaylistPage = (function () {
    function PlaylistPage(alertCtrl, httpCtrl, modalCtrl, actionSheetCtrl, file, admobService, musicControls, platform, nativeAudio, navCtrl, globalVariablesService) {
        this.alertCtrl = alertCtrl;
        this.httpCtrl = httpCtrl;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.file = file;
        this.admobService = admobService;
        this.musicControls = musicControls;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.navCtrl = navCtrl;
        this.globalVariablesService = globalVariablesService;
        this.videoURL = [];
        this.playlistPara = 0;
        this.diretories = [];
        this.musicMap = [];
        this.amountSongs = 0;
    }
    PlaylistPage.prototype.ionViewWillEnter = function () {
        if (window.localStorage.getItem('amountSongs')) {
            this.amountSongs = parseInt(window.localStorage.getItem('amountSongs'));
        }
        else {
            this.amountSongs = 0;
        }
        this.admobService.addAdmob();
        if (this.globalVariablesService.refresh) {
            this.getDirectories();
            this.globalVariablesService.refresh = false;
        }
    };
    PlaylistPage.prototype.openSettings = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__settings_playlist_settings_playlist__["a" /* SettingsPlaylistPage */], { dirs: this.musicMap });
        profileModal.present();
    };
    PlaylistPage.prototype.getDirectories = function () {
        var _this = this;
        this.file.checkDir(this.file.dataDirectory, 'musicloader')
            .then(function (_) {
            //console.log('Directory exists');
            _this.listDir(null);
        })
            .catch(function (err) {
            //console.log('Directory doesnt exist');
            _this.file.createDir(_this.file.dataDirectory, 'musicloader', true)
                .then(function (_) {
                //console.log('Directory created');
                _this.listDir(null);
            })
                .catch(function (err) {
                console.log('Directory could not created');
            });
        });
    };
    //list directories
    PlaylistPage.prototype.listDir = function (refresher) {
        var _this = this;
        this.musicMap = [];
        this.diretories = [];
        this.file.listDir(this.file.dataDirectory, 'musicloader')
            .then(function (dirs) {
            //Count Sub Elements (mp3 in list)
            dirs.forEach(function (element) {
                var direct = _this.file.dataDirectory + element.fullPath;
                var path = "";
                if (_this.platform.is('android')) {
                    direct = _this.file.dataDirectory + "musicloader/";
                    path = element.name;
                }
                _this.diretories.push({ "playlist": element.name, "amount": 0, "songs": [] });
            });
            if (refresher) {
                refresher.complete();
            }
        })
            .catch(function (err) {
            console.log(JSON.stringify(err));
            if (refresher) {
                refresher.complete();
            }
        });
    };
    PlaylistPage.prototype.showSubPlayListFiles = function (dir) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__subplaylist_subplaylist__["a" /* SubplaylistPage */], { dir: dir });
    };
    //create musicloader main dir
    PlaylistPage.prototype.createDir = function (nameDirectory) {
        var _this = this;
        this.file.createDir(this.file.dataDirectory + "/musicloader/", nameDirectory, true)
            .then(function (_) {
            //console.log('Directory created');
            _this.listDir(null);
        })
            .catch(function (err) {
            console.log('Directory could not created');
        });
    };
    //move playlist musicloader main dir 
    PlaylistPage.prototype.movePlaylist = function (nameDirectory, copyDir, iPara) {
        var _this = this;
        var direct = this.file.dataDirectory + "musicloader/" + copyDir;
        var path = "";
        if (this.platform.is('android')) {
            direct = this.file.dataDirectory + "musicloader/";
            path = copyDir;
        }
        this.file.moveDir(direct, path, this.file.dataDirectory + "/musicloader/", nameDirectory)
            .then(function (_) {
            //console.log('Directory created');
            var index = -1;
            var filteredObj = _this.diretories.find(function (item, i) {
                if (item.playlist === copyDir) {
                    index = i;
                    return i;
                }
            });
            _this.diretories[index].playlist = nameDirectory;
        })
            .catch(function (err) {
            console.log('Directory could not created' + JSON.stringify(err));
        });
    };
    PlaylistPage.prototype.removePaylistRecurs = function (directory, iPara) {
        var _this = this;
        this.file.removeRecursively(this.file.dataDirectory + "/musicloader/" + directory, "")
            .then(function (_) {
            _this.diretories.splice(iPara, 1);
            console.log('Directory deleted recurs');
        })
            .catch(function (err) {
            console.log(JSON.stringify(err));
            console.log('Directory could not deleted recurs');
        });
    };
    //rename playlist
    PlaylistPage.prototype.rename = function (directory, iPara) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Rename Playlist',
            message: "Enter a new name for your playlist",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'playlist'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        //  console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        //console.log('Saved clicked');
                        _this.movePlaylist(data.title, directory, iPara);
                    }
                }
            ]
        });
        prompt.present();
    };
    PlaylistPage.prototype.more = function (directory, iPara) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'More Actions',
            buttons: [
                {
                    text: 'Open Playlist',
                    icon: 'open',
                    handler: function () {
                        _this.showSubPlayListFiles(directory);
                    }
                }, {
                    text: 'Rename Playlist',
                    icon: 'md-create',
                    handler: function () {
                        _this.rename(directory, iPara);
                    }
                }, {
                    text: 'Delete Playlist',
                    icon: 'md-trash',
                    handler: function () {
                        _this.removePaylistRecurs(directory, iPara);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PlaylistPage.prototype.buyMoreSongs = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__paySongs_paySongs__["a" /* PaySongs */]);
        profileModal.onDidDismiss(function (data) {
            _this.amountSongs = parseInt(data.amountSongs);
            _this.admobService.addAdmob();
        });
        profileModal.present();
    };
    return PlaylistPage;
}());
PlaylistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-playlist',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/playlist/playlist.html"*/'<ion-header>\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only small style="float: right;background-color:transparent !important; color: rgb(52, 55, 196) !important;" (click)="buyMoreSongs()">\n              <ion-icon name="musical-note"></ion-icon><span >{{this.amountSongs}}</span>\n            </button>\n          <br/><br/>\n      </ion-buttons>\n    <ion-title>\n        My Playlists\n    </ion-title>\n    <ion-buttons end>\n        <button ion-button  end style="float: right;background-color:transparent !important; color: rgb(52, 55, 196);" (click)="openSettings()">\n            <ion-icon name="settings"></ion-icon>\n        </button>\n      </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="listDir($event)">\n      <ion-refresher-content pullingIcon="arrow-dropdown"\n      pullingText="Pull to refresh"\n      refreshingSpinner="circles"\n      refreshingText="Refreshing..."></ion-refresher-content>\n    </ion-refresher>\n  <ion-list>\n    <ion-list-header>Playlists</ion-list-header>\n    <ion-list>\n        <ion-item *ngFor="let dir of diretories; let i = index;">\n        \n          <span (click)="showSubPlayListFiles(dir)">\n              <h2>{{dir.playlist}}</h2>\n            </span>\n            <button ion-button clear item-end (click)="more(dir.playlist, i)">  \n              <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-item>\n      </ion-list>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/playlist/playlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_music_controls__["a" /* MusicControls */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_variables__["a" /* GlobalVariablesService */]])
], PlaylistPage);

//# sourceMappingURL=playlist.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubplaylistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_moreAction__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_share__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_users__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SubplaylistPage = (function () {
    function SubplaylistPage(httpCtrl, shareSrv, modalCtrl, moreActionSrv, platform, actionSheetCtrl, params, file, admobService, navCtrl, globalVariablesService) {
        this.httpCtrl = httpCtrl;
        this.shareSrv = shareSrv;
        this.modalCtrl = modalCtrl;
        this.moreActionSrv = moreActionSrv;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.params = params;
        this.file = file;
        this.admobService = admobService;
        this.navCtrl = navCtrl;
        this.globalVariablesService = globalVariablesService;
        this.diretories = {
            "playlist": "",
            "amount": 0,
            "songs": []
        };
        this.videos = [];
        this.filteredVideos = [];
        this.filter = "";
        this.name = "Playlist";
        this.hasloaded = false;
    }
    SubplaylistPage.prototype.ionViewDidLoad = function () {
        if (this.dir == null) {
            this.name = this.params.get('dir').playlist;
            this.diretories = this.params.get('dir');
        }
        this.loadFiles(null);
    };
    SubplaylistPage.prototype.getFilterItems = function () {
        var _this = this;
        this.filteredVideos = this.diretories.songs.filter(function (val) {
            return val.name.toLowerCase().includes(_this.filter.toLowerCase());
        });
    };
    SubplaylistPage.prototype.loadFiles = function (refresher) {
        var _this = this;
        this.diretories.songs = [];
        var counter = 0;
        var direct = this.file.dataDirectory + "musicloader/" + this.name + "/";
        var path = "";
        if (this.platform.is('android')) {
            direct = this.file.dataDirectory + "musicloader/";
            path = this.name;
        }
        this.file.listDir(direct, path)
            .then(function (subdirs) {
            subdirs.forEach(function (subelement) {
                if (subelement.isFile && subelement.fullPath.indexOf(".mp4") != -1) {
                    counter += 1;
                    _this.diretories.amount = counter;
                    var videoTitle = subelement.name;
                    var thumb = videoTitle.replace(".mp4", ".jpg");
                    var videoDict = subelement.fullPath.replace(videoTitle, "");
                    subelement["thumb"] = _this.file.dataDirectory + videoDict + thumb;
                    _this.diretories.songs.push(subelement);
                }
            });
            if (refresher) {
                refresher.complete();
            }
            _this.hasloaded = true;
            _this.filteredVideos = _this.diretories.songs;
        })
            .catch(function (err) {
            if (refresher) {
                refresher.complete();
            }
            _this.hasloaded = true;
            console.log(JSON.stringify(err));
        });
    };
    SubplaylistPage.prototype.playFiles = function (firstPlayingSong) {
        var _this = this;
        this.videos = [];
        this.diretories.songs.forEach(function (element) {
            if (element.nativeURL != firstPlayingSong.nativeURL) {
                _this.videos.push(element);
            }
        });
        this.videos.unshift(firstPlayingSong);
        this.globalVariablesService.setVideo(this.videos);
        this.globalVariablesService.setAutoPlay(true);
        this.navCtrl.parent.select(3);
        //Autoamtic Backup after 6 min
        var lastDate = window.localStorage.getItem('lastPartialBackup');
        var mydate = new Date(lastDate);
        // Convert both dates to milliseconds
        var last = mydate.getTime();
        var now = new Date().getTime();
        // Calculate the difference in milliseconds
        var difference_ms = now - last;
        if (difference_ms > 400000) {
            this.backUp();
        }
    };
    SubplaylistPage.prototype.backUp = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        var tempVideos = [];
        this.diretories.songs.forEach(function (element) {
            tempVideos.push({ "playlist": _this.name, "song": element.name });
        });
        this.httpCtrl.post(this.globalVariablesService.getHostname() + '/backup/', tempVideos, { headers: headers }).subscribe(function (data) {
            if (data.json().status == 2) {
                window.localStorage.setItem('lastPartialBackup', new Date().toString());
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    SubplaylistPage.prototype.share = function (videoTitle) {
        var _this = this;
        var picture = "";
        var videoId = "";
        var usersModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__users_users__["a" /* Users */], { videoTitle: videoTitle, videoId: videoId, picture: picture });
        usersModal.onDidDismiss(function (data) {
            var notification = data;
            if (notification) {
                _this.shareSrv.sendSharing(notification);
            }
        });
        usersModal.present();
    };
    SubplaylistPage.prototype.more = function (directory, iPara) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'More Actions',
            buttons: [
                {
                    text: 'Play Song',
                    icon: 'play',
                    handler: function () {
                        _this.playFiles(directory);
                    }
                }, {
                    text: 'Share Song',
                    icon: 'share',
                    handler: function () {
                        _this.share(directory.name);
                    }
                }, {
                    text: 'Copy Song',
                    icon: 'copy',
                    handler: function () {
                        _this.globalVariablesService.copySong = directory;
                        _this.globalVariablesService.copySongDir = _this.name;
                        _this.moreActionSrv.listDir("copy");
                    }
                }, {
                    text: 'Move Song',
                    icon: 'share-alt',
                    handler: function () {
                        _this.globalVariablesService.copySong = directory;
                        _this.globalVariablesService.copySongDir = _this.name;
                        _this.globalVariablesService.moveSongPosition = iPara;
                        _this.globalVariablesService.moveDir = _this.diretories.songs;
                        _this.moreActionSrv.listDir("move");
                    }
                }, {
                    text: 'Delete Song',
                    icon: 'md-trash',
                    handler: function () {
                        _this.file.removeFile(_this.file.dataDirectory + directory.fullPath.replace(directory.name, ""), directory.name)
                            .then(function (_) {
                            console.log('Directory deleted music file');
                            _this.file.removeFile(_this.file.dataDirectory + directory.fullPath.replace(directory.name, ""), directory.name.replace(".mp4", ".jpg"))
                                .then(function (_) {
                                _this.diretories.songs.splice(iPara, 1);
                                console.log('Directory deleted thumb file');
                            })
                                .catch(function (err) {
                                console.log(JSON.stringify(err));
                                console.log('Directory could not deleted thumb file');
                            });
                        })
                            .catch(function (err) {
                            console.log(JSON.stringify(err));
                            console.log('Directory could not deleted music file');
                        });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return SubplaylistPage;
}());
SubplaylistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-subplaylist',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/subplaylist/subplaylist.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        {{name}}\n    </ion-title>\n    <ion-buttons end>\n      {{diretories.amount}} Videos\n    </ion-buttons>\n  </ion-navbar>\n  <ion-searchbar type="search" autocomplete="on"  debounce="200" autocorrect="off" (ionInput)="getFilterItems()" [(ngModel)] = "filter"></ion-searchbar>\n\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="loadFiles($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown"\n        pullingText="Pull to refresh"\n        refreshingSpinner="circles"\n        refreshingText="Refreshing..."></ion-refresher-content>\n      </ion-refresher>\n  <ion-card *ngIf="hasloaded && diretories.songs.length == 0">\n    <ion-card-header>\n            You have no videos in your list?\n          </ion-card-header>\n        <ion-card-content>\n            Search for videos and add them to your playlist\n      </ion-card-content>\n    </ion-card>\n    <ion-card *ngIf="hasloaded && diretories.songs.length == 0">\n        <ion-card-header>\n            You <u>still</u> had videos in your playlist?\n          </ion-card-header>\n        <ion-card-content>\n            We have added new features ;)\n            <br/>Please close the imusic app completely and restart it again\n      </ion-card-content>\n    </ion-card>\n\n  <ion-list *ngIf="filteredVideos.length > 0">\n    <ion-list-header>Videos</ion-list-header>\n    <ion-list>\n      <ion-item  *ngFor="let dir of filteredVideos; let i = index;" >\n        <ion-avatar item-start>\n            <img *ngIf="dir.thumb" [src]="dir.thumb | imagePipe"/>\n          </ion-avatar>\n          <span (click)="playFiles(dir)">\n            <h2 text-wrap>{{dir.name | titlePipe}}</h2>\n          </span>\n          <button ion-button clear item-end small outline (click)="more(dir, i)">  \n            <ion-icon class="more" name="more"></ion-icon>\n          </button>\n        </ion-item>\n      </ion-list>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/subplaylist/subplaylist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_6__providers_share__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__providers_moreAction__["a" /* MoreActionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__["a" /* GlobalVariablesService */]])
], SubplaylistPage);

//# sourceMappingURL=subplaylist.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPlaylistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_music_controls__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_download__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SettingsPlaylistPage = (function () {
    function SettingsPlaylistPage(params, downloadService, httpCtrl, toastCtrl, actionSheetCtrl, file, admobService, musicControls, platform, nativeAudio, navCtrl, globalVariablesService) {
        this.params = params;
        this.downloadService = downloadService;
        this.httpCtrl = httpCtrl;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.file = file;
        this.admobService = admobService;
        this.musicControls = musicControls;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.navCtrl = navCtrl;
        this.globalVariablesService = globalVariablesService;
        this.musicMap = [];
        this.lastBackup = "";
        this.email = "";
        this.oldPW = "";
        this.newPW = "";
    }
    SettingsPlaylistPage.prototype.ionViewDidLoad = function () {
        this.lastBackup = window.localStorage.getItem('lastBackup');
        if (window.localStorage.getItem('email') && window.localStorage.getItem('email').includes("@")) {
            this.email = window.localStorage.getItem('email');
        }
        this.loadFiles();
    };
    SettingsPlaylistPage.prototype.closeModal = function () {
        if (this.email && window.localStorage.getItem('email') != this.email && this.email.includes("@")) {
            this.updateMail();
        }
        else if (this.email && window.localStorage.getItem('email') != this.email && !this.email.includes("@")) {
            var toast = this.toastCtrl.create({
                message: 'No valid Mail',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        this.navCtrl.pop();
    };
    SettingsPlaylistPage.prototype.loadFiles = function () {
        var _this = this;
        this.file.checkDir(this.file.dataDirectory, 'musicloader')
            .then(function (_) {
            //console.log('Directory exists');
            _this.listDirBackup();
        })
            .catch(function (err) {
            //console.log('Directory doesnt exist');
            _this.file.createDir(_this.file.dataDirectory, 'musicloader', true)
                .then(function (_) {
                //console.log('Directory created');
                _this.listDirBackup();
            })
                .catch(function (err) {
                console.log('Directory could not created1');
                console.log(JSON.stringify(err));
            });
        });
    };
    //list directories
    SettingsPlaylistPage.prototype.listDirBackup = function () {
        var _this = this;
        this.musicMap = [];
        this.file.listDir(this.file.dataDirectory, 'musicloader')
            .then(function (dirs) {
            //Get Sub Elements (mp3 in list)
            var counterSubdirs = 0;
            dirs.forEach(function (element) {
                var direct = _this.file.dataDirectory + element.fullPath;
                var path = "";
                if (_this.platform.is('android')) {
                    direct = _this.file.dataDirectory + "musicloader/";
                    path = element.name;
                }
                _this.file.listDir(direct, path)
                    .then(function (subdirs) {
                    subdirs.forEach(function (subelement) {
                        counterSubdirs += 1;
                        if (subelement.isFile && subelement.fullPath.indexOf(".mp4") != -1) {
                            var postParams = {
                                playlist: element.name,
                                song: subelement.name
                            };
                            _this.musicMap.push(postParams);
                        }
                    });
                })
                    .catch(function (err) { return console.log(JSON.stringify(err)); });
            });
        })
            .catch(function (err) { return console.log('Directory doesnt exist2'); });
    };
    /*
    
    Restore
  
    */
    SettingsPlaylistPage.prototype.restore = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.httpCtrl.get(this.globalVariablesService.getHostname() + '/restore/', { headers: headers }).subscribe(function (data) {
            if (data.json().status == 2) {
                //remove all folders
                _this.file.removeRecursively(_this.file.dataDirectory + 'musicloader', "")
                    .then(function (_) {
                    //add musicloader
                    _this.file.createDir(_this.file.dataDirectory, 'musicloader', true)
                        .then(function (_) {
                        window.localStorage.setItem('lastBackup', new Date().toString());
                        var toastMessage = "";
                        if (data.json().status == 2) {
                            //get single playlist name
                            var items = JSON.parse(data.json().message);
                            var uniqueNames = [];
                            for (var i = 0; i < items.length; i++) {
                                if (uniqueNames.indexOf(items[i].playlist) === -1) {
                                    uniqueNames.push(items[i].playlist);
                                }
                            }
                            //create new playlists
                            for (var playlist, i = 0; playlist = uniqueNames[i++];) {
                                _this.createDir(playlist);
                            }
                            //add file to playlist/download file
                            for (var item, i = 0; item = items[i++];) {
                                var needsPayment = false;
                                _this.downloadService.serverMp3DownloadWithPara(item.song, item.playlist, item.title, item.thumb, 0, needsPayment);
                            }
                            toastMessage = "Your playlists will now be downloaded";
                        }
                        else {
                            toastMessage = data.json().message;
                        }
                        var toast = _this.toastCtrl.create({
                            message: toastMessage,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                    })
                        .catch(function (err) {
                        console.log('Directory could not created1');
                        console.log(JSON.stringify(err));
                    });
                })
                    .catch(function (err) {
                    console.log(JSON.stringify(err));
                    console.log('Directory could not deleted recurs');
                });
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    /*
  
      Back UP
  
    */
    SettingsPlaylistPage.prototype.backUp = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.httpCtrl.post(this.globalVariablesService.getHostname() + '/backup/', this.musicMap, { headers: headers }).subscribe(function (data) {
            if (data.json().status == 2) {
                window.localStorage.setItem('lastBackup', new Date().toString());
                _this.lastBackup = window.localStorage.getItem('lastBackup');
            }
            var toast = _this.toastCtrl.create({
                message: data.json().message,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    SettingsPlaylistPage.prototype.updateMail = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.httpCtrl.get(this.globalVariablesService.getHostname() + '/updateMail/?email=' + this.email, { headers: headers }).subscribe(function (data) {
            if (data.json().status == 2) {
                window.localStorage.setItem('email', _this.email);
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    SettingsPlaylistPage.prototype.changePW = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.httpCtrl.get(this.globalVariablesService.getHostname() + 'changePW/?oldPW=' + this.oldPW + '&newPW=' + this.newPW + '&username=' + window.localStorage.getItem('username'), { headers: headers }).subscribe(function (data) {
            if (data.json().status == 2) {
                var toast = _this.toastCtrl.create({
                    message: 'Password changed',
                    duration: 3000,
                    position: 'bottom'
                });
                _this.oldPW = "";
                _this.newPW = "";
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Error, please check your passwords again',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    //create musicloader main dir
    SettingsPlaylistPage.prototype.createDir = function (nameDirectory) {
        var _this = this;
        this.file.createDir(this.file.dataDirectory + "/musicloader/", nameDirectory, true)
            .then(function (_) {
            _this.listDirBackup();
            //console.log('Directory created');
        })
            .catch(function (err) {
            console.log('Directory could not created');
        });
    };
    return SettingsPlaylistPage;
}());
SettingsPlaylistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'settings-playlist',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/settings-playlist/settings-playlist.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        Settings\n    </ion-title>\n\n    <button style="font-size:16px;float: right;background-color:transparent !important; color: rgb(52, 55, 196);"  (click)="closeModal()">\n        Close\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n      <ion-item>\n        <h2>You have a problem - Contact us</h2>\n        <p>YOUR MAIL</p>\n    </ion-item>\n\n    <ion-list-header>\n            Your email for password reset\n    </ion-list-header>\n    <ion-item>\n        <ion-label color="primary" fixed>Email</ion-label>\n        <ion-input [(ngModel)]="email" type="text"></ion-input>\n    </ion-item>\n\n    <ion-list-header>\n            Change Password\n    </ion-list-header>\n    <ion-item>\n        <ion-label color="primary" fixed>Old PW</ion-label>\n        <ion-input [(ngModel)]="oldPW" type="password"></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label color="primary" fixed>New PW</ion-label>\n        <ion-input [(ngModel)]="newPW" type="password"></ion-input>\n    </ion-item>\n    <ion-item (click)="changePW()">\n        <button ion-button block style="height:50px;font-size:16px;margin-top:15px"> \n            <ion-icon name="checkmark" large item-start></ion-icon> Save\n        </button> \n    </ion-item>\n\n    <ion-list-header>\n            Backup\n    </ion-list-header>\n    <ion-item (click)="backUp()">\n      <h3>Last Backup: </h3>\n        {{lastBackup}}\n      <h1>            \n          <button ion-button block style="height:50px;font-size:16px;margin-top:15px"> \n             <ion-icon name="cloud-upload" item-start></ion-icon> Create New Backup\n          </button> \n      </h1>  \n    </ion-item>\n\n    <ion-item (click)="restore()">\n        <h1>            \n            <button ion-button block style="height:50px;font-size:16px;margin-top:15px"> \n               <ion-icon name="sync" item-start></ion-icon> Restore Backup\n            </button> \n        </h1>\n    </ion-item>\n    <ion-card>\n        <p>                \n            Es gelten die im App-Store hinterlegten AGBs, wenn der Nutzer damit nicht einverstanden ist, Bedarf es einer Widerspruchs-Mail mit dem Benutzername an Your MAIL. Die App darf folglich nicht weiter genutzt werden!\n        </p>\n    </ion-card>\n    \n\n\n          \n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/settings-playlist/settings-playlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__providers_download__["a" /* DownloadService */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_5__providers_admob__["a" /* AdmobService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_music_controls__["a" /* MusicControls */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_global_variables__["a" /* GlobalVariablesService */]])
], SettingsPlaylistPage);

//# sourceMappingURL=settings-playlist.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var AuthService = (function () {
    function AuthService(loadingCtrl, device, menu, toastCtrl, httpCtrl, navcontroller, globalVariablesServ) {
        this.loadingCtrl = loadingCtrl;
        this.device = device;
        this.menu = menu;
        this.toastCtrl = toastCtrl;
        this.httpCtrl = httpCtrl;
        this.navcontroller = navcontroller;
        this.globalVariablesServ = globalVariablesServ;
        this.http = httpCtrl;
        this.nav = navcontroller;
        this.isLoggedin = false;
        this.globalVariablesService = globalVariablesServ;
    }
    AuthService.prototype.login = function (user, pushUserId, pushToken, tabBarElement) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Login ...',
        });
        this.loading.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var creds = "?username=" + user.name + "&pwd=" + user.password + "&uuid=" + this.device.uuid + "&platform=" + this.device.platform + "&model=" + this.device.model + "&platformversion=" + this.device.version + "&pushid=" + pushUserId + "&pushtoken=" + pushToken;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.get(this.globalVariablesService.getHostname() + '/login/' + creds, { headers: headers }).subscribe(function (data) {
            _this.loading.dismissAll();
            if (data.json().status == 2) {
                window.localStorage.setItem('utoken', data.json().message);
                _this.globalVariablesService.setIsLoggedIn(true);
                tabBarElement.style.display = 'flex';
                _this.navcontroller.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]);
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: data.json().message,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (error) {
            _this.loading.dismissAll();
            console.log(JSON.stringify(error));
        });
    };
    AuthService.prototype.register = function (user, pushUserId, pushToken, tabBarElement) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Login ...',
        });
        this.loading.present();
        return new Promise(function (resolve) {
            var creds = "username=" + user.name + "&password=" + user.password + "&uuid=" + _this.device.uuid + "&platform=" + _this.device.platform + "&model=" + _this.device.model + "&platformversion=" + _this.device.version + "&pushid=" + pushUserId + "&pushtoken=" + pushToken;
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            _this.http.post(_this.globalVariablesService.getHostname() + '/register', creds, { headers: headers }).subscribe(function (data) {
                _this.loading.dismissAll();
                if (data.json().status == 2) {
                    window.localStorage.setItem('utoken', data.json().message);
                    _this.globalVariablesService.setIsLoggedIn(true);
                    tabBarElement.style.display = 'flex';
                    _this.navcontroller.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]);
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: data.json().message,
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                }
            }, function (error) {
                _this.loading.dismissAll();
                console.log(JSON.stringify(error));
            });
        });
    };
    AuthService.prototype.logout = function (tabBarElement) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.globalVariablesService.setIsLoggedIn(false);
            var loadedApps = window.localStorage.getItem("loadedApps");
            window.localStorage.clear();
            window.localStorage.setItem("loadedApps", loadedApps);
            _this.navcontroller.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
            _this.menu.swipeEnable(false);
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__global_variables__["a" /* GlobalVariablesService */]])
], AuthService);

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Password; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Password = (function () {
    function Password(toastCtrl, loadingCtrl, platform, params, viewCtrl, globalVariablesService, http) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.globalVariablesService = globalVariablesService;
        this.http = http;
        this.username = "";
    }
    Password.prototype.sendPW = function () {
        var _this = this;
        if (this.username) {
            var creds = "sendPW?username=" + this.username;
            this.loading = this.loadingCtrl.create({
                content: 'Sending Mail & Push...',
            });
            this.loading.present();
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            this.http.get(this.globalVariablesService.getHostname() + creds, { headers: headers }).timeout(15000).subscribe(function (data) {
                var dataMessage = data.json();
                _this.loading.dismissAll();
                var toast = _this.toastCtrl.create({
                    message: 'If possible, we have sent you an email or a push message with your new password, otherwise contact our support. Please change it in your account!',
                    duration: 3000,
                    position: 'top'
                });
                _this.dismiss();
                toast.present();
            }, function (error) {
                _this.loading.dismissAll();
                console.log(JSON.stringify(error));
            });
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Please add your username and email address',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    };
    Password.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return Password;
}());
Password = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-password',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/password/password.html"*/'<ion-header>\n  <ion-navbar>\n\n    <ion-title>\n      Reset Password\n    </ion-title>\n\n    <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">Back</span>\n          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list-header>\n    Reset Password\n  </ion-list-header>\n\n    <ion-card >\n        <ion-item>\n            <ion-label  color="primary" fixed>Username</ion-label>\n            <ion-input [(ngModel)]="username" type="text"></ion-input>\n        </ion-item>\n\n      </ion-card> \n\n          <button (click)="sendPW()" full ion-button style="height:50px;font-size:16px;margin-top:15px"> \n              <ion-icon name="send"  item-start></ion-icon> Send\n          </button> \n\n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/password/password.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], Password);

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_moreAction__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_rate__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(231);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NotificationPage = (function () {
    function NotificationPage(iab, appRate, oneSignal, viewCtrl, moreActionService, navCtrl, http, globalVariablesService, platform, toastCtrl) {
        this.iab = iab;
        this.appRate = appRate;
        this.oneSignal = oneSignal;
        this.viewCtrl = viewCtrl;
        this.moreActionService = moreActionService;
        this.navCtrl = navCtrl;
        this.http = http;
        this.globalVariablesService = globalVariablesService;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.notifications = [];
        this.options = {
            location: 'no',
            hidden: 'no',
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no',
            closebuttoncaption: 'Close',
            disallowoverscroll: 'no',
            toolbar: 'yes',
            enableViewportScale: 'no',
            allowInlineMediaPlayback: 'no',
            presentationstyle: 'pagesheet',
            fullscreen: 'yes',
            footer: 'yes',
            toolbarposition: 'top',
            transitionstyle: 'fliphorizontal'
        };
    }
    NotificationPage.prototype.enablePush = function () {
        var _this = this;
        if (this.platform.is('android')) {
            // this.oneSignal.startInit("YOUR ID", "YOUR ID");
        }
        else {
            //   this.oneSignal.startInit("YOUR ID", "");
        }
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(function () {
            // do something when the notification is received.
        });
        this.oneSignal.handleNotificationOpened().subscribe(function () {
            // do something when the notification is opened.
        });
        this.oneSignal.promptForPushNotificationsWithUserResponse();
        this.oneSignal.endInit();
        this.oneSignal.getIds().then(function (pushData) {
            // this gives you back the new userId and pushToken associated with the device. Helpful.
            var creds = "enablePush?pushId=" + pushData.userId + "&pushToken=" + pushData.pushToken;
            var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            _this.http.get(_this.globalVariablesService.getHostname() + creds, { headers: headers }).subscribe(function (data) {
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        });
    };
    NotificationPage.prototype.ionViewDidLoad = function () {
        this.notifications = [];
        this.loadNotifications();
        this.enablePush();
    };
    NotificationPage.prototype.loadNotifications = function () {
        var _this = this;
        this.notifications = [];
        var creds = "getNotifications";
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.http.get(this.globalVariablesService.getHostname() + creds, { headers: headers }).subscribe(function (data) {
            var notifications = data.json();
            notifications.forEach(function (element) {
                element.playing = 'false';
                _this.notifications.push(element);
            });
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    NotificationPage.prototype.loadingVideo = function (video) {
        video.watched = 1;
        if (video.type == "yt") {
            if (video.playing == 'false') {
                video.playing = 'true';
            }
        }
        else if (video.type == "rate") {
            // or, override the whole preferences object
            this.appRate.preferences.storeAppURL = {
                ios: '1307959900'
            };
            this.appRate.preferences.inAppReview = true;
            this.appRate.preferences.simpleMode = true;
            this.appRate.preferences.callbacks = {
                onRateDialogShow: function (callbacks) {
                },
                onButtonClicked: function (callbacks) {
                },
                handleNegativeFeedback: function (callbacks) {
                    alert('Please provide us some information what we can optimise');
                }
            };
            this.appRate.navigateToAppStore();
        }
        else {
            var target = "_blank";
            var browser = this.iab.create(video.ytId, target, this.options);
        }
        this.hasWatched(video);
    };
    //mark notification as seen
    NotificationPage.prototype.hasWatched = function (video) {
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.http.get(this.globalVariablesService.getHostname() + "hasWatched?notificationId=" + video.id, { headers: headers }).subscribe(function (data) {
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    NotificationPage.prototype.more = function (video) {
        this.moreActionService.getDirectories();
        this.globalVariablesService.setVideo(video.ytId);
        this.globalVariablesService.setTitle(video.songname);
        this.globalVariablesService.setThumb(video.picture);
    };
    NotificationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return NotificationPage;
}());
NotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-notification',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/notification/notification.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n        Notifications\n    </ion-title>\n    <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">Back</span>\n          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </ion-buttons>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-card *ngIf="notifications.length == 0">\n        <ion-card-header>\n            You have no notifications in your list?\n          </ion-card-header>\n        <ion-card-content>\n            Search for videos and start sharing with your friends\n      </ion-card-content>\n    </ion-card>\n\n\n    <ion-list>\n        <ion-item text-wrap *ngFor="let notification of  notifications"  (click)="loadingVideo(notification)" >\n          <ion-thumbnail item-start > \n              <button center text-center *ngIf="notification.watched == 0">\n                  <ion-icon style="margin-top:5px;font-size:25px;color:rgb(52, 55, 196)" name="ios-musical-notes" ></ion-icon>\n                  <ion-icon style="margin-top:5px;font-size:25px;color:rgb(52, 55, 196)" name="star" ></ion-icon>\n                </button>\n            <img *ngIf="notification.playing == \'false\'" src="{{notification.picture}}" >\n            <iframe *ngIf="notification.playing == \'true\'  && notification.type == \'yt\'" clear item-end [src]="notification.ytId | youtube" frameborder="0" width="60" height="60"></iframe> \n          </ion-thumbnail>\n          <h3>{{notification.comment}}</h3>\n          <p>\n              <i>{{notification.username}} - {{notification.time |amTimeAgo}}</i>\n          </p>\n          <button *ngIf=" notification.type == \'yt\' " ion-button item-end small outline (click)="more(notification)">  \n            <ion-icon name="more"></ion-icon>\n          </button>\n          \n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/notification/notification.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_rate__["a" /* AppRate */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__providers_moreAction__["a" /* MoreActionService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdmobService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var AdmobService = (function () {
    function AdmobService(loadingCtrl, platform, http, admobFree) {
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.http = http;
        this.admobFree = admobFree;
    }
    AdmobService.prototype.addAdmob = function () {
        var _this = this;
        var bannerConfig = {
            // add your config here
            // for the sake of this example we will just use the test config
            id: "ca-app-pub-7004524510304789/6982571246",
            isTesting: false,
            autoShow: true
        };
        if (this.platform.is('android')) {
            bannerConfig.id = "ca-app-pub-7004524510304789/4416828092";
        }
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare()
            .then(function () {
            _this.admobFree.banner.show();
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
        })
            .catch(function (e) { return console.log(e); });
    };
    AdmobService.prototype.hideBanner = function () {
        this.admobFree.banner.hide();
    };
    AdmobService.prototype.addIntersAdmob = function () {
        var _this = this;
        var intersConfig = {
            // add your config here
            // for the sake of this example we will just use the test config
            id: "ca-app-pub-7004524510304789/5553939508",
            isTesting: false,
            autoShow: true
        };
        if (this.platform.is('android')) {
            intersConfig.id = "ca-app-pub-7004524510304789/4979224436";
        }
        this.admobFree.interstitial.config(intersConfig);
        this.admobFree.interstitial.prepare()
            .then(function () {
            if (_this.admobFree.interstitial.isReady()) {
                _this.admobFree.banner.hide();
                _this.admobFree.interstitial.show().then(function (data) {
                })
                    .catch(function (e) {
                    console.log(e);
                    //this.addAdmob();
                });
            }
        })
            .catch(function (e) { return console.log(e); });
    };
    AdmobService.prototype.addRewardAdmob = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rewardConfig;
            return __generator(this, function (_a) {
                this.loading = this.loadingCtrl.create({
                    content: 'Loading...',
                });
                this.loading.present();
                rewardConfig = {
                    // add your config here
                    // for the sake of this example we will just use the test config
                    id: "ca-app-pub-7004524510304789/9302955129",
                    isTesting: false,
                    autoShow: true
                };
                if (this.platform.is('android')) {
                    rewardConfig.id = "ca-app-pub-7004524510304789/9662047773";
                }
                this.admobFree.rewardVideo.config(rewardConfig);
                this.admobFree.rewardVideo.prepare()
                    .then(function () {
                    _this.loading.dismissAll();
                    if (_this.admobFree.rewardVideo.isReady()) {
                        _this.admobFree.rewardVideo.show().then(function (data) {
                        })
                            .catch(function (e) {
                            _this.loading.dismissAll();
                            console.log(e);
                        });
                    }
                })
                    .catch(function (e) {
                    _this.loading.dismissAll();
                    console.log(e);
                });
                return [2 /*return*/];
            });
        });
    };
    return AdmobService;
}());
AdmobService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__["a" /* AdMobFree */]])
], AdmobService);

//# sourceMappingURL=admob.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(394);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_subnews_subnews__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_news_news__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_player_player__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_playlist_playlist__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_subplaylist_subplaylist__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings_playlist_settings_playlist__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_users_users__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_password_password__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_myapps_myapps__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_paySongs_paySongs__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_notification_notification__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_market__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_app_rate__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_streaming_media__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_native_audio__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_music_controls__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_background_mode__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_onesignal__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_device__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_admob_free__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_media__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_file_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_pro__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_angular2_moment__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_admob__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_moreAction__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_download__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__providers_share__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pipes_youtube_youtube__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pipes_image_image__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pipes_title_title__ = __webpack_require__(457);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_news_news__["a" /* NewsPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_subnews_subnews__["a" /* SubnewsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_player_player__["a" /* PlayerPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_playlist_playlist__["a" /* PlaylistPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_subplaylist_subplaylist__["a" /* SubplaylistPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings_playlist_settings_playlist__["a" /* SettingsPlaylistPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_users_users__["a" /* Users */],
            __WEBPACK_IMPORTED_MODULE_14__pages_password_password__["a" /* Password */],
            __WEBPACK_IMPORTED_MODULE_15__pages_myapps_myapps__["a" /* MyApps */],
            __WEBPACK_IMPORTED_MODULE_16__pages_paySongs_paySongs__["a" /* PaySongs */],
            __WEBPACK_IMPORTED_MODULE_17__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_42__pipes_youtube_youtube__["a" /* YoutubePipe */],
            __WEBPACK_IMPORTED_MODULE_43__pipes_image_image__["a" /* ImagePipe */],
            __WEBPACK_IMPORTED_MODULE_44__pipes_title_title__["a" /* TitlePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_35__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_36_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: []
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_news_news__["a" /* NewsPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_subnews_subnews__["a" /* SubnewsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_player_player__["a" /* PlayerPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_playlist_playlist__["a" /* PlaylistPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_myapps_myapps__["a" /* MyApps */],
            __WEBPACK_IMPORTED_MODULE_16__pages_paySongs_paySongs__["a" /* PaySongs */],
            __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_subplaylist_subplaylist__["a" /* SubplaylistPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings_playlist_settings_playlist__["a" /* SettingsPlaylistPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_users_users__["a" /* Users */],
            __WEBPACK_IMPORTED_MODULE_14__pages_password_password__["a" /* Password */],
            __WEBPACK_IMPORTED_MODULE_17__pages_notification_notification__["a" /* NotificationPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_pro__["a" /* Pro */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_streaming_media__["a" /* StreamingMedia */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_music_controls__["a" /* MusicControls */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_37__providers_global_variables__["a" /* GlobalVariablesService */],
            __WEBPACK_IMPORTED_MODULE_38__providers_admob__["a" /* AdmobService */],
            __WEBPACK_IMPORTED_MODULE_39__providers_moreAction__["a" /* MoreActionService */],
            __WEBPACK_IMPORTED_MODULE_40__providers_download__["a" /* DownloadService */],
            __WEBPACK_IMPORTED_MODULE_41__providers_share__["a" /* ShareService */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_market__["a" /* Market */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_app_rate__["a" /* AppRate */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 236,
	"./af.js": 236,
	"./ar": 237,
	"./ar-dz": 238,
	"./ar-dz.js": 238,
	"./ar-kw": 239,
	"./ar-kw.js": 239,
	"./ar-ly": 240,
	"./ar-ly.js": 240,
	"./ar-ma": 241,
	"./ar-ma.js": 241,
	"./ar-sa": 242,
	"./ar-sa.js": 242,
	"./ar-tn": 243,
	"./ar-tn.js": 243,
	"./ar.js": 237,
	"./az": 244,
	"./az.js": 244,
	"./be": 245,
	"./be.js": 245,
	"./bg": 246,
	"./bg.js": 246,
	"./bm": 247,
	"./bm.js": 247,
	"./bn": 248,
	"./bn.js": 248,
	"./bo": 249,
	"./bo.js": 249,
	"./br": 250,
	"./br.js": 250,
	"./bs": 251,
	"./bs.js": 251,
	"./ca": 252,
	"./ca.js": 252,
	"./cs": 253,
	"./cs.js": 253,
	"./cv": 254,
	"./cv.js": 254,
	"./cy": 255,
	"./cy.js": 255,
	"./da": 256,
	"./da.js": 256,
	"./de": 257,
	"./de-at": 258,
	"./de-at.js": 258,
	"./de-ch": 259,
	"./de-ch.js": 259,
	"./de.js": 257,
	"./dv": 260,
	"./dv.js": 260,
	"./el": 261,
	"./el.js": 261,
	"./en-au": 262,
	"./en-au.js": 262,
	"./en-ca": 263,
	"./en-ca.js": 263,
	"./en-gb": 264,
	"./en-gb.js": 264,
	"./en-ie": 265,
	"./en-ie.js": 265,
	"./en-il": 266,
	"./en-il.js": 266,
	"./en-nz": 267,
	"./en-nz.js": 267,
	"./eo": 268,
	"./eo.js": 268,
	"./es": 269,
	"./es-do": 270,
	"./es-do.js": 270,
	"./es-us": 271,
	"./es-us.js": 271,
	"./es.js": 269,
	"./et": 272,
	"./et.js": 272,
	"./eu": 273,
	"./eu.js": 273,
	"./fa": 274,
	"./fa.js": 274,
	"./fi": 275,
	"./fi.js": 275,
	"./fo": 276,
	"./fo.js": 276,
	"./fr": 277,
	"./fr-ca": 278,
	"./fr-ca.js": 278,
	"./fr-ch": 279,
	"./fr-ch.js": 279,
	"./fr.js": 277,
	"./fy": 280,
	"./fy.js": 280,
	"./gd": 281,
	"./gd.js": 281,
	"./gl": 282,
	"./gl.js": 282,
	"./gom-latn": 283,
	"./gom-latn.js": 283,
	"./gu": 284,
	"./gu.js": 284,
	"./he": 285,
	"./he.js": 285,
	"./hi": 286,
	"./hi.js": 286,
	"./hr": 287,
	"./hr.js": 287,
	"./hu": 288,
	"./hu.js": 288,
	"./hy-am": 289,
	"./hy-am.js": 289,
	"./id": 290,
	"./id.js": 290,
	"./is": 291,
	"./is.js": 291,
	"./it": 292,
	"./it.js": 292,
	"./ja": 293,
	"./ja.js": 293,
	"./jv": 294,
	"./jv.js": 294,
	"./ka": 295,
	"./ka.js": 295,
	"./kk": 296,
	"./kk.js": 296,
	"./km": 297,
	"./km.js": 297,
	"./kn": 298,
	"./kn.js": 298,
	"./ko": 299,
	"./ko.js": 299,
	"./ky": 300,
	"./ky.js": 300,
	"./lb": 301,
	"./lb.js": 301,
	"./lo": 302,
	"./lo.js": 302,
	"./lt": 303,
	"./lt.js": 303,
	"./lv": 304,
	"./lv.js": 304,
	"./me": 305,
	"./me.js": 305,
	"./mi": 306,
	"./mi.js": 306,
	"./mk": 307,
	"./mk.js": 307,
	"./ml": 308,
	"./ml.js": 308,
	"./mn": 309,
	"./mn.js": 309,
	"./mr": 310,
	"./mr.js": 310,
	"./ms": 311,
	"./ms-my": 312,
	"./ms-my.js": 312,
	"./ms.js": 311,
	"./mt": 313,
	"./mt.js": 313,
	"./my": 314,
	"./my.js": 314,
	"./nb": 315,
	"./nb.js": 315,
	"./ne": 316,
	"./ne.js": 316,
	"./nl": 317,
	"./nl-be": 318,
	"./nl-be.js": 318,
	"./nl.js": 317,
	"./nn": 319,
	"./nn.js": 319,
	"./pa-in": 320,
	"./pa-in.js": 320,
	"./pl": 321,
	"./pl.js": 321,
	"./pt": 322,
	"./pt-br": 323,
	"./pt-br.js": 323,
	"./pt.js": 322,
	"./ro": 324,
	"./ro.js": 324,
	"./ru": 325,
	"./ru.js": 325,
	"./sd": 326,
	"./sd.js": 326,
	"./se": 327,
	"./se.js": 327,
	"./si": 328,
	"./si.js": 328,
	"./sk": 329,
	"./sk.js": 329,
	"./sl": 330,
	"./sl.js": 330,
	"./sq": 331,
	"./sq.js": 331,
	"./sr": 332,
	"./sr-cyrl": 333,
	"./sr-cyrl.js": 333,
	"./sr.js": 332,
	"./ss": 334,
	"./ss.js": 334,
	"./sv": 335,
	"./sv.js": 335,
	"./sw": 336,
	"./sw.js": 336,
	"./ta": 337,
	"./ta.js": 337,
	"./te": 338,
	"./te.js": 338,
	"./tet": 339,
	"./tet.js": 339,
	"./tg": 340,
	"./tg.js": 340,
	"./th": 341,
	"./th.js": 341,
	"./tl-ph": 342,
	"./tl-ph.js": 342,
	"./tlh": 343,
	"./tlh.js": 343,
	"./tr": 344,
	"./tr.js": 344,
	"./tzl": 345,
	"./tzl.js": 345,
	"./tzm": 346,
	"./tzm-latn": 347,
	"./tzm-latn.js": 347,
	"./tzm.js": 346,
	"./ug-cn": 348,
	"./ug-cn.js": 348,
	"./uk": 349,
	"./uk.js": 349,
	"./ur": 350,
	"./ur.js": 350,
	"./uz": 351,
	"./uz-latn": 352,
	"./uz-latn.js": 352,
	"./uz.js": 351,
	"./vi": 353,
	"./vi.js": 353,
	"./x-pseudo": 354,
	"./x-pseudo.js": 354,
	"./yo": 355,
	"./yo.js": 355,
	"./zh-cn": 356,
	"./zh-cn.js": 356,
	"./zh-hk": 357,
	"./zh-hk.js": 357,
	"./zh-tw": 358,
	"./zh-tw.js": 358
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 453;

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var YoutubePipe = (function () {
    function YoutubePipe(http, domSanitizer) {
        this.http = http;
        this.domSanitizer = domSanitizer;
    }
    /**
     * Takes a value and makes it lowercase.
     */
    YoutubePipe.prototype.transform = function (value) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + value + "?fs=0&rel=0&showinfo=0&controls=0&autoplay=0");
    };
    return YoutubePipe;
}());
YoutubePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'youtube',
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
], YoutubePipe);

//# sourceMappingURL=youtube.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ImagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var ImagePipe = (function () {
    /**
     * Takes a value and makes it lowercase.
     */
    function ImagePipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    ImagePipe.prototype.transform = function (value) {
        return this.domSanitizer.bypassSecurityTrustUrl(window.Ionic.normalizeURL(value));
    };
    return ImagePipe;
}());
ImagePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'imagePipe',
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
], ImagePipe);

//# sourceMappingURL=image.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TitlePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the TitlePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var TitlePipe = (function () {
    function TitlePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    TitlePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return value.replace(".mp4", "");
    };
    return TitlePipe;
}());
TitlePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'titlePipe',
    })
], TitlePipe);

//# sourceMappingURL=title.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShareService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_variables__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ShareService = (function () {
    function ShareService(globalVariablesService, platform, http, admobFree, toastCtrl) {
        this.globalVariablesService = globalVariablesService;
        this.platform = platform;
        this.http = http;
        this.admobFree = admobFree;
        this.toastCtrl = toastCtrl;
    }
    ShareService.prototype.sendSharing = function (notification) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem('utoken'));
        this.http.post(this.globalVariablesService.getHostname() + '/share/', notification, { headers: headers }).subscribe(function (data) {
            if (data.json().status == 2) {
                var toast = _this.toastCtrl.create({
                    message: 'You have successful shared: ' + notification.videoTitle,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    return ShareService;
}());
ShareService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* ToastController */]])
], ShareService);

//# sourceMappingURL=share.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoreActionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_users_users__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__download__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__share__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MoreActionService = (function () {
    function MoreActionService(toastCtrl, shareSrv, modalCtrl, downloadService, platform, loadingCtrl, globalVariablesService, alertCtrl, file, http, actionSheetCtrl) {
        this.toastCtrl = toastCtrl;
        this.shareSrv = shareSrv;
        this.modalCtrl = modalCtrl;
        this.downloadService = downloadService;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.globalVariablesService = globalVariablesService;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.http = http;
        this.actionSheetCtrl = actionSheetCtrl;
        this.diretories = [];
        this.buttons = [];
    }
    MoreActionService.prototype.getDirectories = function () {
        var _this = this;
        this.file.checkDir(this.file.dataDirectory, 'musicloader')
            .then(function (_) {
            //console.log('Directory exists');
            _this.listDir("download");
        })
            .catch(function (err) {
            //console.log('Directory doesnt exist');
            _this.file.createDir(_this.file.dataDirectory, 'musicloader', true)
                .then(function (_) {
                //console.log('Directory created');
                _this.listDir("download");
            })
                .catch(function (err) {
                console.log('Directory could not created');
            });
        });
    };
    //list directories
    MoreActionService.prototype.listDir = function (action) {
        var _this = this;
        this.file.listDir(this.file.dataDirectory, 'musicloader')
            .then(function (dirs) {
            _this.diretories = dirs;
            _this.presentActionSheet(action);
        })
            .catch(function (err) { return console.log('Directory doesnt exist'); });
    };
    MoreActionService.prototype.listDirWithListLoad = function (action, videos) {
        var _this = this;
        this.file.listDir(this.file.dataDirectory, 'musicloader')
            .then(function (dirs) {
            _this.diretories = dirs;
            _this.presentActionSheetWithListLoad(action, videos);
        })
            .catch(function (err) { return console.log('Directory doesnt exist'); });
    };
    //create musicloader main dir
    MoreActionService.prototype.createDir = function (nameDirectory, action) {
        var _this = this;
        this.file.createDir(this.file.dataDirectory + "/musicloader/", nameDirectory, true)
            .then(function (_) {
            _this.globalVariablesService.refresh = true;
            //console.log('Directory created');
            _this.listDir(action);
        })
            .catch(function (err) {
            console.log('Directory could not created');
        });
    };
    //create musicloader main dir
    MoreActionService.prototype.createDirWithListLoad = function (nameDirectory, action, videos) {
        var _this = this;
        this.file.createDir(this.file.dataDirectory + "/musicloader/", nameDirectory, true)
            .then(function (_) {
            _this.globalVariablesService.refresh = true;
            //console.log('Directory created');
            _this.listDirWithListLoad(action, videos);
        })
            .catch(function (err) {
            console.log('Directory could not created');
        });
    };
    //copy file
    MoreActionService.prototype.copyFile = function (newPlalistPath) {
        var _this = this;
        var songName = this.globalVariablesService.copySong.name;
        var direct = this.file.dataDirectory + "musicloader/" + this.globalVariablesService.copySongDir;
        //copy file
        this.file.copyFile(direct, songName, this.file.dataDirectory + '/musicloader/' + newPlalistPath + "/", songName).then(function (_) {
            _this.file.copyFile(direct, songName.replace(".mp4", ".jpg"), _this.file.dataDirectory + '/musicloader/' + newPlalistPath + "/", songName.replace(".mp4", ".jpg")).then(function (_) {
                alert("Song Successful Copied");
            })
                .catch(function (err) {
                console.log('Image File could not be copied' + JSON.stringify(err));
            });
        })
            .catch(function (err) {
            if (err.code == 12) {
                alert("Song still exists in playlist");
            }
            console.log('File could not be copied' + JSON.stringify(err));
        });
    };
    //move file
    MoreActionService.prototype.moveFile = function (newPlalistPath) {
        var _this = this;
        var songName = this.globalVariablesService.copySong.name;
        var direct = this.file.dataDirectory + "musicloader/" + this.globalVariablesService.copySongDir;
        //copy file
        this.file.moveFile(direct, songName, this.file.dataDirectory + '/musicloader/' + newPlalistPath + "/", songName).then(function (_) {
            _this.file.moveFile(direct, songName.replace(".mp4", ".jpg"), _this.file.dataDirectory + '/musicloader/' + newPlalistPath + "/", songName.replace(".mp4", ".jpg")).then(function (_) {
                _this.globalVariablesService.moveDir.splice(_this.globalVariablesService.moveSongPosition, 1);
                // alert("File Moved");
            })
                .catch(function (err) {
                console.log('Image File could not be moved' + JSON.stringify(err));
            });
        })
            .catch(function (err) {
            if (err.code == 12) {
                alert("File still exists in playlist");
            }
            console.log('File could not be moved' + JSON.stringify(err));
        });
    };
    MoreActionService.prototype.share = function () {
        var _this = this;
        var picture = this.globalVariablesService.getThumb();
        var videoTitle = this.globalVariablesService.getTitle();
        var videoId = this.globalVariablesService.getVideo();
        var usersModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_users_users__["a" /* Users */], { videoTitle: videoTitle, videoId: videoId, picture: picture });
        usersModal.onDidDismiss(function (data) {
            var notification = data;
            _this.shareSrv.sendSharing(notification);
        });
        usersModal.present();
    };
    //show playlist or create new one
    MoreActionService.prototype.presentActionSheet = function (action) {
        var _this = this;
        this.buttons = [];
        if (this.diretories.length != 0) {
            this.diretories.forEach(function (element) {
                if (element.isDirectory) {
                    _this.buttons.unshift({
                        text: 'Add to Playlist: ' + element.name,
                        icon: 'bookmark',
                        handler: function () {
                            if (action == "download") {
                                //add file to playlist/download file
                                _this.downloadService.serverMp3Download(element.name, 0);
                            }
                            else if (action == "copy") {
                                _this.copyFile(element.name);
                            }
                            else if (action == "move") {
                                _this.moveFile(element.name);
                            }
                        }
                    });
                }
            });
        }
        //Add create new Playlist to Alert
        this.buttons.unshift({
            text: 'Create New Playlist',
            icon: 'create',
            handler: function () { _this.showPrompt(action); }
        });
        this.buttons.unshift({
            text: 'Share: ' + this.globalVariablesService.getTitle().substring(0, 10) + "...",
            icon: 'share',
            handler: function () {
                _this.share();
            }
        });
        //Add cancel  to Alert
        this.buttons.push({
            text: 'Cancel',
            role: 'cancel',
            handler: function () {
                //console.log('Cancel clicked');
            }
        });
        var actionSheet = this.actionSheetCtrl.create({
            title: 'More Actions',
            buttons: this.buttons
        });
        actionSheet.present();
    };
    MoreActionService.prototype.sleep = function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };
    //show playlist or create new one
    MoreActionService.prototype.presentActionSheetWithListLoad = function (action, videos) {
        var _this = this;
        this.buttons = [];
        if (this.diretories.length != 0) {
            this.diretories.forEach(function (element) {
                if (element.isDirectory) {
                    _this.buttons.unshift({
                        text: 'Add to Playlist: ' + element.name,
                        icon: 'bookmark',
                        handler: function () {
                            if (action == "download") {
                                //add file to playlist/download file
                                var localthis_1 = _this;
                                var toast = _this.toastCtrl.create({
                                    message: 'Videos will be added. Please wait one moment',
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                                _this.loading = _this.loadingCtrl.create({
                                    content: 'Loading...',
                                });
                                _this.loading.present();
                                setTimeout(function () {
                                    localthis_1.startLoading(videos, element);
                                }, 5000);
                            }
                        }
                    });
                }
            });
        }
        //Add create new Playlist to Alert
        this.buttons.unshift({
            text: 'Create New Playlist',
            icon: 'create',
            handler: function () {
                _this.showPromptWithListLoad(action, videos);
            }
        });
        this.buttons.unshift({
            text: 'Share: ' + this.globalVariablesService.getTitle().substring(0, 10) + "...",
            icon: 'share',
            handler: function () {
                _this.share();
            }
        });
        //Add cancel  to Alert
        this.buttons.push({
            text: 'Cancel',
            role: 'cancel',
            handler: function () {
                //console.log('Cancel clicked');
            }
        });
        var actionSheet = this.actionSheetCtrl.create({
            title: 'More Actions',
            buttons: this.buttons
        });
        actionSheet.present();
    };
    MoreActionService.prototype.startLoading = function (videos, element) {
        var _this = this;
        videos.forEach(function (video) {
            _this.sleep(1000);
            if (video.snippet) {
                _this.downloadService.serverMp3DownloadWithParaPay(video.snippet.resourceId.videoId, element.name, video.snippet.title, video.snippet.thumbnails.high.url, 100, true);
            }
            else {
                _this.downloadService.serverMp3DownloadWithParaPay(video.ytId, element.name, video.ytName, video.ytthumb, 100, true);
            }
        });
        this.loading.dismissAll();
    };
    //Show Promt for new playlist
    MoreActionService.prototype.showPrompt = function (action) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'New Playlist',
            message: "Enter a name for your new playlist",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'playlist'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        //console.log('Saved clicked');
                        _this.createDir(data.title, action);
                    }
                }
            ]
        });
        prompt.present();
    };
    //Show Promt for new playlist
    MoreActionService.prototype.showPromptWithListLoad = function (action, videos) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'New Playlist',
            message: "Enter a name for your new playlist",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'playlist'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        // console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        //console.log('Saved clicked');
                        _this.createDirWithListLoad(data.title, action, videos);
                    }
                }
            ]
        });
        prompt.present();
    };
    return MoreActionService;
}());
MoreActionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__share__["a" /* ShareService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__download__["a" /* DownloadService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* ActionSheetController */]])
], MoreActionService);

//# sourceMappingURL=moreAction.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DownloadService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_paySongs_paySongs__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_variables__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DownloadService = (function () {
    function DownloadService(modalCtrl, alertCtrl, toastController, platform, globalVariablesService, transfer, file, http) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastController = toastController;
        this.platform = platform;
        this.globalVariablesService = globalVariablesService;
        this.transfer = transfer;
        this.file = file;
        this.http = http;
    }
    DownloadService.prototype.serverMp3DownloadWithPara = function (videoId, pathSmartphone, title, thumb, retries, needsPayment) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.fileTransfer = _this.transfer.create();
        });
        //mp3 download
        this.http.get(this.globalVariablesService.getMP3Api() + "mp4/?youtubeId=" + videoId + "&format=mp4").subscribe(function (data) {
            try {
                if (needsPayment == null) {
                    needsPayment = false;
                }
                _this.checkStatus(videoId, pathSmartphone, title, thumb, retries, needsPayment);
            }
            catch (error) {
                console.log(JSON.stringify(error));
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    DownloadService.prototype.needToPay = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Actually you have not enough credits',
            message: 'Do you want to load more music?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes of course',
                    handler: function () {
                        //open payment modal
                        var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_paySongs_paySongs__["a" /* PaySongs */]);
                        profileModal.present();
                    }
                }
            ]
        });
        alert.present();
    };
    DownloadService.prototype.serverMp3Download = function (pathSmartphone, retries) {
        var _this = this;
        if (parseInt(window.localStorage.getItem('amountSongs')) > 0) {
            this.platform.ready().then(function () {
                _this.fileTransfer = _this.transfer.create();
            });
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            //mp3 download
            this.http.get(this.globalVariablesService.getMP3Api() + "mp4/?youtubeId=" + this.globalVariablesService.getVideo() + "&format=mp4", { headers: headers }).subscribe(function (data) {
                try {
                    var videoState = data.json();
                    if (videoState.status == 3) {
                        _this.needToPay();
                    }
                    else {
                        var needsPayment = true;
                        _this.checkStatus(_this.globalVariablesService.getVideo(), pathSmartphone, _this.globalVariablesService.getTitle(), _this.globalVariablesService.getThumb(), retries, needsPayment);
                    }
                }
                catch (error) {
                    console.log(JSON.stringify(error));
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
        else {
            this.needToPay();
        }
    };
    DownloadService.prototype.serverMp3DownloadWithParaPay = function (videoId, pathSmartphone, title, thumb, retries, needsPayment) {
        var _this = this;
        if (parseInt(window.localStorage.getItem('amountSongs')) > 0) {
            this.platform.ready().then(function () {
                _this.fileTransfer = _this.transfer.create();
            });
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            //mp3 download
            this.http.get(this.globalVariablesService.getMP3Api() + "mp4/?youtubeId=" + videoId + "&format=mp3", { headers: headers }).subscribe(function (data) {
                try {
                    var videoState = data.json();
                    if (videoState.status == 3) {
                        _this.needToPay();
                    }
                    else {
                        var needsPayment_1 = true;
                        _this.checkStatus(videoId, pathSmartphone, title, thumb, retries, needsPayment_1);
                    }
                }
                catch (error) {
                    console.log(JSON.stringify(error));
                }
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
        else {
            this.needToPay();
        }
    };
    DownloadService.prototype.checkStatus = function (videoId, pathSmartphone, title, thumb, retries, needsPayment) {
        var _this = this;
        this.http.get(this.globalVariablesService.getMP3Api() + "checkStatus/?youtubeId=" + videoId + "&format=mp4").subscribe(function (data) {
            try {
                var videoState = data.json();
                if (videoState.status == "progressing") {
                    //console.log('Downloading...' +videoId);
                    var temp = _this;
                    setTimeout(function () {
                        temp.checkStatus(videoId, pathSmartphone, title, thumb, retries, needsPayment);
                    }, 1000);
                }
                else if (videoState.status == "finished") {
                    var downloadUrl = "/" + videoState.format + "/" + videoState.title + "." + videoState.format;
                    _this.download(videoId, downloadUrl, pathSmartphone, title, videoState, thumb, retries, needsPayment);
                }
                else {
                    console.log("Error, please try again or contact the developer");
                }
            }
            catch (error) {
                console.log(JSON.stringify(error));
            }
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    //download mp3 to smartphone
    DownloadService.prototype.download = function (videoId, downloadURL, pathSmartphone, title, videoState, thumb, retries, needsPayment) {
        var _this = this;
        try {
            this.fileTransfer.download(encodeURI(this.globalVariablesService.getMP3Api() + "download/?filename=" + downloadURL), this.file.dataDirectory + 'musicloader/' + pathSmartphone + "/" + downloadURL.replace("/mp4/", ""), true, {}).then(function (entry) {
                _this.downloadThumb("/" + videoState.title + ".jpg", pathSmartphone, thumb, title, needsPayment);
            }, function (error) {
                // handle error
                if (error.code == 3 && retries < 10) {
                    retries = retries + 1;
                    _this.serverMp3DownloadWithPara(videoId, pathSmartphone, title, thumb, retries, needsPayment);
                }
                console.log(JSON.stringify(error));
            });
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    };
    DownloadService.prototype.downloadThumb = function (pathExtension, pathSmartphone, thumbDownloadURL, title, needsPayment) {
        var _this = this;
        try {
            this.fileTransfer.download(encodeURI(thumbDownloadURL), this.file.dataDirectory + 'musicloader/' + pathSmartphone + "/" + pathExtension).then(function (entry) {
                var toast = _this.toastController.create({
                    message: 'Download finished: ' + title,
                    duration: 3000,
                    position: 'top'
                });
                _this.checkPayment(needsPayment);
                toast.present();
            }, function (error) {
                _this.checkPayment(needsPayment);
                // handle error
                console.log(JSON.stringify(error));
            });
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    };
    DownloadService.prototype.checkPayment = function (needsPayment) {
        if (needsPayment) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            this.http.get(this.globalVariablesService.getHostname() + "hasDownloaded", { headers: headers }).subscribe(function (data) {
                window.localStorage.setItem('amountSongs', data.json().amountSongs);
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    };
    return DownloadService;
}());
DownloadService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], DownloadService);

//# sourceMappingURL=download.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Users; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Users = (function () {
    function Users(loadingCtrl, platform, params, viewCtrl, globalVariablesService, http) {
        var _this = this;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.globalVariablesService = globalVariablesService;
        this.http = http;
        this.users = [];
        this.usersMusic = [];
        this.searchModel = "";
        this.videoTitle = "";
        this.picture = "";
        this.videoId = "";
        this.comment = "";
        this.videoTitle = params.get('videoTitle');
        this.picture = params.get('picture');
        this.videoId = params.get('videoId');
        if (this.videoId == "" || this.picture == "") {
            var creds = "getVideoInfoByName?title=" + this.videoTitle;
            this.loading = this.loadingCtrl.create({
                content: 'Loading video information...',
            });
            this.loading.present();
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            this.http.get(this.globalVariablesService.getHostname() + creds, { headers: headers }).timeout(15000).subscribe(function (data) {
                var dataMessage = data.json();
                _this.picture = dataMessage.picture.default.url;
                _this.videoId = dataMessage.videoId;
                _this.loading.dismissAll();
                _this.videoTitle = _this.videoTitle.replace(".mp4", "");
                _this.comment = "Check out this song: " + _this.videoTitle;
            }, function (error) {
                _this.loading.dismissAll();
                _this.viewCtrl.dismiss();
                console.log(JSON.stringify(error));
            });
        }
        this.comment = "Check out this song: " + this.videoTitle;
    }
    Users.prototype.getItems = function () {
        var _this = this;
        // set val to the value of the searchbar
        var val = this.searchModel;
        this.users = [];
        if (typeof val != 'undefined' && val.length > 0) {
            var creds = "getUsers?name=" + val;
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem('utoken'));
            this.http.get(this.globalVariablesService.getHostname() + creds, { headers: headers }).subscribe(function (data) {
                _this.users = data.json();
            }, function (error) {
                console.log(JSON.stringify(error));
            });
        }
    };
    Users.prototype.addUser = function (userId, index) {
        this.usersMusic.push(userId);
        this.users.splice(index, 1);
    };
    Users.prototype.removeUser = function (userId, index) {
        this.usersMusic.splice(index, 1);
        this.users.push(userId);
    };
    Users.prototype.dismiss = function () {
        var notification = {
            users: this.usersMusic,
            comment: this.comment,
            videoId: this.videoId,
            picture: this.picture,
            videoTitle: this.videoTitle
        };
        this.viewCtrl.dismiss(notification);
    };
    return Users;
}());
Users = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-users',template:/*ion-inline-start:"/Users/davidkoller/Documents/Video/App/video/src/pages/users/users.html"*/'<ion-header>\n  <ion-navbar>\n\n    <ion-title>\n      Share Your Music\n    </ion-title>\n\n    <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">Back</span>\n          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n        </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content>\n  <ion-list-header>\n    Your comment\n  </ion-list-header>\n  <ion-list>\n      <ion-item>\n          <ion-textarea rows="3" maxLength="500" autocorrect="on" [(ngModel)]="comment"></ion-textarea>\n        </ion-item>\n  </ion-list>\n\n  <ion-list-header>\n    Search Your Friends\n  </ion-list-header>\n  <ion-searchbar (ionChange)="getItems()" [(ngModel)] = "searchModel"></ion-searchbar>\n\n    <ion-list-header>\n      All Users\n      </ion-list-header>\n    <ion-card *ngFor="let user of users; let i = index;">\n      <ion-item>\n        <h2>{{user.username}}</h2>\n        <button ion-button outline item-end icon-left outline small  (click)="addUser(user, i)">  \n            <ion-icon name="plus"></ion-icon>\n            <div>Add</div>\n          </button>\n      </ion-item>\n    </ion-card> \n\n    <ion-list-header>\n        Share with following Friends\n      </ion-list-header>\n      <ion-card>\n          <ion-item *ngFor="let user of usersMusic; let d = index;">\n            <h2>{{user.username}}</h2>\n            <button ion-button outline item-end icon-left outline small (click)="removeUser(user, d)">  \n                <ion-icon name="minus"></ion-icon>\n                <div>Delete</div>\n              </button>\n    \n          </ion-item>\n        </ion-card> \n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/davidkoller/Documents/Video/App/video/src/pages/users/users.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_variables__["a" /* GlobalVariablesService */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], Users);

//# sourceMappingURL=users.js.map

/***/ })

},[371]);
//# sourceMappingURL=main.js.map