import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoggingService } from './logging.service';
import { LocalStorageService, TOKEN_KEY } from './local-storage.service';

@Injectable()
export class HttpClient {

    remoteHost: string = 'http://localhost:8080';

    constructor(
        private http: Http,
        localStorage: LocalStorageService) { }

    get(path: string, authorized: boolean): Observable<Response> {
        return this.http.get(
            this.remoteHost + path,
            {
                headers: this.createHeaders(authorized)
            });
    }

    post(path: string, body: string, authorized: boolean): Observable<Response> {
        return this.http.post(
            this.remoteHost + path,
            body,
            {
                headers : this.createHeaders(authorized)
            });
    }

    put(path: string, body: string, authorized: boolean): Observable<Response> {
        return this.http.put(
            this.remoteHost + path,
            body,
            {
                headers : this.createHeaders(authorized)
            });
    }

    delete(path: string, authorized: boolean): Observable<Response> {
        return this.http.delete(
            this.remoteHost + path,
            {
                headers : this.createHeaders(authorized)
            });
    }

    createHeaders(authorized: boolean): Headers {
        var headers = {};
        const authValue: string = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
        if (authorized) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': authValue
            };
        } else {
            headers = { 'Content-Type': 'application/json' };
        }
        return new Headers(headers);
    }
}

