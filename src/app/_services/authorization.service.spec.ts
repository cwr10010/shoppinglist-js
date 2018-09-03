
import { TestBed, inject } from '@angular/core/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { of } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { AuthorizationService } from './authorization.service';

import { Logger } from '../_helpers/logging';
import { LocalStorageService } from './local-storage.service';

import { HttpClientStub } from '../_mocks/http.mock';
import { User } from '../_models/user';

class LocalStorageServiceStub {
  read() {}
  store() {}
  remove() {}
}

describe('AuthorizationService', () => {

  let authorizationService: AuthorizationService;
  let http: Http;
  let storageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationService,
        Logger,
        { provide: LocalStorageService, useClass: LocalStorageServiceStub },
        { provide: Http, useClass: HttpClientStub },
      ]
    });
  });

  beforeEach(
    inject([Http, AuthorizationService, LocalStorageService],
      (_http: Http, _authService: AuthorizationService, _localStorageService: LocalStorageService) => {
      authorizationService = _authService;
      http = _http;
      storageService = _localStorageService;
    })
  );

  describe('authorize()', () => {

    it('should retrieve auth and id token and store them in the local storage', (done: DoneFn) => {
      spyOn(http, 'post').and.returnValue(of(
        new Response(
          new ResponseOptions({
            body: '{"auth_token": "auth_token", "id_token": "id_token"}',
            status: 200
          }))));
      const storeSpy = spyOn(storageService, 'store');
      authorizationService.authorize(new User('foo', 'bar')).then(() => {
        expect(storeSpy).toHaveBeenCalledTimes(2);
        expect(storeSpy).toHaveBeenCalledWith('X-SLS-AUTHTOKEN', 'auth_token');
        expect(storeSpy).toHaveBeenCalledWith('X-SLS-IDTOKEN', 'id_token');
        done();
      });
    });

    it('should fail if http call fails', (done: DoneFn) => {
        spyOn(http, 'post').and.returnValue(ErrorObservable.create( new Response(
          new ResponseOptions({
            body: JSON.stringify('failed request'),
            status: 500
          }))));
        const storeSpy = spyOn(storageService, 'store');
        authorizationService.authorize(new User('foo', 'bar')).catch(() => {
          expect(storeSpy).toHaveBeenCalledTimes(0);
          done();
        });
    });
  });

  describe('refresh()', () => {

    it('should refresh auth and id token if user is already authorized', (done: DoneFn) => {
        spyOn(http, 'get').and.returnValue(of(
          new Response(
            new ResponseOptions({
              body: '{"auth_token": "auth_token", "id_token": "id_token"}',
              status: 200
            }))));
        const storeSpy = spyOn(storageService, 'store');
        spyOn(storageService, 'read').and.returnValue('token');
        authorizationService.refresh().then(() => {
          expect(storeSpy).toHaveBeenCalledTimes(2);
          expect(storeSpy).toHaveBeenCalledWith('X-SLS-AUTHTOKEN', 'auth_token');
          expect(storeSpy).toHaveBeenCalledWith('X-SLS-IDTOKEN', 'id_token');
          done();
        });
    });

    it('should not refresh auth and id token if user is not authorized', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get');
      const storeSpy = spyOn(storageService, 'store');
      spyOn(storageService, 'read').and.returnValue(undefined);
      authorizationService.refresh().then((it) => {
        expect(httpGetSpy).toHaveBeenCalledTimes(0);
        expect(storeSpy).toHaveBeenCalledTimes(0);
        expect(it).toBeUndefined();
        done();
      });
    });

    it('should fail if http call fails', (done: DoneFn) => {
      spyOn(http, 'get').and.returnValue(ErrorObservable.create( new Response(
        new ResponseOptions({
          body: JSON.stringify('failed request'),
          status: 500
        }))));
      const storeSpy = spyOn(storageService, 'store');
      const removeSpy = spyOn(storageService, 'remove');
      spyOn(storageService, 'read').and.returnValue('token');
      authorizationService.refresh().catch(() => {
        expect(storeSpy).toHaveBeenCalledTimes(0);
        expect(removeSpy).toHaveBeenCalledTimes(2);
        expect(removeSpy).toHaveBeenCalledWith('X-SLS-AUTHTOKEN');
        expect(removeSpy).toHaveBeenCalledWith('X-SLS-IDTOKEN');
        done();
      });
    });
  });

  describe('logout()', () => {

    it('should successfully logout a user locally and to the backend', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(of(
        new Response(
          new ResponseOptions({
            status: 200
          }))));
      const removeSpy = spyOn(storageService, 'remove');
      authorizationService.logout().then(() => {
        expect(httpGetSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledTimes(2);
        expect(removeSpy).toHaveBeenCalledWith('X-SLS-AUTHTOKEN');
        expect(removeSpy).toHaveBeenCalledWith('X-SLS-IDTOKEN');
        done();
      });
    });

    it('should successfully also logout a user locally when request fails', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(ErrorObservable.create( new Response(
        new ResponseOptions({
          body: JSON.stringify('failed request'),
          status: 500
        }))));
      const removeSpy = spyOn(storageService, 'remove');
      authorizationService.logout().then(() => {
        expect(httpGetSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledTimes(2);
        expect(removeSpy).toHaveBeenCalledWith('X-SLS-AUTHTOKEN');
        expect(removeSpy).toHaveBeenCalledWith('X-SLS-IDTOKEN');
        done();
      });
    });

  });

  describe('getAuthToken()', () => {

    it('should provide the auth token from the storage service', () => {
      spyOn(storageService, 'read').and.returnValue('token');
      expect(authorizationService.getAuthToken()).toBe('token');
    });

  });

  describe('readUserId()', () => {
    const ID_TOKEN = 'eyJzdWIiOiJJZFRv.eyJzdWIiOiJJZFRva2VuIiwiaWQiOiI0ZDAxODdlNS05ODRkL' +
                  'TRhYjctYTBhNi0zZjdhMjJjMzkyMmUiLCJleHAiOjE1MTM0NTk0MTEsImlhdCI6MTUxMzQ' +
                  '1ODQxMX0.eyJzdWIiOiJJZFRv';
    it('should extract and return id token stored in the storage service', () => {
      spyOn(storageService, 'read').and.returnValue(ID_TOKEN);
      expect(authorizationService.readUserId()).toBe('4d0187e5-984d-4ab7-a0a6-3f7a22c3922e');
    });

    it('should return null if there is no id token', () => {
      spyOn(storageService, 'read').and.returnValue(undefined);
      expect(authorizationService.readUserId()).toBe(null);
    });

    it('should return null if the token has no three parts', () => {
      spyOn(storageService, 'read').and.returnValue('AbsD');
      expect(authorizationService.readUserId()).toBe(null);
    });

    it('should return null if the token content is not parsable as json', () => {
      spyOn(storageService, 'read').and.returnValue('A.bs.D');
      expect(authorizationService.readUserId()).toBe(null);
    });

  });

});
