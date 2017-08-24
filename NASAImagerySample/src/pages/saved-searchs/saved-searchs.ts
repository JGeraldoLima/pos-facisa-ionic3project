import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ImageDetailPage} from '../image-detail/image-detail';
import {AuthProvider} from '../../providers/auth/auth';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {ToastServiceProvider} from '../../providers/toast-service/toast-service';

@Component({
  selector: 'page-saved-searchs',
  templateUrl: 'saved-searchs.html',
})
export class SavedSearchsPage {

  searchs: FirebaseListObservable<any[]>;

  searchsSubscription: Subscription;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private db: AngularFireDatabase,
              private loadingService: LoadingServiceProvider, private toastService: ToastServiceProvider) {

    let progressLoader = this.loadingService.buildLoading('Loading saved searchs...', true);
    progressLoader.present();

    this.searchs = db.list('/saved_searchs', {
      query: {
        orderByChild: 'userID',
        equalTo: auth.user.uid
      }
    });

    this.searchsSubscription = this.searchs.subscribe(data => {
      progressLoader.dismiss();
    });
  }

  ionViewWillLeave() {
    this.searchsSubscription.unsubscribe();
  }

  deleteSearch(search: any) {
    let removingProgressLoader = this.loadingService.buildLoading('Removing search...', true);
    removingProgressLoader.present();

    this.searchs.remove(search)
      .then(res => {
        removingProgressLoader.dismiss();
        this.toastService.showToast('Search removed!', 3000);
      }).catch(error => {
      removingProgressLoader.dismiss();
      this.toastService.showToast('Error trying to remove the search: ' + error.message, 3000);
    });
  }

  openSearchDetails(event, search) {
    this.navCtrl.push(ImageDetailPage, {
      'data': search
    });
  }

}
