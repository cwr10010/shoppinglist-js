import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { RegistrationService } from '../_services/registration.service';

import { User } from '../_models/user';

@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.css']
})
export class FinishRegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router) { }

    user: User = new User('', '');

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => this.registrationService.finish(params.get('token')))
    .subscribe(user => this.user = user);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
