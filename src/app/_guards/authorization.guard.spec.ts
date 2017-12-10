import { TestBed, async, inject } from '@angular/core/testing';
import { Headers, Http, ResponseOptions, Response } from '@angular/http';
import { Inject } from '@angular/core';
import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';
import { Router } from '@angular/router';

import { AuthorizationGuard } from './authorization.guard';
import { AuthorizationService } from '../_services/authorization.service';

import { AuthorizationServiceStub } from '../_mocks/authorization.mock';
import { RouterMock } from '../_mocks/routing.mock';

describe('AuthorizationGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationGuard,
        Logger,
        { provide: AuthorizationService, useClass: AuthorizationServiceStub },
        { provide: Router, useClass: RouterMock },
      ]
    });
  });

  it('should allow showing component if a valid token is present',
    inject([AuthorizationGuard], (authorizationGuard) => {
      spyOn(authorizationGuard.router, 'navigate');
      expect(authorizationGuard.canActivate()).toBeTruthy();
      expect(authorizationGuard.router.navigate).toHaveBeenCalledTimes(0);
    })
  );

  it('should deny showing component if no auth token is present',
    inject([AuthorizationGuard], (authorizationGuard) => {
      spyOn(authorizationGuard.authorizationService, 'getAuthToken').and.returnValue(null);
      spyOn(authorizationGuard.router, 'navigate');
      expect(authorizationGuard.canActivate({}, { url: 'test' })).toBeFalsy();
      expect(authorizationGuard.router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: 'test' }});
    })
  );
});
