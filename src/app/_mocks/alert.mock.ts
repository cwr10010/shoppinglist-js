import { Observable } from 'rxjs/Observable';

export class AlertServiceMock {
  getAlert() { return Observable.of({}); }
}
