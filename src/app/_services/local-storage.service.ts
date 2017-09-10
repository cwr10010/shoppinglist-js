import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Logger } from '../_helpers/logging';

@Injectable()
export class LocalStorageService {

    localStorageAvailable: boolean = false;

    constructor(
        private log: Logger,
        private cookieService: CookieService) {
        if (localStorage) {
            this.localStorageAvailable = true;
        }
    }

    store(key: string, value: any): void {
        if (typeof value !== 'undefined' && value != null) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            if (this.localStorageAvailable) {
                localStorage.setItem(key, value);
            }
            else {
                this.cookieService.set(key, value, 30, '/', '', true);
            }
        }
        else {
            if (this.localStorageAvailable) {
                localStorage.removeItem(key);
            } else {
                this.cookieService.delete(key, '/');
            }
        }
    }

    read(key: string): any {
        var data;
        if (this.localStorageAvailable) {
            data = localStorage.getItem(key);
        }
        else {
            data = this.cookieService.get(key);
            try {
                data = JSON.parse(data);
            } catch (e) {
                data = data;
            }
        }
        return data;
    }

    remove(key: string): void {
        if (this.localStorageAvailable) {
            localStorage.removeItem(key);
        }
        else {
            this.cookieService.delete(key);
        }
    }
}
