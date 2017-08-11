import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';

@Injectable()
export class LoadingServiceProvider {

  constructor(private loadingCtrl: LoadingController) {
  }

  buildLoading(message: string, closeable: boolean, duration?: number) {
    return this.loadingCtrl.create({
      content: message,
      enableBackdropDismiss: closeable,
      duration: duration
    });
  }

}
