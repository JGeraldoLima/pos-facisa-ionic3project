import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ImageDetailPage} from '../image-detail/image-detail';

@Component({
  selector: 'page-saved-searchs',
  templateUrl: 'saved-searchs.html',
})
export class SavedSearchsPage {

  searchs: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {
    this.searchs = db.list('/saved_searchs');
    console.log(this.searchs);
  }

  openSearchDetails(event, search) {
    this.navCtrl.push(ImageDetailPage, {
      'data': search
    });
  }

}
