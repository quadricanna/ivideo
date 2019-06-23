import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewController, Platform, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {GlobalVariablesService} from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';
import { AppRate } from '@ionic-native/app-rate';

import 'rxjs/add/operator/timeout';
declare var paypal: any;

@Component({
  selector: 'page-paySongs',
  templateUrl: 'paySongs.html'
})
export class PaySongs {
  payments:any = [
    {
      "songs":25,
      "payment":2.99,
      "image": "./assets/imgs/deephouse.jpg"
    },{
      "songs":50,
      "payment":4.99,
      "image": "./assets/imgs/house.jpg"
    },{
      "songs":100,
      "payment":9.99,
      "image": "./assets/imgs/us.jpg"
    }]

    frees:any = [
      {
        "songs": 1,
        "key" : "iner",
        "desc": "Click the advertisement",
        "image": "./assets/imgs/rap.jpg"
      }, {
        "songs": '3',
        "key" : "rate",
        "desc": "Rate App Positively - IMPORTANT: Use your Username as Name - Just one time",
        "image": "./assets/imgs/deephouse.jpg"
      },  {
        "songs": '1',
        "key" : "daily",
        "desc": "Daily Login",
        "image": "./assets/imgs/charts.jpg"
      }]

  selectedPackage;
  loading: Loading;
  paypal_initialized;
  hasRated= "0";
  securityId="init";
  lastSecurityId="";

  @ViewChild('paypalbuttoncontainer') paypalbuttoncontainer: ElementRef;
  voucher = "";


