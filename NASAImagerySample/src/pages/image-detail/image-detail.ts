import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-image-detail',
  templateUrl: 'image-detail.html',
})
export class ImageDetailPage {

  imageData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imageData = navParams.get('data');
  }

  saveToFavorites() {

  }

  share() {

  }

}
