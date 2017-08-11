import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Toast} from '@ionic-native/toast';

@Injectable()
export class ToastServiceProvider {

  constructor(public toast: Toast) {}

  showToast(msg, delay) {
    this.toast.showWithOptions({
      message: msg,
      duration: delay,
      position: 'bottom'
    }).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
