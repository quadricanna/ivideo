import { Component } from '@angular/core';
import {  NavController, ToastController, Platform, ActionSheetController,ModalController, NavParams } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';
import { MusicControls } from '@ionic-native/music-controls';

import { GlobalVariablesService } from '../../providers/global-variables';
import { AdmobService } from '../../providers/admob';

import { File } from '@ionic-native/file';
import { SubplaylistPage } from '../subplaylist/subplaylist';

import { Http, Headers} from '@angular/http';
import { DownloadService } from '../../providers/download';

@Component({
  selector: 'settings-playlist',
  templateUrl: 'settings-playlist.html'
})
export class SettingsPlaylistPage {

  musicMap:any = [];
  lastBackup:any ="";
  email="";
  oldPW="";
  newPW="";

  constructor(private params: NavParams,private downloadService: DownloadService, public httpCtrl: Http, public toastCtrl: ToastController, private actionSheetCtrl : ActionSheetController,private file:File, private admobService: AdmobService, private musicControls: MusicControls, private platform: Platform, private nativeAudio: NativeAudio, public navCtrl: NavController, public globalVariablesService:GlobalVariablesService) {

  }

  ionViewDidLoad(){
    this.lastBackup = window.localStorage.getItem('lastBackup');
    if(window.localStorage.getItem('email') && window.localStorage.getItem('email').includes("@")){
      this.email = window.localStorage.getItem('email');
    }
    this.loadFiles();
  }

  closeModal() {
    if(this.email &&  window.localStorage.getItem('email') != this.email && this.email.includes("@")){
      this.updateMail();
    }else if(this.email && window.localStorage.getItem('email') != this.email && !this.email.includes("@")){
      var toast = this.toastCtrl.create({
          message: 'No valid Mail',
          duration: 3000,
          position: 'top'
      });

      toast.present();
    }
    this.navCtrl.pop();
  }
  loadFiles(){
    this.file.checkDir(this.file.dataDirectory, 'musicloader')
    .then(_ => {
        //console.log('Directory exists');
        this.listDirBackup();

      }
    
    )
    .catch(err => {
      //console.log('Directory doesnt exist');

      this.file.createDir(this.file.dataDirectory, 'musicloader', true)
      .then(_ => {
        //console.log('Directory created');
        this.listDirBackup();
        }
      )
      .catch(err => {
        console.log('Directory could not created1');
        console.log(JSON.stringify(err));
      });

    });

  }

  //list directories
  listDirBackup(){
    this.musicMap = [];
    this.file.listDir(this.file.dataDirectory, 'musicloader')
    .then(dirs => {

        //Get Sub Elements (mp3 in list)
        let counterSubdirs = 0;
        dirs.forEach(element => { 

            let direct=this.file.dataDirectory+element.fullPath;
            let path= "";

            if(this.platform.is('android')){
              direct = this.file.dataDirectory+"musicloader/";
              path= element.name;
            }
            this.file.listDir(direct, path)
            .then(subdirs => {
              subdirs.forEach(subelement => {  
                counterSubdirs += 1;

                if(subelement.isFile && subelement.fullPath.indexOf(".mp4") != -1){
                  let postParams = {
                    playlist: element.name,
                    song: subelement.name
                  }
                  this.musicMap.push(postParams);
                  
                  
                }
              });

            })
            .catch(err => console.log(JSON.stringify(err)));
          }); 
          

    })
    .catch(err => console.log('Directory doesnt exist2'));

  }

  /*
  
  Restore

  */

  restore(){
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('utoken', window.localStorage.getItem( 'utoken') );


    this.httpCtrl.get(this.globalVariablesService.getHostname()+'/restore/', {headers: headers}).subscribe(data => {
        if(data.json().status == 2){
          //remove all folders
          this.file.removeRecursively(this.file.dataDirectory+'musicloader', "")
            .then(_ => {

                //add musicloader
                this.file.createDir(this.file.dataDirectory, 'musicloader', true)
                .then(_ => {
                  window.localStorage.setItem('lastBackup', new Date().toString());

                  var toastMessage ="";
                  
                  if(data.json().status == 2){
                    //get single playlist name
                    var items = JSON.parse(data.json().message);

                    var uniqueNames = [];

                    for(var i = 0; i < items.length; i++){    
                        if(uniqueNames.indexOf(items[i].playlist) === -1){
                            uniqueNames.push(items[i].playlist);        
                        }        
                    }

                    //create new playlists
                    for (var playlist, i = 0; playlist = uniqueNames[i++];) {
                    this.createDir(playlist);
                    }

                    //add file to playlist/download file
                    for (var item, i = 0; item = items[i++];) {
                      let needsPayment =false;
                      this.downloadService.serverMp3DownloadWithPara(item.song, item.playlist, item.title, item.thumb, 0, needsPayment);
                    }

                    toastMessage = "Your playlists will now be downloaded";
                  }else{
                    toastMessage = data.json().message
                  }
                  
                  var toast = this.toastCtrl.create({
                      message: toastMessage,
                      duration: 3000,
                      position: 'top'
                  });
            
                  toast.present();
                   

                  }
                )
                .catch(err => {
                  console.log('Directory could not created1');
                  console.log(JSON.stringify(err));
                });
               
              }
            )
            .catch(err => {
              console.log(JSON.stringify(err));
              console.log('Directory could not deleted recurs');
            });
        }  
        
        
    }, error => {
        console.log(JSON.stringify(error));
      }); 
  }






  /*

    Back UP

  */

  backUp(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('utoken', window.localStorage.getItem( 'utoken') );
    this.httpCtrl.post(this.globalVariablesService.getHostname()+'/backup/', this.musicMap, { headers: headers }).subscribe(data => {

        if(data.json().status == 2){
          window.localStorage.setItem('lastBackup', new Date().toString());
          this.lastBackup =  window.localStorage.getItem('lastBackup');
        }

        var toast = this.toastCtrl.create({
          message: data.json().message,
          duration: 3000,
          position: 'bottom'
      });

      toast.present();         
    }, error => {
        console.log(JSON.stringify(error));
      });    
  }


  updateMail(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('utoken', window.localStorage.getItem( 'utoken') );

    this.httpCtrl.get(this.globalVariablesService.getHostname()+'/updateMail/?email='+this.email, { headers: headers }).subscribe(data => {
        if(data.json().status == 2){
          window.localStorage.setItem('email', this.email); 
        }
    }, error => {
        console.log(JSON.stringify(error));
      });    
  }

  changePW(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('utoken', window.localStorage.getItem( 'utoken') );

    this.httpCtrl.get(this.globalVariablesService.getHostname()+'changePW/?oldPW='+this.oldPW+'&newPW='+this.newPW+'&username='+window.localStorage.getItem('username'), { headers: headers }).subscribe(data => {

        if(data.json().status == 2){
          var toast = this.toastCtrl.create({
              message: 'Password changed',
              duration: 3000,
              position: 'bottom'
          });
          this.oldPW= "";
          this.newPW="";

          toast.present();  
        }else{
          var toast = this.toastCtrl.create({
              message: 'Error, please check your passwords again',
              duration: 3000,
              position: 'bottom'
          });

          toast.present();  
        }

     
    }, error => {
        console.log(JSON.stringify(error));
      });    
  }

 

  //create musicloader main dir
  createDir(nameDirectory){
    this.file.createDir(this.file.dataDirectory+"/musicloader/", nameDirectory, true)
    .then(_ => {
      this.listDirBackup();

      //console.log('Directory created');
      }
    )
    .catch(err => {
      console.log('Directory could not created');
    });
  }

}
