import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  location: {
    city: string,
    state: string,
    id: number
  };

  constructor(public navCtrl: NavController,
    private weatherProv: WeatherProvider,
    private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('location').then(val => {
      if (val) {
        this.location = JSON.parse(val);
      } else {
        // default value
        this.location = {
          city: 'Porto Alegre',
          state: 'RS',
          id: 5346
        }
      }

      this.loadWeather();
    });
  }

  private loadWeather() {
    this.weatherProv.getCurrentWeather(this.location.id)
      .subscribe(w => {
        this.weather = w;
      });
  }
}
