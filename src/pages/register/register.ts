import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
//import {Observable} from 'rxjs/Rx';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {


	private register: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public toastCtrl: ToastController, public http: Http) {

  	this.register = this.formBuilder.group({
  		nombre:['', Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(190),Validators.pattern('[^0-9]*')])],
  		apellido:['', Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(190), Validators.pattern('[^0-9]*')])],
  		email:['', Validators.compose([Validators.email,Validators.maxLength(190), Validators.required])],
  		identificacion:['', Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(190), Validators.minLength(6)])],
  		telefono:['', Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(190), Validators.pattern('[0-9]*')])],
  		user:['', Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(190)])],
  		pass:['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(190),Validators.maxLength(8)])],
  		tipo: ['solicitante']
  	});

  }

  sendInfo(){

  		let link= 'http://api.mandaya.tesilogic.com/api/registro';
  		let myData= JSON.stringify(this.register.value);
  		let headers = new Headers({'Content-Type': 'application/json'});
  		let options = new RequestOptions({headers: headers});

  		this.http.post(link, myData, options)
 		.subscribe(data => {
		 console.log(data["_body"]);
 		}, error => {
 			console.log(myData);
 		 console.log("Oooops!");
 		});

  		//this.navCtrl.pop(LoginPage);
  		let toast = this.toastCtrl.create( { message: 'Cuenta creada con éxito', duration: 3000 } );
    	//toast.present();

  }

}
