import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform, Loading, ToastController, AlertController, ModalController} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import {PaySongs} from "../pages/paySongs/paySongs"
import { GlobalVariablesService } from './global-variables';

/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DownloadService {
  loading: Loading;
  fileTransfer: FileTransferObject;
  
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private toastController:ToastController,private platform: Platform, private globalVariablesService: GlobalVariablesService, private transfer: FileTransfer, private file: File, public http: Http) {

  }

  serverMp3DownloadWithPara(videoId, pathSmartphone, title, thumb, retries, needsPayment){
    this.platform.ready().then(() => {
      this.fileTransfer = this.transfer.create();
    });
    //mp3 download
    this.http.get(this.globalVariablesService.getMP3Api() + "mp4/?youtubeId=" + videoId +"&format=mp4" ).subscribe(data => {
      try {
        if(needsPayment == null){
          needsPayment = false;
        }
        this.checkStatus(videoId, pathSmartphone, title, thumb,retries, needsPayment);
      }
      catch (error) {
        console.log(JSON.stringify(error));
      }
      
    }, error => {
      console.log(JSON.stringify(error));

    }); 
    

  }

  needToPay() {
    let alert = this.alertCtrl.create({
      title: 'Actually you have not enough credits',
      message: 'Do you want to load more music?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes of course',
          handler: () => {
            //open payment modal
            let profileModal = this.modalCtrl.create(PaySongs);
            profileModal.present();
          }
        }
      ]
    });
    alert.present();
  }

  serverMp3Download(pathSmartphone, retries){
    if(parseInt(window.localStorage.getItem('amountSongs')) > 0){

      this.platform.ready().then(() => {
        this.fileTransfer = this.transfer.create();
      });

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('utoken', window.localStorage.getItem( 'utoken') );

      //mp3 download
      this.http.get(this.globalVariablesService.getMP3Api() + "mp4/?youtubeId=" + this.globalVariablesService.getVideo() +"&format=mp4" , {headers:headers} ).subscribe(data => {
        try {
          let videoState = data.json();
        
          if(videoState.status == 3 ){
            this.needToPay();
          }else{
            let needsPayment :boolean = true;
            this.checkStatus(this.globalVariablesService.getVideo(), pathSmartphone, this.globalVariablesService.getTitle(), this.globalVariablesService.getThumb(),retries, needsPayment);
          }        }
        catch (error) {
          console.log(JSON.stringify(error));
        }
        
      }, error => {

          console.log(JSON.stringify(error));
        }); 
    }else{
      this.needToPay();
    }   
  }

  serverMp3DownloadWithParaPay(videoId, pathSmartphone, title, thumb, retries, needsPayment){
    if(parseInt(window.localStorage.getItem('amountSongs')) > 0){
      this.platform.ready().then(() => {
        this.fileTransfer = this.transfer.create();
      });

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('utoken', window.localStorage.getItem( 'utoken') );

      //mp3 download
      this.http.get(this.globalVariablesService.getMP3Api() + "mp4/?youtubeId=" + videoId +"&format=mp3", {headers:headers} ).subscribe(data => {
        try {
          let videoState = data.json();
          if(videoState.status == 3 ){
            this.needToPay();
          }else{
            let needsPayment :boolean = true;
            this.checkStatus(videoId, pathSmartphone, title, thumb,retries, needsPayment);
          }

        }
        catch (error) {
          console.log(JSON.stringify(error));
        }
        
      }, error => {
  
          console.log(JSON.stringify(error));
        }); 
    }else{
      this.needToPay();
    }
    
  }



  checkStatus(videoId, pathSmartphone, title, thumb,retries, needsPayment){

    this.http.get(this.globalVariablesService.getMP3Api() + "checkStatus/?youtubeId=" + videoId +"&format=mp4" ).subscribe(data => {
      try {
        let videoState = data.json();
        
        if(videoState.status == "progressing" ){
          //console.log('Downloading...' +videoId);
          var temp =this;
          setTimeout(function () {
            temp.checkStatus(videoId, pathSmartphone, title, thumb, retries, needsPayment);
          },1000)
        } else if(videoState.status == "finished"){
            let downloadUrl = "/"+videoState.format+"/"+videoState.title+"."+videoState.format;
            this.download(videoId, downloadUrl, pathSmartphone, title, videoState, thumb, retries, needsPayment);
        }else {
          console.log("Error, please try again or contact the developer");
        }
      }
      catch (error) {
        console.log(JSON.stringify(error));
      }

    }, error => {
        console.log(JSON.stringify(error));
    }); 
  }

  //download mp3 to smartphone
  download(videoId,downloadURL, pathSmartphone, title, videoState, thumb, retries, needsPayment){
    try{
      this.fileTransfer.download(encodeURI(this.globalVariablesService.getMP3Api() + "download/?filename=" +downloadURL), this.file.dataDirectory + 'musicloader/'+pathSmartphone+"/"+downloadURL.replace("/mp4/",""),true,{}).then((entry) => {
        this.downloadThumb("/"+videoState.title+".jpg", pathSmartphone, thumb, title, needsPayment);
        
      }, (error) => {
        // handle error
        if(error.code == 3 && retries < 10){
          retries = retries+1;
          this.serverMp3DownloadWithPara(videoId, pathSmartphone, title, thumb, retries, needsPayment);
        }

        console.log(JSON.stringify(error));
      });
    }catch (error) {
      console.log(JSON.stringify(error));
    }

  }


  downloadThumb(pathExtension, pathSmartphone, thumbDownloadURL, title, needsPayment){
    try{
      this.fileTransfer.download(encodeURI(thumbDownloadURL), this.file.dataDirectory + 'musicloader/'+pathSmartphone+"/"+pathExtension).then((entry) => {

        var toast = this.toastController.create({
          message: 'Download finished: ' + title,
          duration: 3000,
          position: 'top'
      });

      this.checkPayment(needsPayment);

      toast.present();  
      }, (error) => {

        this.checkPayment(needsPayment);
        // handle error
        console.log(JSON.stringify(error));
      });
    }catch (error) {
      console.log(JSON.stringify(error));
    }

  }

  checkPayment(needsPayment){
    if(needsPayment){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('utoken', window.localStorage.getItem( 'utoken'));

      this.http.get(this.globalVariablesService.getHostname() + "hasDownloaded", {headers: headers}).subscribe(data => {
                window.localStorage.setItem('amountSongs', data.json().amountSongs);
          }, error => {
          console.log(JSON.stringify(error));
      });
    }
  }

}
