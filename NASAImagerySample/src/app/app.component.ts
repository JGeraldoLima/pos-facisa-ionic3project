import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {SavedSearchsPage} from '../pages/saved-searchs/saved-searchs';
import {LoginPage} from '../pages/login/login';
import {AuthProvider} from '../providers/auth/auth';
import {ToastServiceProvider} from '../providers/toast-service/toast-service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public auth: AuthProvider,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
              private toastService: ToastServiceProvider) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();

    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Favorite Images', component: SavedSearchsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.auth.signOut().then((res) => {
      this.toastService.showToast('Signed out!', 3000);
      this.nav.setRoot(LoginPage);
    }).catch((error) => {
      this.toastService.showToast('Logout error: ' + error.message, null, true);
    });
  }
}
