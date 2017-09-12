import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthorizationService } from '../_services/authorization.service';
import { Logger} from '../_helpers/logging';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router,
        private authorizationService: AuthorizationService,
        private log: Logger) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authorizationService.getAuthToken()) {
            return true;
        }
        this.log.warn("User not authenticated. Redirect to login page");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
