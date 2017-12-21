import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { AuthorizationService } from '../_services/authorization.service';
import { environment } from '../../environments/environment';

import { HttpClientStub } from '../_mocks/http.mock';
import { AuthorizationServiceStub } from '../_mocks/authorization.mock';

import { HttpClient } from './http-client';

class HttpStub {
  get() {}
  post() {}
  put() {}
  delete() {}
}

fdescribe('Logger', () => {

  let httpClient: HttpClient;
  let http: Http;
  let authorizationService: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        { provide: Http, useClass: HttpStub },
        { provide: AuthorizationService, useClass: AuthorizationServiceStub }
      ]
    });
  });

  beforeEach(
    inject([HttpClient, Http, AuthorizationService], (_httpClient: HttpClient, _http: Http, _authService: AuthorizationService) => {
      httpClient = _httpClient;
      http = _http;
      authorizationService = _authService;
    })
  );

  describe('get()', () => {

    it('should make a GET request with proper headers', () => {
      spyOn(http, 'get').and.returnValue(Observable.of(
        new Response(
          new ResponseOptions({
            body: '{"auth_token": "auth_token", "id_token": "id_token"}',
            status: 200
          }))));
      spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

      httpClient.get('/path').then(() => {
        expect(http.get).toHaveBeenCalledWith(
          'http://localhost:8080/api/users/id/path',
          {
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer fake-token'
            })
          }
        );
      });

    });

    it('should make a POST request with proper headers', () => {
      spyOn(http, 'post').and.returnValue(Observable.of(
        new Response(
          new ResponseOptions({
            body: '{"auth_token": "auth_token", "id_token": "id_token"}',
            status: 200
          }))));
      spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

      httpClient.post('/path', '{ "body": "a body" }').then(() => {
        expect(http.post).toHaveBeenCalledWith(
          'http://localhost:8080/api/users/id/path',
          '{ "body": "a body" }',
          {
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer fake-token'
            })
          }
        );
      });

    });

    it('should make a PUT request with proper headers', () => {
      spyOn(http, 'put').and.returnValue(Observable.of(
        new Response(
          new ResponseOptions({
            body: '{"auth_token": "auth_token", "id_token": "id_token"}',
            status: 200
          }))));
      spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

      httpClient.put('/path', '{ "body": "a body" }').then(() => {
        expect(http.put).toHaveBeenCalledWith(
          'http://localhost:8080/api/users/id/path',
          '{ "body": "a body" }',
          {
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer fake-token'
            })
          }
        );
      });

    });

    it('should make a DELETE request with proper headers', () => {
      spyOn(http, 'delete').and.returnValue(Observable.of(
        new Response(
          new ResponseOptions({
            body: '{"auth_token": "auth_token", "id_token": "id_token"}',
            status: 200
          }))));
      spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

      httpClient.delete('/path').then(() => {
        expect(http.delete).toHaveBeenCalledWith(
          'http://localhost:8080/api/users/id/path',
          {
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer fake-token'
            })
          }
        );
      });

    });

  });

});
