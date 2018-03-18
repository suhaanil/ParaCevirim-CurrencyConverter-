
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ServiceProvider {

  constructor(private storage: Storage, private http:Http) {}

  setSource(currency:string) {
      return this.storage.set('source', currency);
  }

  setTarget(currencies:string[]) {
      return this.storage.set('target',currencies);
  }

  getSource() : Promise<string> {
      return this.storage.get('source');
  }

  getTarget() : Promise<string[]> {
      return this.storage.get('target');
  }

  getCurrencies() : Promise<any> {
      return this.storage.get('currencies');
  }

  updateCurrencies() {
      this.http.get('http://api.fixer.io/latest')
          .subscribe((resp) => {
              let currencies = resp.json().rates;
              currencies['EUR'] = 1;
              this.storage.set('currencies', currencies);

              console.log(resp.json().rates);

          });


  }

}
