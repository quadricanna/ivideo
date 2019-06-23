import { Component } from '@angular/core';
import { ViewController, Platform, Loading, LoadingController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import {GlobalVariablesService} from '../../providers/global-variables';
import 'rxjs/add/operator/timeout';
import { Market } from '@ionic-native/market';

@Component({
  selector: 'page-myapps',
  templateUrl: 'myapps.html'
})
export class MyApps {
  public apps: any = [];

  loading: Loading;

  constructor(private market: Market, public loadingCtrl: LoadingController, private platform:Platform, public viewCtrl:ViewController,public globalVariablesService: GlobalVariablesService, private http: Http) {


  }

  ionViewDidLoad(){
    this.getItems();
  }

  getItems() {

    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    });
    this.loading.present();
    this.apps = [];

    var creds ="info.html";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get(this.globalVariablesService.allAppHostname + creds, {headers: headers}).subscribe(data => {
      this.loading.dismissAll();
      this.apps = data.json();


    }, error => {
      this.loading.dismissAll();
      this.viewCtrl.dismiss();
        console.log(JSON.stringify(error));
      }); 
  
  }

  openApp(app) {
    let appId = app.keyIos;

    if(this.platform.is('android')){
      appId = app.keyAndroid;
    }

    this.market.open(appId);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
