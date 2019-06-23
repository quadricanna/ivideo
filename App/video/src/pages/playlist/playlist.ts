import { Component } from '@angular/core';
import {  NavController, Platform, AlertController, ActionSheetController, ModalController} from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
import { MusicControls } from '@ionic-native/music-controls';

import { GlobalVariablesService } from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';

import { File } from '@ionic-native/file';
import { SubplaylistPage } from '../subplaylist/subplaylist';
import { SettingsPlaylistPage } from '../settings-playlist/settings-playlist';
import { Http, Headers} from '@angular/http';
import { PaySongs } from '../paySongs/paySongs';


@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistPage {
  videoURL:any = [];
  playlistPara:any = 0;
  diretories:any = [];
  musicMap:any = [];
  amountSongs:number = 0;

  constructor(public alertCtrl: AlertController, public httpCtrl: Http, public modalCtrl: ModalController, private actionSheetCtrl : ActionSheetController,private file:File, private admobService: AdmobService, private musicControls: MusicControls, private platform: Platform, private nativeAudio: NativeAudio, public navCtrl: NavController, private globalVariablesService:GlobalVariablesService) {

  }


  ionViewWillEnter(){
    if(window.localStorage.getItem('amountSongs')){
      this.amountSongs = parseInt(window.localStorage.getItem('amountSongs'));
    }else{
      this.amountSongs = 0;
    }

    this.admobService.addAdmob();
    if(this.globalVariablesService.refresh){
      this.getDirectories();
      this.globalVariablesService.refresh=false;
    }    
  }


  openSettings(){
    let profileModal = this.modalCtrl.create(SettingsPlaylistPage, {dirs:this.musicMap});
    profileModal.present();
  }

  getDirectories(){
    this.file.checkDir(this.file.dataDirectory, 'musicloader')
    .then(_ => {
        //console.log('Directory exists');
        this.listDir(null);
      }
    
    )
    .catch(err => {
      //console.log('Directory doesnt exist');

      this.file.createDir(this.file.dataDirectory, 'musicloader', true)
      .then(_ => {
        //console.log('Directory created');
        this.listDir(null);
        }
      )
      .catch(err => {
        console.log('Directory could not created');
      });

    });

  }

  //list directories
  listDir(refresher){
    this.musicMap = [];
    this.diretories = [];

    this.file.listDir(this.file.dataDirectory, 'musicloader')
    .then(dirs => {
        //Count Sub Elements (mp3 in list)
        dirs.forEach(element => { 
            let direct=this.file.dataDirectory+element.fullPath;
            let path= "";
      
            if(this.platform.is('android')){
              direct = this.file.dataDirectory+"musicloader/";
              path= element.name;
            }
            this.diretories.push({"playlist" : element.name, "amount" : 0, "songs" : []});

          });  
          if(refresher){
            refresher.complete();
          }
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      if(refresher){
        refresher.complete();
      }
    });
  }

  showSubPlayListFiles(dir){
    this.navCtrl.push(SubplaylistPage, {dir : dir});
  }

  //create musicloader main dir
  createDir(nameDirectory){
    this.file.createDir(this.file.dataDirectory+"/musicloader/", nameDirectory, true)
    .then(_ => {
      //console.log('Directory created');
      this.listDir(null);
      }
    )
    .catch(err => {
      console.log('Directory could not created');
    });
  }

  //move playlist musicloader main dir 
  movePlaylist(nameDirectory, copyDir, iPara){
    let direct=this.file.dataDirectory+"musicloader/"+copyDir;
    let path= "";
    if(this.platform.is('android')){
      direct = this.file.dataDirectory+"musicloader/";
      path= copyDir;
    }

    this.file.moveDir(direct,path,this.file.dataDirectory+"/musicloader/",nameDirectory)
    .then(_ => {
      //console.log('Directory created');
      var index = -1;
      var filteredObj = this.diretories.find(function(item, i){
        if(item.playlist === copyDir){
          index = i;
          return i;
        }
      });
      this.diretories[index].playlist=nameDirectory;
      }
    )
    .catch(err => {
      console.log('Directory could not created'+JSON.stringify(err));
    });
  }

  removePaylistRecurs(directory,iPara){
    this.file.removeRecursively(this.file.dataDirectory+"/musicloader/"+directory, "")
    .then(_ => {
      this.diretories.splice(iPara, 1);  
      console.log('Directory deleted recurs');
      }
    )
    .catch(err => {
      console.log(JSON.stringify(err));
      console.log('Directory could not deleted recurs');
    });
  }

//rename playlist
rename(directory,iPara){

  let prompt = this.alertCtrl.create({
    title: 'Rename Playlist',
    message: "Enter a new name for your playlist",
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
        //  console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          //console.log('Saved clicked');
          this.movePlaylist(data.title, directory,iPara)
        }
      }
    ]
  });
  prompt.present();

}

  more(directory, iPara){

    let actionSheet = this.actionSheetCtrl.create({
      title: 'More Actions',
      buttons: [
        {
          text: 'Open Playlist',
          icon:'open',
          handler: () => {
            this.showSubPlayListFiles(directory);
          }
        },{
          text: 'Rename Playlist',
          icon:'md-create',
          handler: () => {
            this.rename(directory,iPara);
          }
        },{
          text: 'Delete Playlist',
          icon:'md-trash',
          handler: () => {
            this.removePaylistRecurs(directory,iPara);
            
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


buyMoreSongs(){

  let profileModal = this.modalCtrl.create(PaySongs);
  profileModal.onDidDismiss(data => {
    this.amountSongs = parseInt(data.amountSongs);
    this.admobService.addAdmob();
  });
  profileModal.present();
  
}

}
