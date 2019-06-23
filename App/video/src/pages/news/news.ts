import { Component, ViewChild } from '@angular/core';
import { ModalController, Slides, NavController, ToastController, Platform,Loading, LoadingController } from 'ionic-angular';

import { GlobalVariablesService } from '../../providers/global-variables';
import { Http, Headers } from '@angular/http';

import { AdmobService } from '../../providers/admob';

import { MyApps } from '../myapps/myapps';
import { SubnewsPage } from '../subnews/subnews';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  @ViewChild(Slides) slides: Slides;
  type = "classic";

  videos : any = [];
  arrayOfListKeys : any = [];
  currentIndex:number = 0;
  loading: Loading;

  listCharts:any = {
    albums :[], 
    lists :[], 
    popular :[], 
    classic : [
    {
      "listId":"PL6D4C31FFA7EBABB5",
      "results":50,
      "image":"./assets/imgs/charts.jpg",
      "name":"Top Charts",
      "tracks": ""
    },{
      //"listId":"PLV6K7Y6qgT3XEUqr0wdcMsJURoj_K5574",
      "listId":"PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj",
      "results":50,
      "image":"./assets/imgs/pop.jpg",
      "name":"Pop & Rock",
      "tracks": ""
    },{
      "listId":"PL7Vr8XNhXsJAKgFY8jlTUAgiMDByR3oaw",
      "results":50,
      "image":"./assets/imgs/house.jpg",
      "name":"House Music",
      "tracks": ""
    },{
      "listId":"PLToQGg12V725ccu7cfjFY1tsOYGeqHyV8",
      "results":50,
      "image":"./assets/imgs/house2.jpg",
      "name":"House Music",
      "tracks": ""
    },{
      "listId":"PLFqEc99ShGt14pTbICAYb7wIjBBvTRSpo",
      "results":50,
      "image":"./assets/imgs/workout.jpg",
      "name":"Workout",
      "tracks": ""
    },{
      "listId":"PLN3h3MQ8RhVy7CtflMwSvV7AN3-dxxBZH",
      "results":50,
      "image":"./assets/imgs/us.jpg",
      "name":"US Top Charts",
      "tracks": ""
    },{
      "listId":"PLlYKDqBVDxX03U-pKzWErlAdOfuJUEs4v",
      "results":50,
      "image":"./assets/imgs/germanrap.jpg",
      "name":"German Rap",
      "tracks": ""
    },{
      "listId":"PLjzeyhEA84sS6ogo2mXWdcTrL2HRfJUv8",
      "results":50,
      "image":"./assets/imgs/deephouse.jpg",
      "name":"Deep House Music",
      "tracks": ""
    },{
      "listId":"PLMmqTuUsDkRLtdjad9RRXnKcYyazZKrI5",
      "results":50,
      "image":"./assets/imgs/rap.jpg",
      "name":"Rap Music",
      "tracks": ""
    },{
      "listId":"PLRZlMhcYkA2EQRcAq4nf7pFP3LcD5uX7h",
      "results":50,
      "image":"./assets/imgs/us.jpg",
      "name":"Rap Music",
      "tracks": ""
    }
  ]
};

constructor(private loadingCtrl:LoadingController, private modalCtrl:ModalController, private admobService:AdmobService, public navCtrl: NavController, private http: Http, private globalVariablesService:GlobalVariablesService, private platform: Platform, private toastCtrl:ToastController) {
    
    
  }


  showSubNews(type, index, name, key, listId){
    let videos = this.listCharts.classic;
    this.loadMusicGenre(index, type, name);
    
  }

  loadMusicGenre(index, type, name){
    let videos = [];

    if(index == 3 && this.listCharts.classic[3].tracks.length == 0){
      this.loading = this.loadingCtrl.create({
        content: 'Loading...',
      });
      this.loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('utoken', window.localStorage.getItem( 'utoken') );

      var creds= "getSimilarMusic";
      this.http.get(this.globalVariablesService.getHostname() + creds, {headers:headers}  ).timeout(10000).subscribe(data => {
        let tempVideos = data.json().items;
        tempVideos.forEach(element => {
            element.snippet.channelId= 'false';
            if(element.snippet.thumbnails){
              videos.push(element); 
            }
        });    
        this.listCharts.classic[3].tracks= videos;
        this.loading.dismissAll();

        this.navCtrl.push(SubnewsPage, {videos : this.listCharts.classic[3].tracks, type:type, name:name});

      }, (err) => {
        this.loading.dismissAll();

      });
    }else if(this.listCharts.classic[index].tracks.length == 0) {
      this.loading = this.loadingCtrl.create({
        content: 'Loading...',
      });
      this.loading.present();
      var creds= "playlistItems?part=snippet&playlistId="+this.listCharts.classic[index].listId+"&key=YOUR API KEY&maxResults="+this.listCharts.classic[index].results;
      this.http.get(this.globalVariablesService.getAPI() + creds, ).timeout(10000).subscribe(data => {
          let tempVideos = data.json().items;
          tempVideos.forEach(element => {
              element.snippet.channelId= 'false';
              if(element.snippet.thumbnails){
                videos.push(element); 
              }
          });

          this.listCharts.classic[index].tracks = videos;
          this.loading.dismissAll();

          this.navCtrl.push(SubnewsPage, {videos : this.listCharts.classic[index].tracks, type:type, name:name});
        }, (err) => {
          this.loading.dismissAll();

        });
    }else{

      this.navCtrl.push(SubnewsPage, {videos : this.listCharts.classic[index].tracks, type:type, name:name});
    }
  }


  showApps(){
    let myApps = this.modalCtrl.create(MyApps);
    myApps.present();
  }

}
