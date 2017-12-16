
import { TestBed, async, inject } from '@angular/core/testing';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { AuthorizationService } from './authorization.service';

import { Logger } from '../_helpers/logging';
import { HttpClient } from '../_helpers/http-client';
import { LocalStorageService } from './local-storage.service';

import { HttpClientStub, createResponse } from '../_mocks/http.mock';

class LocalStorageServiceStub {
  read() {}
  store() {}
  remove() {}
}

describe('AuthorizationService', () => {

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

  describe('authorize()', () => {

    it('should retrieve auth and id token and store them in the local storage',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'post').and.returnValue(Observable.of(
          new Response(
            new ResponseOptions({
              body: '{"auth_token": "auth_token", "id_token": "id_token"}',
              status: 200
            }))));
        spyOn(authorizationService.storageService, 'store');
        authorizationService.authorize().then(() => {
          expect(authorizationService.storageService.store).toHaveBeenCalledTimes(2);
          expect(authorizationService.storageService.store).toHaveBeenCalledWith('X-SLS-AUTHTOKEN', 'auth_token');
          expect(authorizationService.storageService.store).toHaveBeenCalledWith('X-SLS-IDTOKEN', 'id_token');
        }).catch(() => {
          throw new Error('failed');
        });
      })
    );

    it('should fail if http call fails',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'post').and.returnValue(ErrorObservable.create( new Response(
          new ResponseOptions({
            body: JSON.stringify('failed request'),
            status: 500
          }))));
        spyOn(authorizationService.storageService, 'store');
        authorizationService.authorize().then(() => {
          throw new Error('failed');
        }).catch(() => {
          expect(authorizationService.storageService.store).toHaveBeenCalledTimes(0);
        });
      })
    );
  });

  describe('refresh()', () => {

    it('should refresh auth and id token if user is already authorized',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'get').and.returnValue(Observable.of(
          new Response(
            new ResponseOptions({
              body: '{"auth_token": "auth_token", "id_token": "id_token"}',
              status: 200
            }))));
        spyOn(authorizationService.storageService, 'store');
        spyOn(authorizationService.storageService, 'read').and.returnValue('token');
        authorizationService.refresh().then(() => {
          expect(authorizationService.storageService.store).toHaveBeenCalledTimes(2);
          expect(authorizationService.storageService.store).toHaveBeenCalledWith('X-SLS-AUTHTOKEN', 'auth_token');
          expect(authorizationService.storageService.store).toHaveBeenCalledWith('X-SLS-IDTOKEN', 'id_token');
        }).catch(() => {
          throw new Error('failed');
        });
      })
    );

    it('should not refresh auth and id token if user is not authorized',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'get');
        spyOn(authorizationService.storageService, 'store');
        spyOn(authorizationService.storageService, 'read').and.returnValue(undefined);
        authorizationService.refresh().then((it) => {
          expect(authorizationService.http.get).toHaveBeenCalledTimes(0);
          expect(authorizationService.storageService.store).toHaveBeenCalledTimes(0);
          expect(it).toBeUndefined();
        }).catch(() => {
          throw new Error('failed');
        });
      })
    );

    it('should fail if http call fails',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'get').and.returnValue(ErrorObservable.create( new Response(
          new ResponseOptions({
            body: JSON.stringify('failed request'),
            status: 500
          }))));
        spyOn(authorizationService.storageService, 'store');
        spyOn(authorizationService.storageService, 'remove');
        spyOn(authorizationService.storageService, 'read').and.returnValue('token');
        authorizationService.refresh().then(() => {
          throw new Error('failed');
        }).catch(() => {
          expect(authorizationService.storageService.store).toHaveBeenCalledTimes(0);
          expect(authorizationService.storageService.remove).toHaveBeenCalledTimes(2);
          expect(authorizationService.storageService.remove).toHaveBeenCalledWith('X-SLS-AUTHTOKEN');
          expect(authorizationService.storageService.remove).toHaveBeenCalledWith('X-SLS-IDTOKEN');
        });
      })
    );

  });

  describe('logout()', () => {

    it('should successfully logout a user locally and to the backend',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'get').and.returnValue(Observable.of(
          new Response(
            new ResponseOptions({
              status: 200
            }))));
        spyOn(authorizationService.storageService, 'remove');
        authorizationService.logout().then(() => {
          expect(authorizationService.http.get).toHaveBeenCalledTimes(1);
          expect(authorizationService.storageService.remove).toHaveBeenCalledTimes(2);
          expect(authorizationService.storageService.remove).toHaveBeenCalledWith('X-SLS-AUTHTOKEN');
          expect(authorizationService.storageService.remove).toHaveBeenCalledWith('X-SLS-IDTOKEN');
        });
      })
    );

    it('should successfully also logout a user locally when request fails',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.http, 'get').and.returnValue(ErrorObservable.create( new Response(
          new ResponseOptions({
            body: JSON.stringify('failed request'),
            status: 500
          }))));
        spyOn(authorizationService.storageService, 'remove');
        authorizationService.logout().then(() => {
          expect(authorizationService.http.get).toHaveBeenCalledTimes(1);
          expect(authorizationService.storageService.remove).toHaveBeenCalledTimes(2);
          expect(authorizationService.storageService.remove).toHaveBeenCalledWith('X-SLS-AUTHTOKEN');
          expect(authorizationService.storageService.remove).toHaveBeenCalledWith('X-SLS-IDTOKEN');
        });
      })
    );

  });

  describe('getAuthToken()', () => {

    it('should provide the auth token from the storage service',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.storageService, 'read').and.returnValue('token');
        expect(authorizationService.getAuthToken()).toBe('token');
      })
    );

  });

  describe('readUserId()', () => {
    const ID_TOKEN = 'eyJzdWIiOiJJZFRv.eyJzdWIiOiJJZFRva2VuIiwiaWQiOiI0ZDAxODdlNS05ODRkL' +
                  'TRhYjctYTBhNi0zZjdhMjJjMzkyMmUiLCJleHAiOjE1MTM0NTk0MTEsImlhdCI6MTUxMzQ' +
                  '1ODQxMX0.eyJzdWIiOiJJZFRv';
    it('should extract and return id token stored in the storage service',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.storageService, 'read').and.returnValue(ID_TOKEN);
        expect(authorizationService.readUserId()).toBe('4d0187e5-984d-4ab7-a0a6-3f7a22c3922e');
      })
    );

    it('should return null if there is no id token',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.storageService, 'read').and.returnValue(undefined);
        expect(authorizationService.readUserId()).toBe(null);
      })
    );

    it('should return null if the token has no three parts',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.storageService, 'read').and.returnValue('AbsD');
        expect(authorizationService.readUserId()).toBe(null);
      })
    );

    it('should return null if the token content is not parsable as json',
      inject([AuthorizationService], (authorizationService) => {
        spyOn(authorizationService.storageService, 'read').and.returnValue('A.bs.D');
        expect(authorizationService.readUserId()).toBe(null);
      })
    );

  });

});
