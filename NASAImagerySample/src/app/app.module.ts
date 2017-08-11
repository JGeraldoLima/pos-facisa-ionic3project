import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {AgmCoreModule} from '@agm/core';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NasaServiceProvider} from '../providers/nasa-service/nasa-service';
import {Geolocation} from '@ionic-native/geolocation';
import {ToastServiceProvider} from '../providers/toast-service/toast-service';
import {Toast} from '@ionic-native/toast';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2mMe9v9tPpz-RTpAY8pnHsZpNcm60j-I' //TODO: extract to a config file that will not be commited for safety
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NasaServiceProvider,
    Geolocation,
    Toast,
    ToastServiceProvider,
    LoadingServiceProvider
  ]
})
export class AppModule {
}
