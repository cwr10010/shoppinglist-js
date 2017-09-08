import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoggingService } from './logging.service';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class HttpClient {

    remoteHost: string = 'http://localhost:8080/api';

    constructor(
        private http: Http,
        private authorizationService: AuthorizationService) { }

    get(path: string): Observable<Response> {
        return this.http.get(
            this.createPath(path),
            {
                headers: this.createHeaders()
            });
    }

    post(path: string, body: string): Observable<Response> {
        return this.http.post(
            this.createPath(path),
            body,
            {
                headers : this.createHeaders()
            });
    }

    put(path: string, body: string): Observable<Response> {
        return this.http.put(
            this.createPath(path),
            body,
            {
                headers : this.createHeaders()
            });
    }

    delete(path: string): Observable<Response> {
        return this.http.delete(
            this.createPath(path),
            {
                headers : this.createHeaders()
            });
    }

    createPath(path: string): string {
        return `${this.remoteHost}/users/${this.authorizationService.readUserId()}/${path}`;
    }

    createHeaders(): Headers {
        var headers = {};
        const authValue: string = `Bearer ${this.authorizationService.getAuthToken()}`;
        headers = {
            'Content-Type': 'application/json',
            'Authorization': authValue
        };
        return new Headers(headers);
    }
}

