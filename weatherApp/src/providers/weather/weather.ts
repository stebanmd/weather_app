import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  private apiKey = '8820c149d0953ffebe77c26259f61ae6';
  private url: string;

  constructor(public http: HttpClient) {
    this.url = 'http://apiadvisor.climatempo.com.br/api/v1/';
  }

  getLocaleId(city, state) {
    return this.http.get(this.url + 'locale/city?name='+city+'&state='+state+'&token=' + this.apiKey)
  }

  getCurrentWeather(locationId) {
    return this.http.get(this.url + 'weather/locale/'+ locationId +'/current?token=' + this.apiKey)
  }
  

}
