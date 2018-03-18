import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {ServiceProvider} from '../../providers/service/service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(protected http:Http, protected currencyService:ServiceProvider) {}

  public source = "EUR";
  public target;
  public input = null;
  public outputs = [];

  ionViewWillEnter() {
      Promise.all([
          this.currencyService.getSource() ,
          this.currencyService.getTarget()
      ]).then(values => {
          if (values[0]) {
              this.source = values[0];
          }
          this.target = values[1];
      });
  }


 Cevirim() {
      this.currencyService.getCurrencies()
          .then(currencyRates => {
              this.outputs = [];
              for (let currency of this.target) {
                  this.outputs.push({
                      name  : currency,
                      value : (this.input *  currencyRates[currency] / currencyRates[this.source])


                  });
                  console.log("input"+this.input);
                  console.log("girilenparanınorani"+ currencyRates[this.source]);
                  console.log("currencyrates"+currencyRates[currency]);


              }
          });
  }


}
