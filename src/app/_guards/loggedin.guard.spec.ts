import { TestBed, async, inject } from '@angular/core/testing';
import { Inject } from '@angular/core';
import { Logger } from '../_helpers/logging';
import { Router } from '@angular/router';

import { LoggedInGuard } from './loggedin.guard';
import { AuthorizationService } from '../_services/authorization.service';

import { AuthorizationServiceStub } from '../_mocks/authorization.mock';
import { RouterMock } from '../_mocks/routing.mock';

describe('LoggedInGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedInGuard,
        Logger,
        { provide: AuthorizationService, useClass: AuthorizationServiceStub },
        { provide: Router, useClass: RouterMock },
      ]
    });
  });

  it('should be redirected to dashboard if token is present',
    inject([LoggedInGuard], (loggedInGuard) => {
      const routerNavigateSpy = spyOn(loggedInGuard.router, 'navigate');
      expect(loggedInGuard.canActivate({}, {})).toBeFalsy();
      expect(routerNavigateSpy).toHaveBeenCalledWith(['']);
    })
  );

  it('should load login component if no token present',
    inject([LoggedInGuard], (loggedInGuard) => {
      spyOn(loggedInGuard.authorizationService, 'getAuthToken').and.returnValue(null);
      const routerNavigateSpy = spyOn(loggedInGuard.router, 'navigate');
      expect(loggedInGuard.canActivate()).toBeTruthy();
      expect(routerNavigateSpy).toHaveBeenCalledTimes(0);
    })
  );
});
