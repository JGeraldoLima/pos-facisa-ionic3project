import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Platform} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook';
import {ToastServiceProvider} from '../toast-service/toast-service';
import {GooglePlus} from '@ionic-native/google-plus';
import {GOOGLE_PLUS_WEB_ID} from '../../../private_keys';

@Injectable()
export class AuthProvider {

  private currentUser: firebase.User;

  constructor(public platform: Platform, private afAuth: AngularFireAuth, private fb: Facebook,
              private googlePlus: GooglePlus, private toastService: ToastServiceProvider) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  signInWithFacebook(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      // 1 - gets user auth data
      return this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

        // 2 - gets user basic profile data
        this.fb.api('/' + res.authResponse.userID + '?fields = id,name,email', []).then((res) => {
          // TODO: save it to cuurentUser if possible {name: "...", id: "..."}
          this.toastService.showToast('Logged as: ' + res.name, 3000);

          // 3 - finally, sign in the user
          return this.afAuth.auth.signInWithCredential(facebookCredential);
        }).catch((error) => {
          this.toastService.showToast('Login error: ' + error.message, null, true);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  signInWithGoogle(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.googlePlus.login({
        'webClientId': GOOGLE_PLUS_WEB_ID
      }).then((res) => {
        this.toastService.showToast('Logged as: ' + res.displayName, 3000);
        return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
      }).catch((error) => {
        this.toastService.showToast('Login error: ' + error.message, null, true);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
