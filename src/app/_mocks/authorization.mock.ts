import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthorizationServiceStub {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
  readUserId(): string { return 'id'; }
}

export class AuthorizationGuardMock implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
