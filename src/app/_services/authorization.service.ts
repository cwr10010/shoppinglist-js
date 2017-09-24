import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { User } from '../_models/user';
import { LocalStorageService } from './local-storage.service';
import { Logger } from '../_helpers/logging';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthorizationService {
    private authUrl = environment.apiUrl + '/auth';
    private logoutUrl = environment.apiUrl + '/auth/logout';

    constructor(
        private http: Http,
        private storageService: LocalStorageService,
        private log: Logger) {}

    authorize(user: User): Promise<void> {
        this.log.debug(`Authorizing ${user}`.toString());
        return this.http.post(
            this.authUrl,
            JSON.stringify(user),
            {
                headers: this.createHeaders(),
                withCredentials: true
            })
            .toPromise()
            .then(response => response.json() as Token)
            .then((token: Token) => {
                this.storageService.store(AUTH_TOKEN_KEY, token.auth_token);
                this.storageService.store(ID_TOKEN_KEY, token.id_token);
            })
            .catch(response => this.handleError(response));
    }

    refresh(): Promise<any> {
        if (this.getAuthToken()) {
            this.log.debug('Refresh existing token');
            return this.http.get(
                this.authUrl,
                {
                    headers: this.createHeaders(),
                    withCredentials: true
                })
                .toPromise()
                .then(response => response.json() as Token)
                .then((token: Token) => {
                    this.storageService.store(AUTH_TOKEN_KEY, token.auth_token);
                    this.storageService.store(ID_TOKEN_KEY, token.id_token);
                })
                .catch(response => this.handleError(response));
        } else {
            this.log.debug('No authtoken exists, skip refreshing');
            return Promise.all([]);
        }
    }

    logout(): Promise<void> {
        const token = `Bearer ${this.getAuthToken()}`;
        const userId = this.readUserId();
        this.log.debug(`logout user ${userId}`);
        return this.http.get(
            this.logoutUrl,
            {
                headers: new Headers({ 'Authorization': token }),
                withCredentials: true
            })
            .toPromise()
            .then(() => {
                this.storageService.remove(AUTH_TOKEN_KEY);
                this.storageService.remove(ID_TOKEN_KEY);
            });
    }

    getAuthToken(): string {
        return this.storageService.read(AUTH_TOKEN_KEY);
    }

    readUserId(): string {
        const token = this.storageService.read(ID_TOKEN_KEY);
        this.log.debug('token: ' + token );
        if (token) {
            const parts = token.split('.');
            if (parts.length === 3) {
                this.log.debug('token parts: ' + parts );
                const tokenContent = atob(parts[1]);
                this.log.debug('token content: ' + tokenContent );
                return JSON.parse(tokenContent)['id'];
            }
        }
        return null;
    }

    private createHeaders(): Headers {
        return new Headers({ 'Content-Type': 'application/json' });
    }

    private handleError(error: Response): Promise<any> {
        switch (error.status) {
            case 403:
                this.log.debug('reset token', error);
                this.refresh();
                return Promise.all([]);
            default:
                this.log.warn('An error occurred', error);
                this.storageService.remove(AUTH_TOKEN_KEY);
                return Promise.reject(error);
        }
    }
}

class Token {
    auth_token: string;
    id_token: string;
    expires: Number;
}

export const AUTH_TOKEN_KEY = 'X-SLS-AUTHTOKEN';
export const ID_TOKEN_KEY = 'X-SLS-IDTOKEN';
