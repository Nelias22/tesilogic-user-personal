import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

/**
 * Generated class for the ServiceFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-form',
  templateUrl: 'service-form.html',
})
export class ServiceFormPage {

	private service: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

  	this.service = this.formBuilder.group({
  		tamaño:['', Validators.required],
  		peso:['', Validators.required],
  		ubicacion:['', Validators.compose([Validators.maxLength(255), Validators.required])],
  		referencia:['', Validators.compose([Validators.required,Validators.maxLength(255)])],
  		destino:['', Validators.compose([Validators.required,Validators.maxLength(255)])],
  		refdestino:['', Validators.compose([Validators.required,Validators.maxLength(255)])]
  		
  	});


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceFormPage');
  }

  sendInfo(){}

}
