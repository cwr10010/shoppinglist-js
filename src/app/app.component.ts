import { Component } from '@angular/core';

import { AuthorizationService } from './services/authorization.service';

import '../assets/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
    title = 'Shopping List App';

    constructor(private authorizationService: AuthorizationService) {}

    isLoggedin(): boolean {
        if (this.authorizationService.getAuthToken()) {
            return true;
        } else {
            return false;
        }
    }

    doLogout() {
        this.authorizationService.logout();
    }
}
