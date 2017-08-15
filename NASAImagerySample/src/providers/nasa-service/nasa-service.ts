import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastServiceProvider} from '../toast-service/toast-service';

@Injectable()
export class NasaServiceProvider {

  private readonly API_KEY = 'jwDyBFCLtUEWFhFKYvv9LCtN3pshzq158roUT9xV';//TODO: extract to a config file that will not be commited for safety

  constructor(public http: Http, private toastService: ToastServiceProvider) {
  }

  getLocalImage(latitude: number, longitude: number, imageDim: number, date: string) {
    let nasaImageryUri = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&cloud_score=True&api_key=${this.API_KEY}`;
    return this.http.get(nasaImageryUri).map((result) => {
      return result.json();
    });
  }

}
