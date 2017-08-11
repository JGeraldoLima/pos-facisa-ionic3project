import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NasaServiceProvider {

  static readonly API_KEY = 'jwDyBFCLtUEWFhFKYvv9LCtN3pshzq158roUT9xV';//TODO: extract to a config file that will not be commited for safety

  static readonly NASA_IMAGERY_URI = 'https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&cloud_score=True&dim=${image_dim}&api_key=';

  constructor(public http: Http) {
  }

  getLocalImage(latitude: number, longitude: number, imageDim: number, date: string) {
    return this.http.get(NasaServiceProvider.NASA_IMAGERY_URI + NasaServiceProvider.API_KEY).map((result) => {
      return result.json(); //returns date and url
    });
  }

}
