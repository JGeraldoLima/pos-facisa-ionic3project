import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {AgmCoreModule} from '@agm/core';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NasaServiceProvider} from '../providers/nasa-service/nasa-service';
import {Geolocation} from '@ionic-native/geolocation';
import {ToastServiceProvider} from '../providers/toast-service/toast-service';
import {Toast} from '@ionic-native/toast';
import {LoadingServiceProvider} from '../providers/loading-service/loading-service';
import {HttpModule} from '@angular/http';
import {ImageDetailPage} from '../pages/image-detail/image-detail';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {SavedSearchsPage} from '../pages/saved-searchs/saved-searchs';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthProvider} from '../providers/auth/auth';
import {LoginPage} from '../pages/login/login';
import {firebase_config, MAPS_KEY} from '../../private_keys';
import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';
import {SocialSharing} from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SavedSearchsPage,
    ImageDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: MAPS_KEY
    }),
    AngularFireModule.initializeApp(firebase_config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    SavedSearchsPage,
    ImageDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NasaServiceProvider,
    Geolocation,
    Toast,
    ToastServiceProvider,
    LoadingServiceProvider,
    AuthProvider,
    Facebook,
    GooglePlus,
    SocialSharing
  ]
})
export class AppModule {
}
