import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Platform} from 'ionic-angular';
import {Facebook} from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {

  private currentUser: firebase.User;

  constructor(public platform: Platform, private afAuth: AngularFireAuth, private fb: Facebook) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  signInWithFacebook(): firebase.Promise<any> {
    // HOW TO GET REALLY USER DATA AND THEN SAVE?
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.afAuth.auth.signInWithCredential(facebookCredential);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }


    // return this.afAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(fbAccessToken));
  }

  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
