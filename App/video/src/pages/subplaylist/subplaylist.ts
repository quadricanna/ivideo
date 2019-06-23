import { Component } from '@angular/core';
import { ModalController,Platform, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { GlobalVariablesService } from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';

import { File } from '@ionic-native/file';
import { MoreActionService } from '../../providers/moreAction';
import { ShareService } from '../../providers/share';

import { Users } from '../users/users';

import { Http, Headers} from '@angular/http';

@Component({
  selector: 'page-subplaylist',
  templateUrl: 'subplaylist.html'
})
export class SubplaylistPage {

  diretories:any = {
    "playlist":"",
    "amount":0,
    "songs": []
  };
  videos:any = [];
  filteredVideos:any = [];

  filter ="";
  name="Playlist";
  dir:any;
  hasloaded=false;

  constructor(public httpCtrl: Http, private shareSrv: ShareService, private modalCtrl: ModalController, private moreActionSrv:MoreActionService,private platform:Platform, private actionSheetCtrl : ActionSheetController,public params: NavParams, private file:File, private admobService: AdmobService,   public navCtrl: NavController, private globalVariablesService:GlobalVariablesService) {

  }

  ionViewDidLoad(){
    if(this.dir == null){
      this.name = this.params.get('dir').playlist;
      this.diretories= this.params.get('dir');
    }
    this.loadFiles(null);
  }

  getFilterItems(){
    this.filteredVideos = this.diretories.songs.filter(val => {
      return val.name.toLowerCase().includes(this.filter.toLowerCase());
    });
  }


  loadFiles(refresher){
    this.diretories.songs= [];

    let counter = 0;

    let direct=this.file.dataDirectory+"musicloader/"+this.name +"/";
    let path= "";

    if(this.platform.is('android')){
      direct = this.file.dataDirectory+"musicloader/";
      path= this.name;
    }
    this.file.listDir(direct, path)
      .then(subdirs => {
        
        subdirs.forEach(subelement => { 
          if(subelement.isFile && subelement.fullPath.indexOf(".mp4") != -1){
            counter += 1;
              this.diretories.amount=counter;
              let videoTitle= subelement.name;
              let thumb = videoTitle.replace(".mp4", ".jpg");
              let videoDict = subelement.fullPath.replace(videoTitle, "");
              subelement["thumb"]=this.file.dataDirectory+videoDict+thumb;
              this.diretories.songs.push(subelement);
          }
        });
        if(refresher){
          refresher.complete();
        }
        this.hasloaded=true;
        this.filteredVideos = this.diretories.songs;
      })
      .catch(err => {
        if(refresher){
          refresher.complete();
        }
        this.hasloaded=true;
        console.log(JSON.stringify(err))

      });
  }



  playFiles(firstPlayingSong){
    this.videos = [];
    this.diretories.songs.forEach(element => { 
      if(element.nativeURL != firstPlayingSong.nativeURL){
        this.videos.push(element);
      }
    });

    this.videos.unshift(firstPlayingSong); 
    this.globalVariablesService.setVideo(this.videos);
    this.globalVariablesService.setAutoPlay(true);
    this.navCtrl.parent.select(3);

      //Autoamtic Backup after 6 min
      var lastDate = window.localStorage.getItem( 'lastPartialBackup');
      var mydate = new Date(lastDate);
  
      // Convert both dates to milliseconds
      var last = mydate.getTime();
      var now = new Date().getTime();
  
      // Calculate the difference in milliseconds
      var difference_ms = now - last;
      if(difference_ms > 400000){
        this.backUp();
      }


  }



  backUp(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('utoken', window.localStorage.getItem( 'utoken') );
    let tempVideos = [];
    this.diretories.songs.forEach(element => { 
      tempVideos.push({"playlist": this.name, "song":element.name});
    });

    this.httpCtrl.post(this.globalVariablesService.getHostname()+'/backup/', tempVideos, { headers: headers }).subscribe(data => {

      if(data.json().status == 2){
          window.localStorage.setItem('lastPartialBackup', new Date().toString());
        }
          
    }, error => {
        console.log(JSON.stringify(error));
    });    
  }


  share(videoTitle){
    let picture = "";
    let videoId = "";

    let usersModal = this.modalCtrl.create(Users, {videoTitle : videoTitle, videoId:videoId, picture : picture});
    usersModal.onDidDismiss(data => {
      let notification = data;
      if(notification){
        this.shareSrv.sendSharing(notification);
      }
    });
    usersModal.present();

  }

  more(directory, iPara){
    
        let actionSheet = this.actionSheetCtrl.create({
          title: 'More Actions',
          buttons: [
            {
              text: 'Play Song',
              icon:'play',
              handler: () => {
                this.playFiles(directory);
              }
            },{
              text: 'Share Song',
              icon:'share',
              handler: () => {
                this.share(directory.name);
              }
            },{
              text: 'Copy Song',
              icon:'copy',
              handler: () => {
                this.globalVariablesService.copySong=directory;
                this.globalVariablesService.copySongDir=this.name;
                this.moreActionSrv.listDir("copy");
              }
            },{
              text: 'Move Song',
              icon:'share-alt',
              handler: () => {
                this.globalVariablesService.copySong=directory;
                this.globalVariablesService.copySongDir=this.name;
                this.globalVariablesService.moveSongPosition=iPara;
                this.globalVariablesService.moveDir=this.diretories.songs;
                this.moreActionSrv.listDir("move");
              }
            },{
              text: 'Delete Song',
              icon:'md-trash',
              handler: () => {
                this.file.removeFile(this.file.dataDirectory+directory.fullPath.replace(directory.name, ""), directory.name)
                .then(_ => {
                    console.log('Directory deleted music file');

                    this.file.removeFile(this.file.dataDirectory+directory.fullPath.replace(directory.name, ""), directory.name.replace(".mp4",".jpg"))
                    .then(_ => {
                      this.diretories.songs.splice(iPara, 1);  
                      console.log('Directory deleted thumb file');
                      }
                    )
                    .catch(err => {
                      console.log(JSON.stringify(err));
                      console.log('Directory could not deleted thumb file');
                    });
                  }
                )
                .catch(err => {
                  console.log(JSON.stringify(err));
                  console.log('Directory could not deleted music file');
                });
                
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                //console.log('Cancel clicked');
              }
            }
          ]
    
        });
        actionSheet.present();
      }


}
