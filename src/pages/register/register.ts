import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	private register: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public toastCtrl: ToastController) {

  	this.register = this.formBuilder.group({
  		name:['', Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern('[^0-9]*')])],
  		lastname:['', Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern('[^0-9]*')])],
  		email:['', Validators.compose([Validators.email, Validators.required])],
  		id:['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(6)])],
  		phone:['', Validators.compose([Validators.required,Validators.minLength(6), Validators.pattern('[0-9]*')])],
  		pass:['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])],
  	});

  }

  sendInfo(){

  		this.navCtrl.pop(LoginPage);
  		let toast = this.toastCtrl.create( { message: 'Cuenta creada con éxito', duration: 3000 } );
    	toast.present();

  }

}
