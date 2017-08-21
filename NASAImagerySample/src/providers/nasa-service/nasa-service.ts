import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NASA_API_KEY} from '../../../private_keys';

@Injectable()
export class NasaServiceProvider {

  constructor(public http: Http) {
  }

  getLocalImage(latitude: number, longitude: number, imageDim: number, date: string) {
    let nasaImageryUri = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&cloud_score=True&api_key=${NASA_API_KEY}`;
    return this.http.get(nasaImageryUri).map((result) => {
      return result.json();
    });
  }

}
