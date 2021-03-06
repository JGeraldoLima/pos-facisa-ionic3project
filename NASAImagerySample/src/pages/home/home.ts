import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {ToastServiceProvider} from '../../providers/toast-service/toast-service';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {NasaServiceProvider} from '../../providers/nasa-service/nasa-service';
import {ImageDetailPage} from '../image-detail/image-detail';
import {Network} from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  datePickerModel = '';

  map = {
    latitude: 0.0,
    longitude: 0.0,
    zoom: 15
  };

  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              private network: Network,
              private toastService: ToastServiceProvider,
              private loadingService: LoadingServiceProvider,
              private nasaService: NasaServiceProvider) {
  }

  ngOnInit(): void {
    this.setCurrentDate();
    this.getCurrentPosition();
  }

  setCurrentDate() {
    const today = new Date();
    this.datePickerModel = today.toISOString();
  }

  getCurrentPosition() {
    let progressLoader = this.loadingService.buildLoading('Calculating your position...', true);
    progressLoader.present();
    this.geolocation.getCurrentPosition({enableHighAccuracy: true})
      .then((result) => {
        this.map.latitude = result.coords.latitude;
        this.map.longitude = result.coords.longitude;
        this.map.zoom = 15;
        this.toastService.showToast('Position found!', 3000);
        progressLoader.dismiss();
      })
      .catch((error) => {
        this.toastService.showToast('Something went wrong! ' + error.message, 3000);
        progressLoader.dismiss();
      });
  }

  onMapClicked(event: MouseEvent) {
    const coords = (event as any).coords;
    this.map.latitude = coords.lat;
    this.map.longitude = coords.lng;
  }

  getSatteliteImage() {
    let nasaLoader = this.loadingService.buildLoading('Searching for some image...', true);
    nasaLoader.present();

    let currentDate = new Date(this.datePickerModel);
    const yyyy = currentDate.getFullYear();
    const mm = currentDate.getMonth() + 1;
    const dd = currentDate.getDate();
    let formatedDate = yyyy + '-' + mm + '-' + dd;
    this.nasaService.getLocalImage(this.map.latitude, this.map.longitude, 0.025, formatedDate).subscribe((result => {
      if (result.url) {
        this.navCtrl.push(ImageDetailPage, {
          'data':
            {
              url: result.url,
              lat: this.map.latitude,
              long: this.map.longitude,
              date: formatedDate
            }
        });
      } else {
        this.toastService.showToast('There is no image for the given date.', 3000);
      }
      nasaLoader.dismiss();
    }));
  }
}
