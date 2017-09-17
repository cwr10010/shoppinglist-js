import { Injectable } from '@angular/core'

@Injectable()
export class AuthorizationServiceMock {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
}
