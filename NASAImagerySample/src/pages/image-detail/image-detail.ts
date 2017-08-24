import {Component} from '@angular/core';
import {FabContainer, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthProvider} from '../../providers/auth/auth';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {ToastServiceProvider} from '../../providers/toast-service/toast-service';
import {SocialSharing} from '@ionic-native/social-sharing';

@Component({
  selector: 'page-image-detail',
  templateUrl: 'image-detail.html',
})
export class ImageDetailPage {

  imageData: any = {};
  searchs: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
              private auth: AuthProvider, private loadingService: LoadingServiceProvider,
              private toastService: ToastServiceProvider, private socialSharing: SocialSharing) {
    this.imageData = navParams.get('data');
    this.searchs = db.list('/saved_searchs');
  }

  saveToFavorites(fab: FabContainer) {
    fab.close();
    if (this.imageData.userID) {
      let removingProgressLoader = this.loadingService.buildLoading('Removing search...', true);
      removingProgressLoader.present();

      this.searchs.remove(this.imageData)
        .then(res => {
          removingProgressLoader.dismiss();
          this.toastService.showToast('Search removed!', 3000);
        }).catch(error => {
        removingProgressLoader.dismiss();
        this.toastService.showToast('Error trying to remove the search: ' + error.message, 3000);
      });
    } else {
      let savingProgressLoader = this.loadingService.buildLoading('Saving search...', true);
      savingProgressLoader.present();

      this.imageData = {
        lat: this.imageData.lat,
        long: this.imageData.long,
        date: this.imageData.date,
        url: this.imageData.url,
        userID: this.auth.user.uid
      };
      this.searchs.push(this.imageData).then(res => {
        savingProgressLoader.dismiss();
        this.toastService.showToast('Search saved!', 3000);
      }).catch(error => {
        savingProgressLoader.dismiss();
        this.toastService.showToast('Error trying to save the search: ' + error.message, 3000);
      });
    }
  }

  share(fab: FabContainer) {
    fab.close();

    const message = `Check this image from NASA! Date: ${this.imageData.date} | Latitude: ${this.imageData.lat} | 
    Longitude: ${this.imageData.long}`;

    this.socialSharing.share(message, '', '', this.imageData.url)
      .then(() => {
        this.toastService.showToast('Image shared successfully! Thank you :)', 3000, false);
      }).catch((error) => {
      this.toastService.showToast('I\'m sorry, but something wrong happened: ' + error, 25000, true);
    });

  }

}
