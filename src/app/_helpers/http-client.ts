import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Logger } from './logging';
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
        var headers = {};
        var authValue = '';
        return this.authorizationService.refresh().then(() => {
            authValue = `Bearer ${this.authorizationService.getAuthToken()}`;
            headers = {
                'Content-Type': 'application/json',
                'Authorization': authValue
            };
            return new Headers(headers);
        });
    }
}

