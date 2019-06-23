import { Component } from '@angular/core';
import { NavController,MenuController, Platform, Loading, LoadingController, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GlobalVariablesService } from '../../providers/global-variables';
import { OneSignal } from '@ionic-native/onesignal';
import { Password } from '../password/password';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthService]
})
export class LoginPage {
  myservice:any;
  nav:any;
  usercreds:any;
  mode:any;
  tabBarElement: any;
  loading:Loading;
  agbs = false;

  constructor(private modalCtrl: ModalController, public loadingCtrl: LoadingController, private oneSignal: OneSignal,public platform: Platform, public menu: MenuController, public authserviceCtrl: AuthService, public navcontroller: NavController, public globalVariablesServ: GlobalVariablesService) {
       
        this.myservice = authserviceCtrl;
        this.nav = navcontroller;
        this.usercreds = {
            name: '',
            password: ''
        }
        globalVariablesServ.setIsLoggedIn(false);
        this.mode = 1;

        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        
        this.tabBarElement.style.display = 'none';
        
  }
      
   login(usercreds) {
        this.loading = this.loadingCtrl.create({
            content: 'Login...',
        });
        this.loading.present();

        if(this.platform.is('android')){
         //   this.oneSignal.startInit("YOUR ID", "YOUR ID");
        }else{
         //   this.oneSignal.startInit("YOUR ID", "");
        }
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when the notification is received.
        });
        this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when the notification is opened.
        });
        this.oneSignal.endInit();
        
        this.oneSignal.getIds().then(pushData => {
        // this gives you back the new userId and pushToken associated with the device. Helpful.
            this.loading.dismissAll();       
            this.myservice.login(usercreds, pushData.userId, pushData.pushToken, this.tabBarElement);
        });
        
    }
    register(usercreds){
        if(this.agbs == true){

            this.loading = this.loadingCtrl.create({
                content: 'Register...',
            });
            this.loading.present();

            if(this.platform.is('android')){
              //   this.oneSignal.startInit("YOUR ID", "YOUR ID");
            }else{
              //   this.oneSignal.startInit("YOUR ID", "");
            }

            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.setSubscription(true);
            this.oneSignal.handleNotificationReceived().subscribe(() => {
            // do something when the notification is received.
            });
            this.oneSignal.handleNotificationOpened().subscribe(() => {
            // do something when the notification is opened.
            });
            this.oneSignal.endInit();
            
            //pushData.userId
            //pushData.pushToken
            this.oneSignal.getIds().then(pushData => {      
                this.loading.dismissAll();            
                this.myservice.register(usercreds, pushData.userId, pushData.pushToken, this.tabBarElement);
            });
        }else{
            alert('Please check our Conditions');
        }
    }

    checkAGBS(){
        this.agbs = !this.agbs;
    }

    passwordReset(){
        let passwordModal = this.modalCtrl.create(Password);
        passwordModal.present();
    }

}

