import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage'
import { GetStorageInfoService} from '../services/get-storage-info/get-storage-info.service';

import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  @ViewChild('menu') menu: MenuController;
  public name: String; 
  private dataReq: string = "nombre";
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage,
                public getInfoService: GetStorageInfoService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //this.getInfoStorage();
   } 

   logOut(){
       this.nav.popToRoot();
       this.menu.close();
       this.menu.enable(false);
       this.storage.clear();
    }

    getInfoStorage(){

      this.name = this.getInfoService.getInfo(this.dataReq);
    }    

    

}

