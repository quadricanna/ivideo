import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, ToastController, Platform } from 'ionic-angular';

import { GlobalVariablesService } from '../../providers/global-variables';
import { Http, Headers } from '@angular/http';

import { MoreActionService } from '../../providers/moreAction';
import { OneSignal } from '@ionic-native/onesignal';
import { AppRate } from '@ionic-native/app-rate';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  notifications : any = [];

  options : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only ,
    footer: 'yes',
    toolbarposition:'top',
    transitionstyle:'fliphorizontal'
};

  constructor( private iab: InAppBrowser, private appRate: AppRate,  private oneSignal: OneSignal, private viewCtrl: ViewController,private moreActionService : MoreActionService , public navCtrl: NavController, private http: Http, private globalVariablesService:GlobalVariablesService, private platform: Platform, private toastCtrl:ToastController) {
    
    
  }
  
enablePush(){
  if(this.platform.is('android')){
    // this.oneSignal.startInit("YOUR ID", "YOUR ID");
  }else{
    //   this.oneSignal.startInit("YOUR ID", "");
  }
  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  this.oneSignal.setSubscription(true);
  this.oneSignal.handleNotificationReceived().subscribe(() => {
  // do something when the notification is received.
  });
  this.oneSignal.handleNotificationOpened().subscribe(() => {
  // do something when the notification is opened.
  });
  
  this.oneSignal.promptForPushNotificationsWithUserResponse();
  this.oneSignal.endInit();

  this.oneSignal.getIds().then(pushData => {
  // this gives you back the new userId and pushToken associated with the device. Helpful.
    var creds ="enablePush?pushId=" + pushData.userId +"&pushToken="+ pushData.pushToken;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('utoken', window.localStorage.getItem( 'utoken'));

    this.http.get(this.globalVariablesService.getHostname() + creds, {headers: headers}).subscribe(data => {

        }, error => {
        console.log(JSON.stringify(error));
    }); 
     

  });
}


  ionViewDidLoad(){
      this.notifications = [];
      this.loadNotifications(); 
      this.enablePush();
  }

  loadNotifications(){
    this.notifications = [];
    var creds ="getNotifications";

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('utoken', window.localStorage.getItem( 'utoken'));

    this.http.get(this.globalVariablesService.getHostname() + creds, {headers: headers}).subscribe(data => {
      let notifications = data.json();
      notifications.forEach(element => {
              element.playing= 'false';
              this.notifications.push(element); 
              
          });

        }, error => {
        console.log(JSON.stringify(error));
    }); 

  }

  loadingVideo(video){
    video.watched = 1;

    if(video.type == "yt"){
      if(video.playing== 'false'){
        video.playing= 'true';
      }
    }else if(video.type == "rate"){
      // or, override the whole preferences object
      this.appRate.preferences.storeAppURL = {
        ios: '1307959900'
      };
      this.appRate.preferences.inAppReview = true;
      this.appRate.preferences.simpleMode = true;

      this.appRate.preferences.callbacks = {
        onRateDialogShow: function(callbacks){
          
        },
        onButtonClicked:function(callbacks){
          
        },
        handleNegativeFeedback:function(callbacks){
          alert('Please provide us some information what we can optimise');
        }
      };
     

      this.appRate.navigateToAppStore();
    }else{
      let target = "_blank";

      const browser = this.iab.create(video.ytId, target, this.options);
    }

    this.hasWatched(video);
  }

  //mark notification as seen
  hasWatched(video){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('utoken', window.localStorage.getItem( 'utoken'));

    this.http.get(this.globalVariablesService.getHostname() + "hasWatched?notificationId="+video.id, {headers: headers}).subscribe(data => {
        }, error => {
        console.log(JSON.stringify(error));
      }); 
  }


  more(video){
    this.moreActionService.getDirectories();
    this.globalVariablesService.setVideo(video.ytId);
    this.globalVariablesService.setTitle(video.songname);
    this.globalVariablesService.setThumb(video.picture);
  }

  dismiss() {

    this.viewCtrl.dismiss();
  }

  

}
