import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {ToastServiceProvider} from '../../providers/toast-service/toast-service';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  map = {
    latitude: 0.0,
    longitude: 0.0,
    zoom: 16
  };

  private progressLoader;

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              private toastService: ToastServiceProvider,
              private loadingService: LoadingServiceProvider) {
    this.progressLoader = this.loadingService.buildLoading('Calculating your position...', true);
  }

  ngOnInit(): void {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    this.progressLoader.present();
    // running on chrome too (I guess I disallowed the browser to get my location)
    this.geolocation.getCurrentPosition({enableHighAccuracy: true})
      .then((result) => {
        this.map.latitude = result.coords.latitude;
        this.map.longitude = result.coords.longitude;
        this.toastService.showToast('Position found!', 3000);
        this.progressLoader.dismiss();
      })
      .catch((error) => {
        console.log(error);
        this.toastService.showToast('Something went wrong! ' + error, 3000);
        this.progressLoader.dismiss();
      });
  }

  onMapClicked(event: MouseEvent) {
    const coords = (event as any).coords;
    this.map.latitude = coords.lat;
    this.map.longitude = coords.lng;
  }
}
