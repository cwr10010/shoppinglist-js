import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Logger } from '../_helpers/logging';

import { RegistrationData } from '../_models/registration-data';
import { User } from '../_models/user';

import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {

  private registerUrl = environment.apiUrl + '/register';

  constructor(
    private http: Http,
    private log: Logger) {}

  register(registrationData: RegistrationData) {
    return this.http.post(
      this.registerUrl,
      JSON.stringify(registrationData),
      {
          headers: this.createHeaders(),
          withCredentials: true
      })
      .toPromise()
      .catch(response => this.handleError(response));
  }

  finish(token: string): Promise<User> {
    return this.http.get(
      this.registerUrl + `?token=${token}`
    ).toPromise()
    .then(response => response.json() as User)
    .catch(response => this.handleError(response));
  }

  private createHeaders(): Headers {
    return new Headers({ 'Content-Type': 'application/json' });
  }

  private handleError(error: Response): Promise<any> {
    switch (error.status) {
        case 403:
            this.log.debug('reset token', error);
            return Promise.all([]);
        default:
            this.log.warn('An error occurred', error);
            return Promise.reject(error);
    }
  }
}
