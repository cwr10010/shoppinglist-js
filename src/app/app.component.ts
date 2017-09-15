import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from './_services/authorization.service';

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

    constructor(private authorizationService: AuthorizationService,
      private router: Router) {}

    isLoggedin(): boolean {
        if (this.authorizationService.getAuthToken()) {
            return true;
        } else {
            return false;
        }
    }

    doLogout(): Promise<boolean> {
        return this.authorizationService.logout()
          .then(() => this.router.navigate(['/login']));
    }
}
