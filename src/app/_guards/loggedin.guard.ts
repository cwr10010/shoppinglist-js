import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthorizationService } from '../_services/authorization.service';

import { LoginComponent } from '../login/login.component';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(
        private router: Router,
        private authorizationService: AuthorizationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authorizationService.getAuthToken()) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}
