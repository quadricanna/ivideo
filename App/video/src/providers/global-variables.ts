import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalVariablesService {
  isLoggedin:any;
  hostname:any;
  hostnameSecure:any;
  allAppHostname:any;
  api:any;
  videoId:any = [];
  title:any ="";
  thumb:any="";
  mp3Api:any="";
  autoPlay:any=false;

  refresh:any=true;

  copySong:any;
  copySongDir:String;
  moveSongPosition:Number;
  moveDir:any = [];

  constructor(public http: Http) {
    this.isLoggedin = false;
    this.hostname = "http://YOUR API/";
    this.hostnameSecure = "http://YOUR API/";

    this.allAppHostname = "http://YOUR API/";
    this.api = "https://www.googleapis.com/youtube/v3/";
    this.mp3Api="http://YOUR DOWNLOAD API/";
  }

  setIsLoggedIn(value) {
    this.isLoggedin = value;
  }

  getAutoPlay() {
    return this.autoPlay;
  }

  setAutoPlay(autoPlay) {
    this.autoPlay = autoPlay;
  }

  getVideo() {
    return this.videoId;
  }

  setVideo(videoId) {
    this.videoId = videoId;
  }

  getThumb() {
    return this.thumb;
  }

  setThumb(thumb) {
    this.thumb = thumb;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }




  getMP3Api(){
    return this.mp3Api;
  }

  getAPI() {
    return this.api;
  }

  getIsLoggedIn() {
    return this.isLoggedin;
  }

  getHostname() {
    return this.hostname;
  } 



}
