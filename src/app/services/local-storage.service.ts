import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { LoggingService } from './logging.service';

@Injectable()
export class LocalStorageService {

    localStorageAvailable: boolean = false;

    constructor(
        private log: LoggingService,
        private cookieService: CookieService) {
        if (localStorage) {
            this.localStorageAvailable = true;
        }
    }

    storeToken(token: string) {
        this.store(TOKEN_KEY, token);
    }

    readToken(): string {
        return this.read(TOKEN_KEY);
    }

    resetToken() {
        this.remove(TOKEN_KEY);
    }

    readUserId(): string {
        const token = this.readToken();
        this.log.debug("token: " + token );
        if (token) {
            const parts = token.split('.')
            if (parts.length === 3) {
                this.log.debug("token parts: " + parts );
                const tokenContent = atob(parts[1]);
                this.log.debug("token content: " + tokenContent );
                return JSON.parse(tokenContent)['id']
            }
        }
        return null;
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

export const TOKEN_KEY = "X-SLS-AUTHTOKEN";
