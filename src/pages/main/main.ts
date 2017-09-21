import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Rx';

import { ServiceFormPage } from '../service-form/service-form';

declare var google; //this is to prevent any warnings from TypeScript about the google object that the Google Maps SDK makes available to us

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

	@ViewChild('map') mapElement: ElementRef;
	map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.loadMap();
    this.menuCtrl.enable(true);
  }

  loadMap(){
  	 this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       let marker = new google.maps.Marker({
    	map: this.map,
    	animation: google.maps.Animation.DROP,
    	position: this.map.getCenter()
 	 });

       let timer= Observable.timer(10000,10000);
       timer.subscribe(t=>

       		{
       			let newCenter= new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
       			marker.positon= newCenter;
       			//console.log("new center"+ newCenter);
       		}
       	);
 
    }, (err) => {
      console.log(err);
    });
  }


  openMenu(){
  	this.menuCtrl.open();

  }

  newService(){
  	this.navCtrl.push(ServiceFormPage);
  }

}
