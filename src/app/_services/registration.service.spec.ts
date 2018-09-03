import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Headers, Http, ResponseOptions, Response } from '@angular/http';
import { Logger } from '../_helpers/logging';

import { RegistrationData } from '../_models/registration-data';
import { RegistrationService } from './registration.service';

import { HttpClientStub } from '../_mocks/http.mock';

describe('RegistrationService', () => {

  let registrationService: RegistrationService;
  let http: Http;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        RegistrationService,
        Logger,
        { provide: Http, useClass: HttpClientStub },
      ]
    });
  });

  beforeEach(
    inject([Http, RegistrationService], (_http: Http, _registrationService: RegistrationService) => {
      registrationService = _registrationService;
      http = _http;
    })
  );

  describe('register()', () => {

    it('should be successful', (done: DoneFn) => {
      const httpPostSpy = spyOn(http, 'post').and.returnValue(of());
      registrationService.register(new RegistrationData('a name', 'aPwd', 'aPwd', 'a@b.com')).then(() => {
        expect(httpPostSpy).toHaveBeenCalledWith(
          'http://localhost:8080/api/register',
          '{"username":"a name","password":"aPwd","password_repeated":"aPwd","email_address":"a@b.com"}',
          { headers: new Headers({ 'Content-Type': 'application/json' }),
          withCredentials: true }
        );
        done();
      });
    });

    it('should throw error if http call fails', (done: DoneFn) => {
      const httpPostSpy = spyOn(http, 'post').and.returnValue(ErrorObservable.create(new Response(
        new ResponseOptions({
          body: JSON.stringify('failed request'),
          status: 500
        }))));
      registrationService.register(new RegistrationData('a name', 'aPwd', 'aPwd', 'a@b.com')).catch((response) => {
        expect(httpPostSpy).toHaveBeenCalledWith('http://localhost:8080/api/register',
        '{"username":"a name","password":"aPwd","password_repeated":"aPwd","email_address":"a@b.com"}',
        { headers: new Headers({ 'Content-Type': 'application/json' }),
        withCredentials: true });
        expect(response.status).toBe(500);
        expect(response.text()).toBe('"failed request"');
        done();
      });
    });
  });

  describe('finish()', () => {

    it('should be successful', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(of(
        new Response(
          new ResponseOptions({
            body: '{"id":"id","username":"username","password":"aPwd"}',
            status: 200
          }))));
      registrationService.finish('aToken').then((user) => {
        expect(user.id).toBe('id');
        expect(user.username).toBe('username');
        expect(user.password).toBe('aPwd');
        expect(httpGetSpy).toHaveBeenCalledWith('http://localhost:8080/api/register?token=aToken');
        done();
      });
    });

    it('should throw error if http call fails', (done: DoneFn) => {
      spyOn(http, 'get').and.returnValue(ErrorObservable.create( new Response(
        new ResponseOptions({
          body: JSON.stringify('failed request'),
          status: 500
        }))));
      registrationService.finish('aToken').catch((response) => {
        expect(response.status).toBe(500);
        expect(response.text()).toBe('"failed request"');
        done();
      });
    });
  });

});
