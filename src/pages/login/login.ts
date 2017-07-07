import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import {RegisterPage} from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	private login: FormGroup;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public toastCtrl: ToastController, public http: Http) {

  	this.login = this.formBuilder.group({
  		
  		user:['', Validators.required],  		
  		pass:['', Validators.required]
  	});

  }

  	 goToRegisterPage() {
    
    	this.navCtrl.push(RegisterPage);
  	}

  	sendInfo(){

  		let link= 'http://api.mandaya.tesilogic.com/api/login';
  		let myData= JSON.stringify(this.login.value);
  		let headers = new Headers({'Content-Type': 'application/json'});
  		let options = new RequestOptions({headers: headers});

  		this.http.post(link, myData, options)
 		.subscribe(data => {
		 console.log(data["_body"]);
 		}, error => {
 			console.log(myData);
 		 console.log("Oooops!");
 		});

  		let toast = this.toastCtrl.create( { message: 'Send data to server', duration: 3000 } );
    	toast.present();

  	}
}
