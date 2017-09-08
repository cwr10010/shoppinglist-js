import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './local-storage.service';
import { LoggingService } from './logging.service';

@Injectable()
export class AuthorizationService {
    private authUrl = "http://localhost:8080/api/auth";
    private logoutUrl = "http://localhost:8080/api/auth/logout";

    constructor(
        private http: Http,
        private storageService: LocalStorageService,
        private log: LoggingService) {}

    authorize(name: string, password: string): void {
        this.http.post(
            this.authUrl,
            JSON.stringify({
                    username: name,
                    password: password}),
            {
                headers: this.createHeaders(),
                withCredentials: true
            })
            .toPromise()
            .then(response => response.json() as Token)
            .then((token: Token) => {
                this.storageService.store(AUTH_TOKEN_KEY, token.auth_token)
                this.storageService.store(ID_TOKEN_KEY, token.id_token)
            })
            .catch(response => this.handleError(response));
    }

    refresh() {
        if (this.getAuthToken()) {
            this.http.get(
                this.authUrl,
                {
                    headers: this.createHeaders(),
                    withCredentials: true
                })
                .toPromise()
                .then(response => response.json() as Token)
                .then((token: Token) => {
                    this.storageService.store(AUTH_TOKEN_KEY, token.auth_token)
                    this.storageService.store(ID_TOKEN_KEY, token.id_token)
                })
                .catch(response => this.handleError(response));
        }
    }

    logout() {
        var token = `Bearer ${this.getAuthToken()}`
        var userId = this.readUserId()
        this.log.info(`logout user ${userId}`)
        this.http.get(
            this.logoutUrl,
            {
                headers: new Headers({ 'Authorization': token }),
                withCredentials: true
            })
            .toPromise()
            .then(() => {
                this.storageService.remove(AUTH_TOKEN_KEY);
                this.storageService.remove(ID_TOKEN_KEY);
            })
    }

    getAuthToken(): string {
        return this.storageService.read(AUTH_TOKEN_KEY);
    }

    readUserId(): string {
        var token = this.storageService.read(ID_TOKEN_KEY);
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

    createHeaders(): Headers {
        return new Headers({ 'Content-Type': 'application/json' });
    }

    private handleError(error: Response): Promise<any> {
        switch (error.status) {
            case 403:
                this.log.debug('reset token', error);
                this.refresh()
                return Promise.all([])
            default:
                this.log.warn('An error occurred', error);
                this.storageService.remove(AUTH_TOKEN_KEY);
                return Promise.reject(error);
        }
    }
}

class Token {
    auth_token: string
    id_token: string
    expires: Number
}

export const AUTH_TOKEN_KEY = "X-SLS-AUTHTOKEN";
export const ID_TOKEN_KEY = "X-SLS-IDTOKEN";
