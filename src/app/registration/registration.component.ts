import { Input, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Logger } from '../_helpers/logging';

import { AlertService } from '../_services/alert.service';
import { RegistrationService } from '../_services/registration.service';
import { RegistrationData } from '../_models/registration-data';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input() registrationData: RegistrationData;

  constructor(
    private registrationService: RegistrationService,
    private alertService: AlertService,
    private log: Logger) { }

  ngOnInit() {
    this.registrationData = new RegistrationData('', '', '', '');
  }

  doRegister(form: NgForm) {
    this.registrationService.register(this.registrationData)
      .then(() => this.alertService.info('Sent registration request.'))
      .then(() => form.resetForm(new RegistrationData('', '', '', '')));
  }

}
