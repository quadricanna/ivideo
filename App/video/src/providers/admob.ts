import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeRewardVideoConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Platform, Loading, LoadingController } from 'ionic-angular';

/*
  Generated class for the GlobalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdmobService {
  loading: Loading;

  constructor(private loadingCtrl: LoadingController, private platform: Platform, public http: Http, private admobFree: AdMobFree, ) {
    
  }


  addAdmob(){
    
        const bannerConfig: AdMobFreeBannerConfig = {
          // add your config here
          // for the sake of this example we will just use the test config
          id : "ca-app-pub-9233036998725527/8588052480",
          isTesting: false,
          autoShow: true
         };
    
         if(this.platform.is('android')){
            bannerConfig.id="ca-app-pub-9233036998725527/3214121080";
          }
         
    
          this.admobFree.banner.config(bannerConfig);
          this.admobFree.banner.prepare()
          .then(() => {
              this.admobFree.banner.show();
              // banner Ad is ready
              // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(e));
    
      }

      hideBanner(){
        this.admobFree.banner.hide();
      }

      addIntersAdmob(){
        
        const intersConfig: AdMobFreeBannerConfig = {
          // add your config here
          // for the sake of this example we will just use the test config
          id : "ca-app-pub-9233036998725527/1831072445",
          isTesting: false,
          autoShow: true
         };
    
         if(this.platform.is('android')){
          intersConfig.id="ca-app-pub-9233036998725527/1681547561";
          }
         
    
          this.admobFree.interstitial.config(intersConfig);
          this.admobFree.interstitial.prepare()
          .then(() => {
            if(this.admobFree.interstitial.isReady()){
              this.admobFree.banner.hide();
              this.admobFree.interstitial.show().then((data) => {
              })
              .catch(e => {
                console.log(e);
                //this.addAdmob();
              });
            }
              
          })
          .catch(e => console.log(e));
    
      }


      async addRewardAdmob(){
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
        this.loading.present();
        const rewardConfig: AdMobFreeRewardVideoConfig= {
          // add your config here
          // for the sake of this example we will just use the test config
          id : "ca-app-pub-9233036998725527/1122240409",
          isTesting: false,
          autoShow: true
         };
         
         if(this.platform.is('android')){
          rewardConfig.id="ca-app-pub-9233036998725527/4607093803";
          }
         
    
          this.admobFree.rewardVideo.config(rewardConfig);

          this.admobFree.rewardVideo.prepare()
          .then(() => {
            this.loading.dismissAll();
            if(this.admobFree.rewardVideo.isReady()){
              this.admobFree.rewardVideo.show().then((data) => {
              })
              .catch(e => {
                this.loading.dismissAll();
                console.log(e);
              });
            }
              
          })
          .catch(e => {
            this.loading.dismissAll();
            console.log(e);
          });
    
      }
}
