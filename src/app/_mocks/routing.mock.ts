import { Directive, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class RouterMock {
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
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {

  @Input('routerLink')
  routerLink: string;

  navigatedTo: any = null;

  @HostListener('mouseenter')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}
