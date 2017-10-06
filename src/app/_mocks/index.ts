import { NgModule } from '@angular/core';

import { AlertServiceMock } from './alert.mock';
import { AuthorizationGuardMock, AuthorizationServiceMock } from './authorization.mock';
import { ItemSearchMockComponent, LoginMockComponent, RegistrationMockComponent } from './components.mock';
import { ActivatedRouteMock, RouterLinkStubDirective, RouterMock, RouterOutletStubComponent } from './routing.mock';
import { ShoppingListSearchServiceMock, ShoppingListServiceMock } from './shoppinglist.mock';

@NgModule({
  declarations: [
    RouterLinkStubDirective, RouterOutletStubComponent,
    ItemSearchMockComponent, LoginMockComponent, RegistrationMockComponent
  ],
  providers: [
    AuthorizationGuardMock,
    AlertServiceMock,
    AuthorizationServiceMock,
    ShoppingListSearchServiceMock, ShoppingListServiceMock
  ]
})
export class MockModule {}