# NASA Imagery Sample
![](NASAImagerySample/src/assets/icon.png)

This repo is only for study purposes. It was used as FACISA Post-degree Ionic Module Final Project App.
As REST API, I used [NASA Imagery API](https://api.nasa.gov/api.html#imagery) for satellite images search, based on location + date.


# Required features

- Must use Firebase Auth and Database
- Must access data from a Web Service
- Must have pages
- Must use native components
- Must have support for Android


# Configuration Setup

For security purposes, I stored all services (Maps, Firebase, NASA) keys on a .ts file called private_keys.ts 
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

Firebase Database config:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
      "saved_searchs": {
      ".indexOn": ["userID"]
    }
  }
}
```

# Credits (soon)

# License

You may use this software under the MIT License


