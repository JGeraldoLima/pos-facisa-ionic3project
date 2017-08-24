This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

PS.: for security purposes, I stored all services (Maps, Firebase, NASA) keys on a .ts file called private_keys.ts 
and located on the app root. To be able to use this project for yourself, just configure your services, create your file 
with the keys and be happy :).
Its format match as follows:

```typescript
export const  firebase_config = {
  apiKey: "xxxx",
  authDomain: "xxxx",
  databaseURL: "xxxx",
  projectId: "xxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxx"
};

export const NASA_API_KEY = 'xxxx';

export const MAPS_KEY = 'xxx';

export const GOOGLE_PLUS_WEB_ID = 'xxxx';
```

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

