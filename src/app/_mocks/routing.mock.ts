import { Component, Directive, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class RouterMock {
  events = Observable.of({ });

  navigate(url: string[]) { return url; }
}

export class ActivatedRouteMock {
  paramMap = Observable.of({
    get( arg: string) {
      return 'token';
    }
  });

  snapshot = {
    queryParams: {
      'returnUrl': 'returnUrl'
    }
  };

}

@Directive({
  selector: '[routerLink]' // tslint:disable-line
})
export class RouterLinkStubDirective {

  @Input('routerLink')
  routerLink: string;

  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}

@Component({
  selector: 'router-outlet',  // tslint:disable-line
  template: ''
})
export class RouterOutletStubComponent { }