  constructor(private appRate: AppRate, private admobService : AdmobService, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private platform:Platform, public viewCtrl:ViewController,public globalVariablesService: GlobalVariablesService, private http: Http) {
    
    let local_this1 = this;
    let local_this = this;

    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function(e) {
      var toast = local_this1.toastCtrl.create({
        message:  "Actually there are no ads available. Try again in some minutes ;)",
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });


    document.addEventListener('admob.interstitial.events.EXIT_APP', (err) => {
      if(this.lastSecurityId!=this.securityId){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('utoken', window.localStorage.getItem( 'utoken'));
        headers.append('type', 'Interstitial Click');
      
        local_this.http.get(this.globalVariablesService.hostnameSecure + "hasFreebie?id=1&sec=1&sec2="+this.securityId, {headers: headers}).subscribe(data => {
                  window.localStorage.setItem('amountSongs', data.json().amountSongs);
                  local_this.admobService.addAdmob();
                  this.lastSecurityId=this.securityId;

                  var toast = local_this.toastCtrl.create({
                    message: "Thank you for your support. You can watch more video",
                    duration: 3000,
                    position: 'top'
                  });
              
                  toast.present();
            }, error => {
            console.log(JSON.stringify(error));
        });
      }else{
        var toast = local_this.toastCtrl.create({
          message: "Sorry but you have to load a new ad for getting coins",
          duration: 3000,
          position: 'top'
        });
    
        toast.present();
      }

    });
    
    document.addEventListener('admob.rewardvideo.events.REWARD', (err) => {

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('utoken', window.localStorage.getItem( 'utoken'));
      headers.append('type', 'Rewardvideo');

      local_this.http.get(this.globalVariablesService.hostnameSecure + "hasFreebie?id=1&sec=1", {headers: headers}).subscribe(data => {
                window.localStorage.setItem('amountSongs', data.json().amountSongs);

                local_this.admobService.addAdmob();

                var toast = local_this.toastCtrl.create({
                  message: "Thank you for your support. You can watch more video",
                  duration: 3000,
                  position: 'top'
                });
            
                toast.present();
          }, error => {
          console.log(JSON.stringify(error));
      }); 

  });

  document.addEventListener('admob.rewardvideo.events.EXIT_APP', (err) => {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('utoken', window.localStorage.getItem( 'utoken'));
    headers.append('type', 'Rewardvideo Click');

    local_this.http.get(this.globalVariablesService.hostnameSecure + "hasFreebie?id=1&sec=1", {headers: headers}).subscribe(data => {
              window.localStorage.setItem('amountSongs', data.json().amountSongs);

              local_this.admobService.addAdmob();

              var toast = local_this.toastCtrl.create({
                message: "Thank you for your support. You can watch more video",
                duration: 3000,
                position: 'top'
              });
          
              toast.present();
        }, error => {
        console.log(JSON.stringify(error));
    }); 

});

  }

  ionViewDidLoad(){
    this.hasRated= window.localStorage.getItem('rated');
  }

    initPayPal(element) {
      if(window.localStorage.getItem('username') == 'Credentials are wrong'){
        var toast = this.toastCtrl.create({
          message: 'Actually you are not logged in, please relogin otherwise we can not add credits to your account',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      this.paypal_initialized = true;
      let paypalbuttoncontainer = this.paypalbuttoncontainer.nativeElement as HTMLDivElement;
      let newthis = this;
      paypal.Button.render({
        env: 'production', // sandbox | production
        local:'en_US',
        style: {
          size: 'responsive',
          color: 'blue',
          shape: 'rect',
          label: 'buynow', //                    label: checkout, buynow, credit, pay, paypal
          tagline: false
        },
      
      
        client: {
          sandbox: 'YOUR KEY',
          production:'YOUR KEY'
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
                  description: 'iVideo: '+ window.localStorage.getItem('username'),
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
            console.log("---------WE HAVE AN ERROR-------------------")
            console.log("ERROR: " + error)
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
    }


  
      sendReceiptToServer( receipt ) {
            this.loading = this.loadingCtrl.create({
                content: 'Verify your payment...',
            });
            this.loading.present();

            let path =  "/checkPaymentSongs";
  
            let url = this.globalVariablesService.getHostname() +  path;
            let data = {
              receipt: receipt
            }
    
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem( 'utoken'));
            headers.append('ppid', receipt.id);	

            let options = new RequestOptions({ headers: headers });
    
            this.http.post( url, data, options ).timeout(600000)
              .subscribe(response => {
                this.loading.dismissAll();
                if(response.json().status==2){

                  var availableSongs = parseInt(window.localStorage.getItem('amountSongs')) + parseInt(response.json().addSongs);
                  window.localStorage.setItem('amountSongs', availableSongs.toString());

                  var toast = this.toastCtrl.create({
                      message: "Thank you for your support. We have added " + response.json().addSongs + " more songs",
                      duration: 3000,
                      position: 'top'
                  });
              
                  toast.present();
                }else{
                  var toast = this.toastCtrl.create({
                      message: "Actually there was a problem with your payment. Maybe you should contact us",
                      duration: 3000,
                      position: 'top'
                  });
              
                  toast.present();
                }
  
              },
              error => {
                this.loading.dismissAll();
                // probably a bad url or 404
                console.log(JSON.stringify(error));
              })
    
      }

  dismiss() {
    let notification = {
      amountSongs : window.localStorage.getItem('amountSongs')
    };
    this.viewCtrl.dismiss(notification);
  }

  selectPackage(selectedPackage){
    this.selectedPackage = selectedPackage;

    this.paypalbuttoncontainer.nativeElement.innerHTML = '';
    this.initPayPal(selectedPackage);

  }

  reward(free){
    if(free.key == "video" ){      
      this.admobService.addRewardAdmob();
    }else if(free.key == "rate" ){
      this.appRate.preferences.storeAppURL = {
        ios: '1435004764'
      };
    
      this.appRate.preferences.callbacks = {
        onRateDialogShow: function(callbacks){
          window.localStorage.setItem('rated', '1');
        },
        onButtonClicked:function(callbacks){
          window.localStorage.setItem('rated', '1');
        },
        handleNegativeFeedback:function(callbacks){
          window.localStorage.setItem('rated', '1');

          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('utoken', window.localStorage.getItem( 'utoken'));
          headers.append('type', 'Rate App negativ');
          
          this.http.get(this.globalVariablesService.hostnameSecure + "hasFreebie/?sec=1&id=-" + free.songs, {headers: headers}).subscribe(data => {
                    var availableSongs = parseInt(window.localStorage.getItem('amountSongs')) - 3;
                    window.localStorage.setItem('amountSongs', availableSongs.toString());
              }, error => {
              console.log(JSON.stringify(error));
          }); 
          alert('Please provide us some information what we can optimise');        }
      };
     
      this.appRate.navigateToAppStore();

    }else if(free.key == "iner" ){
      this.securityId=this.guid();
      this.admobService.addIntersAdmob();
    }
  }

  redeemVoucher(){
          this.loading = this.loadingCtrl.create({
              content: 'Verify your payment...',
          });
          this.loading.present();

          let path =  "/checkVoucher?voucher=" +this.voucher;

          let url = this.globalVariablesService.getHostname() +  path;

          var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('utoken', window.localStorage.getItem( 'utoken'));

            let options = new RequestOptions({ headers: headers });
    
            this.http.get( url, options ).timeout(600000)
              .subscribe(response => {
                this.loading.dismissAll();
                if(response.json().status==2){

                  var availableSongs = parseInt(window.localStorage.getItem('amountSongs')) + parseInt(response.json().addSongs);
                  window.localStorage.setItem('amountSongs', availableSongs.toString());

                  var toast = this.toastCtrl.create({
                      message: "Thank you for your support. We have added " + response.json().addSongs + " more songs",
                      duration: 3000,
                      position: 'top'
                  });
              
                  toast.present();
                }else{
                  var toast = this.toastCtrl.create({
                      message: "Actually there was a problem with your voucher.",
                      duration: 3000,
                      position: 'top'
                  });
              
                  toast.present();
                }
              });
            }

            guid() {
              function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              }
              return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }
          


}
