import { of } from 'rxjs';

export class AlertServiceMock {
  getAlert() { return of({}); }
}
