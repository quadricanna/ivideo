import { Component } from '@angular/core';
import { ModalController,Platform, NavController, NavParams, ActionSheetController, ToastController} from 'ionic-angular';

import { GlobalVariablesService } from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';

import { File } from '@ionic-native/file';
import { ShareService } from '../../providers/share';

import { DownloadService } from '../../providers/download';
import { MoreActionService } from '../../providers/moreAction';

import { Http, Headers} from '@angular/http';

@Component({
  selector: 'page-subnews',
  templateUrl: 'subnews.html'
})
export class SubnewsPage {


  videos:any = [];
  name="Charts";
  type:any;
  
  constructor(private toastCtrl:ToastController, private moreActionService : MoreActionService , private dlService:DownloadService,public httpCtrl: Http, private shareSrv: ShareService, private modalCtrl: ModalController, private moreActionSrv:MoreActionService,private platform:Platform, private actionSheetCtrl : ActionSheetController,public params: NavParams, private file:File, private admobService: AdmobService,   public navCtrl: NavController, private globalVariablesService:GlobalVariablesService) {

  }

  ionViewWillEnter(){
      this.videos = [];      
      this.videos = this.params.get('videos');
      this.type= this.params.get('type');
      this.name= this.params.get('name');
  }

  loadingVideo(video){
    if(video.snippet && video.snippet.channelId == 'false'){
      video.snippet.channelId= 'true';
    }else if(video.loaded && video.loaded == 'false'){
      video.loaded = 'true';
    }
  }

  ionViewDidLeave(){
    this.videos = [];      
  }

  more(video){
    this.moreActionService.getDirectories();

    if(video.snippet){
      this.globalVariablesService.setVideo(video.snippet.resourceId.videoId);
      this.globalVariablesService.setTitle(video.snippet.title);
      this.globalVariablesService.setThumb(video.snippet.thumbnails.high.url);
    }else{
      this.globalVariablesService.setVideo(video.ytId);
      this.globalVariablesService.setTitle(video.ytName);
      this.globalVariablesService.setThumb(video.ytthumb);
    }
  }


  downloadList(){
    if(this.videos.length > window.localStorage.getItem('amountSongs')){
      this.dlService.needToPay();
    }else{
      if(this.videos.length > 0){
        this.moreActionService.listDirWithListLoad("download", this.videos);
      }else{
        var toast = this.toastCtrl.create({
          message: 'Actual not all videos are loaded, please try again',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }
  }

}
