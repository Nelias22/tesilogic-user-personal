import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import {RegisterPage} from '../register/register';
import {MainPage} from '../main/main';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	private login: FormGroup;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, 
              public toastCtrl: ToastController, public http: Http, public menuCtrl: MenuController,
              public storage: Storage) {

  	

    this.login = this.formBuilder.group({
  		
  		user:['', Validators.required],  		
  		pass:['', Validators.required]
  	});

  }

      ionViewWillEnter(){
        this.menuCtrl.enable(false);
        this.isLoggedIn();
      }

  	 goToRegisterPage() {
    
    	this.navCtrl.push(RegisterPage);
  	}

    isLoggedIn(){

      this.storage.get("session_key").then((value) => {

         if (value != null) {
            this.navCtrl.push(MainPage);
        }
      })
    }

  	sendInfo(){

  		let link= 'http://api.mandaya.tesilogic.com/api/login';
  		let myData= JSON.stringify(this.login.value);
  		let headers = new Headers({'Content-Type': 'application/json'});
  		let options = new RequestOptions({headers: headers});

  		this.http.post(link, myData, options)
 		.subscribe(data => {
 			let toast = this.toastCtrl.create( { message: 'Inicio de sesión exitoso', duration: 1000 } );
    		toast.present();
		 	//console.log(data["_body"]);
       let response = JSON.parse(data["_body"]);
       
       for (const prop in response) {
         this.storage.set(prop,response[prop]);
       }
		 	this.navCtrl.push(MainPage);		 	
 		}, error => {
 			console.log(error["_body"]);
 		 	let toast = this.toastCtrl.create( { message: 'Error en inicio de sesión, verificar datos', duration: 3000 } );
    		toast.present();
 		});

  		

  	}
}
