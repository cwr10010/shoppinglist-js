import { Injectable } from '@angular/core'

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './local-storage.service';
import { LoggingService } from './logging.service';
import { HttpClient } from './http-client.module';

@Injectable()
export class AuthorizationService {
    private authUrl = "/auth";

    constructor(
        private http: HttpClient,
        private storageService: LocalStorageService,
        private log: LoggingService) {}

    authorize(name: string, password: string): void {
        this.http.post(
            this.authUrl,
            JSON.stringify({
                    username: name,
                    password: password}),
            false)
            .toPromise()
            .then(response => response.json() as Token)
            .then((token: Token) => this.storageService.storeToken(token.token))
            .catch(response => this.handleError(response));
    }

    refresh() {
        const currentToken = this.storageService.readToken()
        if (currentToken) {
            this.http.get(
                this.authUrl,
                true)
                .toPromise()
                .then(response => response.json() as Token)
                .then((token: Token) => this.storageService.storeToken(token.token))
                .catch(response => this.handleError(response));
        }
    }

    logout() {
        this.storageService.resetToken();
    }

    getAuthToken(): string {
        return this.storageService.readToken();
    }

    private handleError(error: Response): Promise<any> {
        switch (error.status) {
            case 400:
            case 401:
            case 403:
                this.log.debug('reset token', error);
                this.storageService.resetToken();
                return Promise.all([])
            default:
                this.log.warn('An error occurred', error);
                this.storageService.resetToken();
                return Promise.reject(error);
        }
    }
}

class Token {
    token: string
}
