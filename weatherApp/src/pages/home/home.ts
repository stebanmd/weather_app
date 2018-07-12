import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  location: {
    city: string,
    state: string
  };

  constructor(public navCtrl: NavController, private weatherProv: WeatherProvider) {

  }

  ionViewWillEnter() {
    this.location = {
      city: "Porto Alegre",
      state: "RS"
    }
    
    this.weatherProv.getLocaleId(this.location.city, this.location.state)
      .subscribe((res: Array<any>) => {
        
        if (res.length == 0) {
          alert('404 - City not found')
        }
        else {
          this.weatherProv.getCurrentWeather()
            .subscribe(w => {
              this.weather = w;
            })
        }
      });
  }
}
