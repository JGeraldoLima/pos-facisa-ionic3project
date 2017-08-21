import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ToastController} from 'ionic-angular';

@Injectable()
export class ToastServiceProvider {

  constructor(public toastCtrl: ToastController) {
  }

  showToast(msg, delay?: number, showClose?: boolean) {
    this.toastCtrl.create({
      message: msg,
      duration: delay,
      position: 'bottom',
      showCloseButton: showClose
    }).present();
  }

}
