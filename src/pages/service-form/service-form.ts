import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Storage} from '@ionic/storage'

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
	private s_key: String;
	private u_id: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public storage: Storage,
  				public http: Http, public toastCtrl: ToastController) {

  	

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
    this.getStorageInfo();
  }

  getStorageInfo(){

  		this.storage.get("session_key").then((value) => {
  			
       
            this.s_key=value;
        
      })

  		this.storage.get("id").then((value) => {

        
            this.u_id=value;
       
      })

  }

  sendInfo(){  		


  		let link= '';

  		let dataObj= this.service.value;
  		dataObj['session_key'] = this.s_key;
  		dataObj['id'] = this.u_id;


  		let myData= JSON.stringify(dataObj);

  			console.log(myData);
  			console.log(dataObj);

  		let headers = new Headers({'Content-Type': 'application/json'});
  		let options = new RequestOptions({headers: headers});

  		this.http.post(link, myData, options)
 		.subscribe(data => {
 			let toast = this.toastCtrl.create( { message: 'El servicio se ha solicitado con éxito', duration: 1000 } );
    		toast.present();
		 	
		 	//console.log(data["_body"]);
       		
       
		 			 	
 		}, error => {
 			console.log(error["_body"]);
 		 	let toast = this.toastCtrl.create( { message: 'No ha sido posible solicitar el servicio, intente de nuevo', duration: 3000 } );
    		toast.present();
 		});


  }

}
