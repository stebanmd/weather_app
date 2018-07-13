import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home';
import { WeatherProvider } from '../../providers/weather/weather';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  state: string;
  locationId: number;
  errorMsg: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private weatherProv: WeatherProvider,
    private storage: Storage) {
    
  }

  ionViewDidLoad() {
    this.storage.get('location').then(val => {
      if (val) {
        let location = JSON.parse(val);
        this.city = location.city;
        this.state = location.state;
        this.locationId = location.id;
      } else {
        this.city = 'Porto Alegre';
        this.state = 'RS';
      }      
    });
  }

  saveForm() {

    this.weatherProv.getLocaleId(this.city, this.state).subscribe((res: Array<any>) => {      
      if (res.length == 0) {
        this.errorMsg = '404 - City not found';
      }
      else {
        this.errorMsg = undefined;
        let location = {
          city: this.city,
          state: this.state,
          id: res[0].id
        };
        this.storage.set('location', JSON.stringify(location));
        this.navCtrl.push(HomePage)
      }
    });    
  }

}
