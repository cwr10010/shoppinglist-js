import { TestBed, async, inject } from '@angular/core/testing';
import { of } from 'rxjs';

import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { AuthorizationService } from '../_services/authorization.service';

import { AuthorizationServiceStub } from '../_mocks/authorization.mock';

import { HttpClient } from './http-client';

class HttpStub {
  get() { return of([]); }
  post() { return of([]); }
  put() { return of([]); }
  delete() { return of([]); }
}

describe('HttpClient', () => {

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

  it('should make a GET request with proper headers', (done: DoneFn) => {
    const httpGetSpy = spyOn(http, 'get').and.returnValue(of(
      new Response(
        new ResponseOptions({
          body: '{"auth_token": "auth_token", "id_token": "id_token"}',
          status: 200
        }))));
    spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

    httpClient.get('/path').then(() => {
      expect(httpGetSpy).toHaveBeenCalledWith(
        'http://localhost:8080/api/users/id/path',
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer fake-token'
          })
        }
      );
      done();
    });
  });

  it('should make a POST request with proper headers', (done: DoneFn) => {
    const httpPostSpy = spyOn(http, 'post').and.returnValue(of(
      new Response(
        new ResponseOptions({
          body: '{"auth_token": "auth_token", "id_token": "id_token"}',
          status: 200
        }))));
    spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

    httpClient.post('/path', '{ "body": "a body" }').then(() => {
      expect(httpPostSpy).toHaveBeenCalledWith(
        'http://localhost:8080/api/users/id/path',
        '{ "body": "a body" }',
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer fake-token'
          })
        }
      );
      done();
    });
  });

  it('should make a PUT request with proper headers', (done: DoneFn) => {
    const httpPutSpy = spyOn(http, 'put').and.returnValue(of(
      new Response(
        new ResponseOptions({
          body: '{"auth_token": "auth_token", "id_token": "id_token"}',
          status: 200
        }))));
    spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

    httpClient.put('/path', '{ "body": "a body" }').then(() => {
      expect(httpPutSpy).toHaveBeenCalledWith(
        'http://localhost:8080/api/users/id/path',
        '{ "body": "a body" }',
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer fake-token'
          })
        }
      );
      done();
    });
  });

  it('should make a DELETE request with proper headers', (done: DoneFn) => {
    const httpDeleteSpy = spyOn(http, 'delete').and.returnValue(of(
      new Response(
        new ResponseOptions({
          body: '{"auth_token": "auth_token", "id_token": "id_token"}',
          status: 200
        }))));
    spyOn(authorizationService, 'refresh').and.returnValue(Promise.all([]));

    httpClient.delete('/path').then(() => {
      expect(httpDeleteSpy).toHaveBeenCalledWith(
        'http://localhost:8080/api/users/id/path',
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer fake-token'
          })
        }
      );
      done();
      });
  });

});
