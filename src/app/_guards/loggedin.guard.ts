import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthorizationService } from '../_services/authorization.service';
import { Logger} from '../_helpers/logging';

import { LoginComponent } from '../login/login.component';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(
        private router: Router,
        private authorizationService: AuthorizationService,
        private log: Logger) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authorizationService.getAuthToken()) {
            this.router.navigate(['']);
            this.log.info('User is authenticated. Redirect to Dashboard.');
            return false;
        }

        return true;
    }
}
