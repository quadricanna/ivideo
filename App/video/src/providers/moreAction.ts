import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  ModalController, Platform, ActionSheetController, AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Users } from '../pages/users/users';

import { GlobalVariablesService } from './global-variables';
import { DownloadService } from './download';
import { ShareService } from './share';


/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MoreActionService {
  diretories:any = [];
  buttons:any = [];
  loading: Loading;
  
  constructor(private toastCtrl:ToastController, private shareSrv: ShareService, private modalCtrl: ModalController, private downloadService: DownloadService, private platform: Platform, private loadingCtrl: LoadingController, private globalVariablesService: GlobalVariablesService, public alertCtrl: AlertController, private file: File, public http: Http, private  actionSheetCtrl: ActionSheetController ) {
    
  }

  getDirectories(){
    
    this.file.checkDir(this.file.dataDirectory, 'musicloader')
    .then(_ => {
        //console.log('Directory exists');
        this.listDir("download");
      }
    
    )
    .catch(err => {
      //console.log('Directory doesnt exist');

      this.file.createDir(this.file.dataDirectory, 'musicloader', true)
      .then(_ => {
        //console.log('Directory created');
        this.listDir("download");
        }
      )
      .catch(err => {
        console.log('Directory could not created');
      });

    });

  }

  //list directories
  listDir(action){
    this.file.listDir(this.file.dataDirectory, 'musicloader')
    .then(dirs => {
      this.diretories = dirs;
      this.presentActionSheet(action);
    })
    .catch(err => console.log('Directory doesnt exist'));
  }

  listDirWithListLoad(action, videos){
    this.file.listDir(this.file.dataDirectory, 'musicloader')
    .then(dirs => {
      this.diretories = dirs;
      this.presentActionSheetWithListLoad(action, videos);
    })
    .catch(err => console.log('Directory doesnt exist'));
  }

  //create musicloader main dir
  createDir(nameDirectory, action){

    this.file.createDir(this.file.dataDirectory+"/musicloader/", nameDirectory, true)
    .then(_ => {
      this.globalVariablesService.refresh=true;

      //console.log('Directory created');
      this.listDir(action);
      }
    )
    .catch(err => {
      console.log('Directory could not created');
    });
  }

    //create musicloader main dir
    createDirWithListLoad(nameDirectory, action, videos){
  
      this.file.createDir(this.file.dataDirectory+"/musicloader/", nameDirectory, true)
      .then(_ => {
        this.globalVariablesService.refresh=true;

        //console.log('Directory created');
        this.listDirWithListLoad(action, videos);
        }
      )
      .catch(err => {
        console.log('Directory could not created');
      });
    }

  //copy file
  copyFile(newPlalistPath){
    let songName = this.globalVariablesService.copySong.name;
    let direct = this.file.dataDirectory+"musicloader/"+this.globalVariablesService.copySongDir;
    //copy file
    this.file.copyFile(direct, songName, this.file.dataDirectory + '/musicloader/'+newPlalistPath+"/",songName).then(_ => {
      this.file.copyFile(direct, songName.replace(".mp4",".jpg"), this.file.dataDirectory + '/musicloader/'+newPlalistPath+"/",songName.replace(".mp4",".jpg")).then(_ => {
        alert("Song Successful Copied");
      })
      .catch(err => {
        console.log('Image File could not be copied'+JSON.stringify(err));
      });
    })
    .catch(err => {
      if(err.code==12){
        alert("Song still exists in playlist");
      }
      console.log('File could not be copied'+JSON.stringify(err));
    });
  }

  //move file
  moveFile(newPlalistPath){
    let songName = this.globalVariablesService.copySong.name;
    let direct = this.file.dataDirectory+"musicloader/"+this.globalVariablesService.copySongDir;
    //copy file
    this.file.moveFile(direct, songName, this.file.dataDirectory + '/musicloader/'+newPlalistPath+"/",songName).then(_ => {
      this.file.moveFile(direct, songName.replace(".mp4",".jpg"), this.file.dataDirectory + '/musicloader/'+newPlalistPath+"/",songName.replace(".mp4",".jpg")).then(_ => {
        this.globalVariablesService.moveDir.splice(this.globalVariablesService.moveSongPosition, 1); 
       // alert("File Moved");
      })
      .catch(err => {
        console.log('Image File could not be moved'+JSON.stringify(err));
      });
    })
    .catch(err => {
      if(err.code==12){
        alert("File still exists in playlist");
      }
      console.log('File could not be moved'+JSON.stringify(err));
    });
  }

  share(){
    let picture = this.globalVariablesService.getThumb();
    let videoTitle = this.globalVariablesService.getTitle();
    let videoId = this.globalVariablesService.getVideo();

    let usersModal = this.modalCtrl.create(Users, {videoTitle : videoTitle, videoId:videoId, picture : picture});
    usersModal.onDidDismiss(data => {
      let notification = data;
      this.shareSrv.sendSharing(notification);
    });
    usersModal.present();

  }

  //show playlist or create new one
  presentActionSheet(action) {
    this.buttons = [];

    
    if(this.diretories.length != 0){
      this.diretories.forEach(element => {
        if(element.isDirectory){
          this.buttons.unshift(
            {
              text: 'Add to Playlist: '+ element.name,
              icon:'bookmark',
              handler: () => {
                if(action=="download"){
                  //add file to playlist/download file
                  this.downloadService.serverMp3Download(element.name, 0);
                }else if(action=="copy"){
                  this.copyFile(element.name);
                }else if(action=="move"){
                  this.moveFile(element.name);
                }

              }
            }
          );
        } 
      });
    }
   
    //Add create new Playlist to Alert
    this.buttons.unshift(
      {
        text: 'Create New Playlist',
        icon:'create',
        handler: () => {this.showPrompt(action);}
      }
    );

    this.buttons.unshift(
      {
        text: 'Share: '+ this.globalVariablesService.getTitle().substring(0,10)+"...",
        icon:'share',
        handler: () => {
          this.share();

        }
      }
    );

    //Add cancel  to Alert
    this.buttons.push(
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }
    );

    let actionSheet = this.actionSheetCtrl.create({
      title: 'More Actions',
      buttons: this.buttons
    });
    actionSheet.present();
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  //show playlist or create new one
  presentActionSheetWithListLoad(action, videos) {
    this.buttons = [];

    if(this.diretories.length != 0){
      this.diretories.forEach(element => {
        if(element.isDirectory){
          this.buttons.unshift(
            {
              text: 'Add to Playlist: '+ element.name,
              icon:'bookmark',
              handler: () => {
                if(action=="download"){
                  //add file to playlist/download file
                  let localthis = this;
                  var toast = this.toastCtrl.create({
                    message: 'Videos will be added. Please wait one moment',
                    duration: 3000,
                    position: 'top'
                  });
                  toast.present();
                  this.loading = this.loadingCtrl.create({
                    content: 'Loading...',
                  });
                  this.loading.present();
                  setTimeout(() => 
                  {

                    localthis.startLoading(videos, element);
                  },
                  5000);
                }

              }
            }
          );
        } 
      });
    }
   
    //Add create new Playlist to Alert
    this.buttons.unshift(
      {
        text: 'Create New Playlist',
        icon:'create',
        handler: () => {
          this.showPromptWithListLoad(action, videos);}
      }
    );

    this.buttons.unshift(
      {
        text: 'Share: '+ this.globalVariablesService.getTitle().substring(0,10)+"...",
        icon:'share',
        handler: () => {
          this.share();

        }
      }
    );

    //Add cancel  to Alert
    this.buttons.push(
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }
    );

    let actionSheet = this.actionSheetCtrl.create({
      title: 'More Actions',
      buttons: this.buttons
    });
    actionSheet.present();
  }


  private startLoading(videos: any, element: any) {
    videos.forEach(video => {
      this.sleep(1000);
      if(video.snippet){
        this.downloadService.serverMp3DownloadWithParaPay(video.snippet.resourceId.videoId, element.name, video.snippet.title, video.snippet.thumbnails.high.url, 100, true);
      }else{
        this.downloadService.serverMp3DownloadWithParaPay(video.ytId, element.name, video.ytName, video.ytthumb, 100, true);
      }
    });
    this.loading.dismissAll();

  }

  //Show Promt for new playlist
  showPrompt(action) {
    let prompt = this.alertCtrl.create({
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
          handler: data => {
           // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            //console.log('Saved clicked');
            this.createDir(data.title, action)
          }
        }
      ]
    });
    prompt.present();
  }

     //Show Promt for new playlist
     showPromptWithListLoad(action, videos) {
      let prompt = this.alertCtrl.create({
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
            handler: data => {
             // console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              //console.log('Saved clicked');
              this.createDirWithListLoad(data.title, action, videos);
              
            }
          }
        ]
      });
      prompt.present();
    }
  
   


}
