import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, ToastController, MenuController, Loading, LoadingController} from 'ionic-angular';
import {GlobalVariablesService} from './global-variables';
import { LoginPage } from '../pages/login/login';

import { Device } from '@ionic-native/device';
import { HomePage } from '../pages/home/home';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

    http: any;
    nav: any;
    isLoggedin: any;
    globalVariablesService: any;
    loading:Loading;

    constructor(private loadingCtrl: LoadingController,private device: Device, public menu: MenuController,public toastCtrl: ToastController, public httpCtrl: Http, public navcontroller: NavController, public globalVariablesServ: GlobalVariablesService) {
        this.http = httpCtrl;
        this.nav = navcontroller;
        this.isLoggedin = false;
        this.globalVariablesService=globalVariablesServ;
    }
    
    login(user, pushUserId, pushToken, tabBarElement) {
        this.loading = this.loadingCtrl.create({
            content: 'Login ...',
        });
        this.loading.present();

        var headers = new Headers();
        var creds = "?username=" + user.name + "&pwd=" + user.password + "&uuid=" + this.device.uuid+ "&platform=" + this.device.platform+ "&model=" + this.device.model + "&platformversion=" + this.device.version + "&pushid=" +pushUserId + "&pushtoken=" +pushToken ;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        

        this.http.get(this.globalVariablesService.getHostname()+'/login/'+ creds, {headers: headers}).subscribe(data => {
            this.loading.dismissAll();
            if(data.json().status == 2){
                window.localStorage.setItem('utoken', data.json().message);
                this.globalVariablesService.setIsLoggedIn(true);
                tabBarElement.style.display = 'flex';                
                this.navcontroller.setRoot(HomePage);
            } else{
                var toast = this.toastCtrl.create({
                    message: data.json().message,
                    duration: 3000,
                    position: 'top'
                });

                toast.present();
            }                
        }, error => {
            this.loading.dismissAll();
            console.log(JSON.stringify(error));
        }); 
                
    }
    
   register(user, pushUserId, pushToken, tabBarElement) {
        this.loading = this.loadingCtrl.create({
            content: 'Login ...',
        });
        this.loading.present();
        return new Promise(resolve => {
            var creds = "username=" + user.name + "&password=" + user.password + "&uuid=" + this.device.uuid+ "&platform=" + this.device.platform+ "&model=" + this.device.model + "&platformversion=" + this.device.version + "&pushid=" +pushUserId + "&pushtoken=" +pushToken;

            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post(this.globalVariablesService.getHostname()+'/register', creds, {headers: headers}).subscribe(data => {
               
                this.loading.dismissAll();
                if(data.json().status == 2){
                    window.localStorage.setItem('utoken', data.json().message);
                    this.globalVariablesService.setIsLoggedIn(true);
                    tabBarElement.style.display = 'flex';                    
                    this.navcontroller.setRoot(HomePage);
                }else{
                    var toast = this.toastCtrl.create({
                        message: data.json().message,
                        duration: 3000,
                        position: 'bottom'
                    });

                    toast.present();
                }               
            }, error => {
                this.loading.dismissAll();
                console.log(JSON.stringify(error));
            });    
        });
        
    }
    
    logout(tabBarElement) {
        return new Promise(resolve => {
            this.globalVariablesService.setIsLoggedIn(false);
            var loadedApps =window.localStorage.getItem("loadedApps");

            window.localStorage.clear();
            
            window.localStorage.setItem("loadedApps", loadedApps);

            this.navcontroller.setRoot(LoginPage);      
            this.menu.swipeEnable(false);
        });
    }
}
