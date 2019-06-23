import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Platform, ToastController } from 'ionic-angular';
import { GlobalVariablesService } from './global-variables';

/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {
  

  constructor(private globalVariablesService: GlobalVariablesService, private platform: Platform, public http: Http, private admobFree: AdMobFree, private toastCtrl: ToastController ) {
    
  }


  sendSharing(notification){
    

      var headers = new Headers();
      headers.append('Content-Type', 'application/json' );
      headers.append('utoken', window.localStorage.getItem( 'utoken') );

      this.http.post(this.globalVariablesService.getHostname()+'/share/', notification, { headers: headers }).subscribe(data => {

          if(data.json().status == 2){
            var toast = this.toastCtrl.create({
                message: 'You have successful shared: ' + notification.videoTitle,
                duration: 3000,
                position: 'top'
            });
      
            toast.present(); 
          }
            
      }, error => {
          console.log(JSON.stringify(error));
        });
       
    
  }


}
