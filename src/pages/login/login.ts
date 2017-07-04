import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import {RegisterPage} from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	private login: FormGroup;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public toastCtrl: ToastController) {

  	this.login = this.formBuilder.group({
  		
  		id:['', Validators.required],  		
  		pass:['', Validators.required]
  	});

  }

  	 goToRegisterPage() {
    
    	this.navCtrl.push(RegisterPage);
  	}

  	sendInfo(){
  		let toast = this.toastCtrl.create( { message: 'Send data to server', duration: 3000 } );
    	toast.present();

  	}
}
