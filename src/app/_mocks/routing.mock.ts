import { Component, Directive, HostListener, Input } from '@angular/core';
import { of } from 'rxjs';

export class RouterMock {
  events = of({ });

  navigate(url: string[]) { return url; }
}

export class ActivatedRouteMock {
  paramMap = of({
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

  @Input()
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
