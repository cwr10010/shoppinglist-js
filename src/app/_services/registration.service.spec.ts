import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Headers, Http, ResponseOptions, Response } from '@angular/http';
import { Logger } from '../_helpers/logging';

import { RegistrationData } from '../_models/registration-data';
import { User } from '../_models/user';
import { RegistrationService } from './registration.service';
import { AuthorizationService } from './authorization.service';

import { AuthorizationServiceMock } from '../_mocks/authorization.mock';
import { HttpClientMock, createResponse } from '../_mocks/http.mock';

describe('RegistrationService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        RegistrationService,
        Logger,
        { provide: Http, useClass: HttpClientMock },
      ]
    });
  });

  describe('register()', () => {

    it('should be successful',
      inject([RegistrationService], (registrationService) => {
        spyOn(registrationService.http, 'post').and.returnValue(Observable.of());
        registrationService.register(new RegistrationData('a name', 'aPwd', 'aPwd', 'a@b.com'));
        expect(registrationService.http.post).toHaveBeenCalledWith(
          'http://localhost:8080/api/register',
          '{"username":"a name","password":"aPwd","password_repeated":"aPwd","email_address":"a@b.com"}',
          { headers: new Headers({ 'Content-Type': 'application/json' }),
          withCredentials: true }
        );
      })
    );

    it('should throw error if http call fails',
      inject([RegistrationService], (registrationService) => {
        spyOn(registrationService.http, 'post').and.returnValue(ErrorObservable.create(new Response(
          new ResponseOptions({
            body: JSON.stringify('failed request'),
            status: 500
          }))));
        registrationService.register(new RegistrationData('a name', 'aPwd', 'aPwd', 'a@b.com')).then((it) => {
          expect(it).toBeUndefined();
        }).catch((response) => {
          expect(registrationService.http.post).toHaveBeenCalledWith('http://localhost:8080/api/register',
          '{"username":"a name","password":"aPwd","password_repeated":"aPwd","email_address":"a@b.com"}',
          { headers: new Headers({ 'Content-Type': 'application/json' }),
          withCredentials: true });
          expect(response.status).toBe(500);
          expect(response.text()).toBe('"failed request"');
        });
      })
    );
  });

  describe('finish()', () => {

    it('should be successful',
      inject([RegistrationService], (registrationService) => {
        spyOn(registrationService.http, 'get').and.returnValue(Observable.of(
          new Response(
            new ResponseOptions({
              body: '{"id":"id","username":"username","password":"aPwd"}',
              status: 200
            }))));
        registrationService.finish('aToken').then((user) => {
          expect(user.id).toBe('id');
          expect(user.username).toBe('username');
          expect(user.password).toBe('aPwd');
        });
        expect(registrationService.http.get).toHaveBeenCalledWith(
          'http://localhost:8080/api/register?token=aToken');
      })
    );

    it('should throw error if http call fails',
      inject([RegistrationService], (registrationService) => {
        spyOn(registrationService.http, 'get').and.returnValue(ErrorObservable.create( new Response(
          new ResponseOptions({
            body: JSON.stringify('failed request'),
            status: 500
          }))));
        registrationService.finish('aToken').then((it) => {
          expect(it).toBeUndefined();
        }).catch((response) => {
          expect(response.status).toBe(500);
          expect(response.text()).toBe('"failed request"');
        });
      })
    );
  });

});
