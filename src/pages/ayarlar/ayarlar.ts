import {ServiceProvider} from '../../providers/service/service'
import { Component } from '@angular/core';

@Component({
    templateUrl : 'ayarlar.html'
})
export class AyarlarPage {

    currencies = [];
    source:any;
    target:any;

    constructor(protected currencyService:ServiceProvider) {}

    ionViewWillEnter() {
        Promise.all([
            this.currencyService.getCurrencies() ,
            this.currencyService.getSource(),
            this.currencyService.getTarget()
        ]).then(values => {
            this.currencies = [];
            for (let currency in values[0]) {
                this.currencies.push(currency);
            }

            this.source = values[1];
            this.target = values[2];
        });
    }

    ionViewCanLeave() {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.currencyService.setSource(this.source),
                this.currencyService.setTarget(this.target)
            ]).then(() => {
                resolve();
            });
        });
    }

}
