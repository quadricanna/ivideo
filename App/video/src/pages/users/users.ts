import { Component } from '@angular/core';
import { ViewController, Platform, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import {GlobalVariablesService} from '../../providers/global-variables';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class Users {
  public users: any = [];
  public usersMusic: any = [];
  searchModel = "";
  public videoTitle:String = "";
  public picture:String = "";
  public videoId:String = "";
  comment:String = "";
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, private platform:Platform, private params: NavParams, public viewCtrl:ViewController,public globalVariablesService: GlobalVariablesService, private http: Http) {
    this.videoTitle = params.get('videoTitle');
    this.picture = params.get('picture');
    this.videoId = params.get('videoId');
    if(this.videoId == "" || this.picture == ""){
      var creds ="getVideoInfoByName?title="+ this.videoTitle;
      this.loading = this.loadingCtrl.create({
        content: 'Loading video information...',
      });
      this.loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('utoken', window.localStorage.getItem( 'utoken'));

      this.http.get(this.globalVariablesService.getHostname() + creds, {headers: headers}).timeout(15000).subscribe(data => {
        let dataMessage = data.json();
        this.picture = dataMessage.picture.default.url;
        this.videoId = dataMessage.videoId;
        this.loading.dismissAll();
        this.videoTitle=this.videoTitle.replace(".mp4", "");
        this.comment = "Check out this song: " + this.videoTitle;

      }, error => {
        this.loading.dismissAll();
        this.viewCtrl.dismiss();
          console.log(JSON.stringify(error));
      }); 
    }
    
    this.comment = "Check out this song: " + this.videoTitle;
  }


  getItems() {
    // set val to the value of the searchbar
    let val = this.searchModel;

    this.users = [];
    if(typeof val != 'undefined' && val.length > 0){
      
      var creds ="getUsers?name="+val;

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('utoken', window.localStorage.getItem( 'utoken'));

      this.http.get(this.globalVariablesService.getHostname() + creds, {headers: headers}).subscribe(data => {
        this.users = data.json();

      }, error => {
          console.log(JSON.stringify(error));
        }); 
    }
  }

  addUser(userId, index){
      this.usersMusic.push(userId);
      this.users.splice(index, 1);   
  }

  removeUser(userId, index){
    this.usersMusic.splice(index, 1);   
    this.users.push(userId);
  }

  dismiss() {
    let notification = {
      users : this.usersMusic,
      comment : this.comment,
      videoId : this.videoId,
      picture : this.picture,
      videoTitle : this.videoTitle
    };
    this.viewCtrl.dismiss(notification);
  }
}
