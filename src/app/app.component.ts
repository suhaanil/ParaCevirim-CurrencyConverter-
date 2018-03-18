import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Menu} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AyarlarPage} from '../pages/ayarlar/ayarlar'
import { HomePage } from '../pages/home/home';
import {ServiceProvider} from '../providers/service/service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  updateInterval:number = 1000 * 60 * 5; // 5 minutes

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, protected currencyService : ServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.updateCurrencies();
    });
  }

  @ViewChild('content') nav:Nav;
  @ViewChild('menu') menu:Menu;

  updateCurrencies() {
    this.currencyService.updateCurrencies();
    setTimeout(() => { this.updateCurrencies() }, this.updateInterval);
}

openCurrencyPage() {
  this.nav.setRoot(HomePage);
  this.menu.close();
}

openSettingsPage() {
  this.nav.push(AyarlarPage);
  this.menu.close();
}

}

