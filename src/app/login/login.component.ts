import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/user';
import { AuthorizationService } from '../_services/authorization.service';
import { Logger } from '../_helpers/logging';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ]
})
export class LoginComponent implements OnInit {

    returnUrl: string;

    @Input() user: User;

    constructor(private authorizationService: AuthorizationService,
        private router: Router,
        private route: ActivatedRoute,
        private log: Logger) {}

    ngOnInit(): void {
        this.authorizationService.refresh();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.user = new User('', '');
    }

    doLogin(): void {
        this.log.debug(JSON.stringify(this.user));
        this.authorizationService.authorize(this.user)
            .then(() => this.navigateToReturnUrl() );
    }

    navigateToReturnUrl() {
        this.router.navigate([this.returnUrl]);
    }
}
