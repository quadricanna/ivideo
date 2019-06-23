import { Component } from '@angular/core';
import { ViewController, Platform, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import {GlobalVariablesService} from '../../providers/global-variables';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class Password {

  username:String = "";
  loading: Loading;

  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, private platform:Platform, private params: NavParams, public viewCtrl:ViewController,public globalVariablesService: GlobalVariablesService, private http: Http) {

  }


  sendPW(){
    if(this.username){
      var creds ="sendPW?username="+ this.username;
      this.loading = this.loadingCtrl.create({
        content: 'Sending Mail & Push...',
      });
      this.loading.present();
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('utoken', window.localStorage.getItem( 'utoken'));
  
      this.http.get(this.globalVariablesService.getHostname() + creds, {headers: headers}).timeout(15000).subscribe(data => {
        let dataMessage = data.json();
        this.loading.dismissAll();
        var toast = this.toastCtrl.create({
          message: 'If possible, we have sent you an email or a push message with your new password, otherwise contact our support. Please change it in your account!',
          duration: 3000,
          position: 'top'
        });
        this.dismiss();
        toast.present();
  
      }, error => {
        this.loading.dismissAll();
          console.log(JSON.stringify(error));
      }); 
    
    }else{
      var toast = this.toastCtrl.create({
          message: 'Please add your username and email address',
          duration: 3000,
          position: 'top'
      });

      toast.present();
    }
    
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
