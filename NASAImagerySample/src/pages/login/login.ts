import {Component} from '@angular/core';
import {AuthProvider} from '../../providers/auth/auth';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {ToastServiceProvider} from '../../providers/toast-service/toast-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private auth: AuthProvider, public navCtrl: NavController, private toastService: ToastServiceProvider) {
  }

  signInWithFacebook() {
    // TODO: CREATE A LOADING AND DISMISS IT ON THEN AND CATCH CLAUSES
    this.auth.signInWithFacebook().then(res => {
        if (res && res.user) {
          this.toastService.showToast('Logged in: ' + res.user.displayName, 3000);
        }
        this.navCtrl.setRoot(HomePage);
      }
    ).catch((error) => {
      this.toastService.showToast('Login error: ' + error, null, true);
    });
  }

  signInWithGoogle() {
    // TODO: CREATE A LOADING AND DISMISS IT ON THEN AND CATCH CLAUSES
    this.auth.signInWithGoogle().then((res) => {
        if (res && res.user) {
          this.toastService.showToast('Logged in: ' + res.user.displayName, 3000);
        }
        this.navCtrl.setRoot(HomePage);
      }
    ).catch((error) => {
      this.toastService.showToast('Login error: ' + error, null, true);
    });
  }

  //signIn with: smartphone and google (maybe email-pass)
}
