import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthorizationService } from '../_services/authorization.service';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpClient {

    remoteHost: string = environment.apiUrl;

    constructor(
        private http: Http,
        private authorizationService: AuthorizationService) { }

    get(path: string): Promise<Response> {
        return this.createHeaders().then(headers =>
             this.http.get(
                this.createPath(path),
                {
                    headers: headers
                }).toPromise());
    }

    post(path: string, body: string): Promise<Response> {
        return this.createHeaders().then(headers =>
            this.http.post(
            this.createPath(path),
            body,
            {
                headers : headers
            }).toPromise());
    }

    put(path: string, body: string): Promise<Response> {
        return this.createHeaders().then(headers =>
        this.http.put(
            this.createPath(path),
            body,
            {
                headers : headers
            }).toPromise());
    }

    delete(path: string): Promise<Response> {
        return this.createHeaders().then(headers =>
            this.http.delete(
                this.createPath(path),
                {
                    headers : headers
                }).toPromise()
        );
    }

    createPath(path: string): string {
        return `${this.remoteHost}/users/${this.authorizationService.readUserId()}${path}`;
    }

    createHeaders(): Promise<Headers> {
        return this.authorizationService.refresh().then(() => {
            const authValue = `Bearer ${this.authorizationService.getAuthToken()}`;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': authValue
            };
            return new Headers(headers);
        });
    }
}
