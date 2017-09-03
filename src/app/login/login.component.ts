import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../services/authorization.service';
import { LoggingService } from '../services/logging.service';
import { User } from '../model/user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ]
})
export class LoginComponent implements OnInit {

    constructor(private authorizationService: AuthorizationService,
        private log: LoggingService) {}

    ngOnInit(): void {
        this.authorizationService.refresh();
    }

    doLogin(username: string, password: string): void {
        this.log.debug(`doLogin(${username}, ${password})`);
        this.authorizationService.authorize(username, password);
    }

}
