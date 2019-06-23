import { Component } from '@angular/core';
import { ModalController,NavController, ToastController, Platform, Loading, LoadingController} from 'ionic-angular';
import { GlobalVariablesService } from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';

import { LoginPage } from '../login/login';
import { Users } from '../users/users';
import { NotificationPage } from '../notification/notification';

import { AuthService } from '../../providers/auth-service';
import { Http, Headers } from '@angular/http';

import { MoreActionService } from '../../providers/moreAction';
import { ShareService } from '../../providers/share';

import { BackgroundMode } from '@ionic-native/background-mode';

import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';

import { AlertController } from 'ionic-angular';
import { Pro, AppInfo, DeployInfo } from '@ionic-native/pro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AuthService]
  
})

export class HomePage {
  tabBarElement: any;
  videos : any = [];
  loading: Loading;
  maxResults = 30;
  searchModel= "";
  username="";
  appVersion="1.3.1";

  notWatched=0;


  constructor(private pro: Pro, private alertCtrl: AlertController, private geolocation: Geolocation, private device: Device, private shareSrv: ShareService, private modalCtrl:ModalController, private moreActionService:MoreActionService,
    private admobService : AdmobService, private backgroundMode: BackgroundMode, private loadingCtrl:LoadingController, private platform: Platform, private toastCtrl:ToastController,private globalVariablesService:GlobalVariablesService, public navCtrl: NavController, private authserviceCtrl: AuthService, private http: Http) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    

    if(window.localStorage.getItem( 'utoken') == null){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  ionViewWillEnter(){
    if(window.localStorage.getItem( 'utoken') != null){
       this.platform.ready().then(() => {

        this.getNewNotifications();

        this.geolocation.getCurrentPosition().then((resp) => {

          this.updateUser(resp.coords.longitude, resp.coords.latitude);
  
          }).catch((error) => {
            this.updateUser("", "");
          });

        this.admobService.addAdmob();
      }); 
    }  
  }


  ionViewWillLeave(){
    this.videos.forEach(element => {
      element.snippet.channelId= 'false';
    });
  }

  ionViewDidLoad(){
   
    if(window.localStorage.getItem( 'utoken') != null){
       this.platform.ready().then(() => {
        this.backgroundMode.enable();
        this.username=window.localStorage.getItem('username');
      }); 
    }  
    

  }



  getNewNotifications(){
    
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('utoken', window.localStorage.getItem( 'utoken'));
  
      this.http.get(this.globalVariablesService.getHostname() + "getWatched", {headers: headers}).subscribe(data => {
        this.notWatched = data.json().message;
          }, error => {
          console.log(JSON.stringify(error));
      }); 
    
  }

  updateUser(lng, lat){
    var headers = new Headers();
            headers.append('utoken', window.localStorage.getItem( 'utoken') );

            var creds ="/updateUser?lastlong="+lng+"&lastlat="+lat+"&language="+navigator.language +"&uuid=" + this.device.uuid+ "&platform=" + this.device.platform+ "&model=" + this.device.model + "&platformversion=" + this.device.version +"&appversion=" +this.appVersion;
            this.http.get(this.globalVariablesService.getHostname() + creds, {headers:headers}).subscribe(data => {
              
              window.localStorage.setItem('username', data.json().message);
              if(window.localStorage.getItem('username') == 'Credentials are wrong'){
                var toast = this.toastCtrl.create({
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

              this.username = data.json().message;
            }, error => {
                console.log(JSON.stringify(error));
            }); 
  }
   

  getItems() {
    // set val to the value of the searchbar
    let val = this.searchModel;

    this.videos = [];
    if(typeof val != 'undefined' && val.length > 0){
      var creds ="search?key=<YOUR YT API KEY >&maxResults="+this.maxResults+"&part=snippet&q="+val;
      this.http.get(this.globalVariablesService.getAPI() + creds, ).subscribe(data => {
        let videosLocal = data.json().items;
        videosLocal.forEach(element => { 
          element.snippet.channelId= 'false';
          this.videos.push(element);
        });
        
      }, error => {
          console.log(JSON.stringify(error));
      }); 
    }
  }

  loadingVideo(video){
    if(video.snippet.channelId == 'false'){
      video.snippet.channelId= 'true';
    }
  }

  more(video){
    this.moreActionService.getDirectories();
    this.globalVariablesService.setVideo(video.id.videoId);
    this.globalVariablesService.setTitle(video.snippet.title);
    this.globalVariablesService.setThumb(video.snippet.thumbnails.high.url);
  }

  share(video){
    let videoId = video.id.videoId;
    let videoTitle = video.snippet.title;
    let picture = video.snippet.thumbnails.high.url;

    let usersModal = this.modalCtrl.create(Users, {videoTitle : videoTitle, videoId:videoId, picture : picture});
    usersModal.onDidDismiss(data => {
      let notification = data;
      this.shareSrv.sendSharing(notification);
    });
    usersModal.present();

  }

  notification(){

    let notificationsModal = this.modalCtrl.create(NotificationPage);
    notificationsModal.onDidDismiss(data => {
      this.getNewNotifications();
    });
    
    notificationsModal.present();

  }

  logout() {
      const confirm = this.alertCtrl.create({
          title: 'Logout',
          message: 'Would you like to leave the app?',
          buttons: [
            {
              text: 'No',
              handler: () => {

              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.authserviceCtrl.logout(this.tabBarElement);
              }
            }
          ]
        });
        confirm.present();
      }
   

}
