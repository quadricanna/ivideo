import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform,ToastController} from 'ionic-angular';

import { MusicControls } from '@ionic-native/music-controls';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { GlobalVariablesService } from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';
import { DomSanitizer } from '@angular/platform-browser';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { Http, Headers, RequestOptions } from '@angular/http';

declare var paypal: any;


@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
  displayFormat : String = 'portrait' ;
  isPortrait : String = "true";
  url:String="";
  videoURL:any = [];
  playlistPara:any = 0;

  videoTitle:String="";
  videoThumbPath:any ="";
  videoThumb:any ="";


  isSingleRepeating:any = "false";
  isShuffle:any = "false";
  zone:NgZone;

  paypal_initialized;
  @ViewChild('paypalbuttoncontainer') paypalbuttoncontainer: ElementRef;
  hasPayed:number = 0;

  constructor(private http: Http, private toastCtrl:ToastController, private streamingMedia: StreamingMedia, private fileObject:File, private domSanitizer: DomSanitizer, private media: Media, private admobService: AdmobService, public musicControls: MusicControls, private platform: Platform, public navCtrl: NavController, private globalVariablesService:GlobalVariablesService) {

  }


ionViewDidLeave(){
  this.globalVariablesService.setAutoPlay(false);
}
  ionViewDidLoad(){
    //check when interstitial is closed
    document.addEventListener('admob.interstitial.events.CLOSE', (event) => {
     // this.admobService.addAdmob();
    });
  }

  ionViewWillEnter(){


    this.admobService.hideBanner();
    this.hasPayed=parseInt(window.localStorage.getItem( 'admob'));
    if(this.hasPayed != 1 && parseInt(window.localStorage.getItem('sessions')) < 10) {
      this.hasPayed=1;
    }

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.setupPayPay();

    if(window.localStorage.getItem( 'admob') != '1' && parseInt(window.localStorage.getItem('sessions')) > 10){
      this.admobService.addIntersAdmob();
    }

    if(this.globalVariablesService.getAutoPlay()){
      this.videoURL = this.globalVariablesService.getVideo();
      if(this.videoURL.length > 0){
        this.playlistPara= 0;
        this.play(this.playlistPara);
      }
    }

  }

  playNext(){
    this.zone.run(() => {

      if(this.isShuffle == "true"){
        this.getShuffleIndex();
      }else if(this.isSingleRepeating == "false"){
        this.playlistPara += 1; 
        //start from beginning
        
        if(this.videoURL.length > this.playlistPara){
          
        }else{
          this.playlistPara = 0; 
        }
      }
      this.play(this.playlistPara);
    });
  }

  changeIsSingleRepeating(){
    if(this.isSingleRepeating =="false"){
      this.isShuffle = "false";
      this.isSingleRepeating = "true";
    }else{
      this.isSingleRepeating = "false";
    }
  }

  changeIsShuffle(){
    if(this.isShuffle =="false"){
      this.isSingleRepeating = "false";
      this.isShuffle = "true";     
    }else{
      this.isShuffle = "false";
    }
  }

  changePortait(){
    if(this.isPortrait =="false"){
      this.displayFormat = "portrait";
      this.isPortrait = "true";     
    }else{
      this.displayFormat = "landscape";
      this.isPortrait = "false";
    }
  }

  playPre(){

    if(this.isShuffle == "true"){
      this.getShuffleIndex();
    }else if(this.isSingleRepeating == "false"){
      if(this.playlistPara > 0){
        this.playlistPara -= 1; 
      }else{
        this.playlistPara = this.videoURL.length-1;
      }
    }  

    this.play(this.playlistPara);
  }

  private getShuffleIndex(){
    let newIndex=this.playlistPara;
    if(this.videoURL.length > 1){
      while(newIndex == this.playlistPara ){
        newIndex = Math.floor(Math.random() * this.videoURL.length);
      }
    }

    this.playlistPara = newIndex;
  }

  play(paraId){
    this.videoTitle= this.videoURL[paraId].name;
    let thumb = this.videoURL[paraId].name.replace(".mp4", ".jpg");
    let videoDict = this.videoURL[paraId].fullPath.replace(this.videoTitle, "");
    this.videoThumbPath = this.fileObject.dataDirectory+ videoDict +thumb;

    this.fileObject.readAsDataURL(this.fileObject.dataDirectory+ videoDict ,thumb).then(file => {
      this.videoThumb = file;
      this.run(paraId);
    })
    .catch(err => {
      this.run(paraId);
      console.log(JSON.stringify(err));
    });

  }

  run(paraId){
    this.url = this.videoURL[paraId].toURL();
    this.playvideo(this.url);
  }

  onPlayed(direction, how){

    if(direction == "for"){
      this.playNext();
    }else if(direction == "back"){
      this.playPre();
    }

  }

      onErrorMusic(error){
        console.log(JSON.stringify(error));
      }
    
      playvideo(url) {
        if(this.streamingMedia && url.length > 0){
          let options: StreamingVideoOptions = {
            successCallback: () => { 
              this.onPlayed('for', "auto"); 
            },
              
            errorCallback: (e) => { console.log('Error streaming') },
            orientation: this.displayFormat.toString(),
            shouldAutoClose: true,
            controls: false
          };
          
          this.streamingMedia.playVideo(url , options);
        }
        
      }
      

   /*
      PAY
      */

     setupPayPay() {
      if (!this.paypal_initialized) {
        this.initPayPal();
      }
    }
  
    initPayPal() {
      this.paypal_initialized = true;
      let paypalbuttoncontainer = this.paypalbuttoncontainer.nativeElement as HTMLDivElement;
      let _thiss = this;
  
      paypal.Button.render({
        env: 'production', // sandbox | production
        local:'en_US',
        style: {
          size: 'responsive',
          color: 'black',
          shape: 'rect',
          label: 'paypal', //                    label: checkout, buynow, credit, pay, paypal
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
            _thiss.sendReceiptToServer(data);
      
          });
        }
      
      }, paypalbuttoncontainer);
    }


  
      sendReceiptToServer( receipt ) {
      
            let path =  "/checkPayment";
  
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
    
                if(response.json().status==2){
                  window.localStorage.setItem( 'admob' , "1");
                  this.hasPayed=1;
                  var toast = this.toastCtrl.create({
                      message: "Thank you for your support. Ads are now removed for 1 month from player",
                      duration: 3000,
                      position: 'top'
                  });
              
                  toast.present();
                }else{
                  var toast = this.toastCtrl.create({
                      message: "Actually there is no active payment",
                      duration: 3000,
                      position: 'top'
                  });
              
                  toast.present();
                }
  
              },
              error => {
  
                // probably a bad url or 404
                console.log(JSON.stringify(error));
              })
    
      }




}
