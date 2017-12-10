
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

    it('should retrieve auth tokens and store them in the local storage',
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

});
