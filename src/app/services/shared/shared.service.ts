import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    public static instance: SharedService = null;
    payLoad: any;
    token: string;
    showTamplate: boolean;
    tokenTime: any;
    tokenExpire: any;

    constructor() {
        return SharedService.instance = SharedService.instance || this;
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new SharedService();
        }
        return this.instance;
    }

    isLoggedIn(): boolean {
        if (this.payLoad == null && localStorage.getItem('access_token') !== null) {
            return false;
        }
        return true;
    }

    simplePermicion(permicion: string): boolean {
        return this.payLoad && this.payLoad.authorities.includes(permicion);
    }

    doublePermicion(permicion1: string, permicion2: string): boolean {
        return this.payLoad
                && this.payLoad.authorities.includes(permicion1)
                && this.payLoad.authorities.includes(permicion2);
    }

    // time() {
    //     const source = timer(1000, 59876);
    //     const func = source.subscribe(val => {
    //         const momentTime = (moment(new Date()).toDate());
    //         const a = moment(this.tokenTime).diff(momentTime);
    //         // tslint:disable-next-line:max-line-length
    //         this.tokenExpire = `${moment(this.tokenTime).diff(momentTime, 'hours')}:${new Date(a).getMinutes()}:${new Date(a).getSeconds()}`;
    //     });
    // }
}
