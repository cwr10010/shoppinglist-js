import { NgModule } from '@angular/core';

import { AlertServiceMock } from './alert.mock';
import { AuthorizationGuardMock, AuthorizationServiceStub } from './authorization.mock';
import { ItemSearchMockComponent, LoginMockComponent, RegistrationMockComponent } from './components.mock';
import { ActivatedRouteMock, RouterLinkStubDirective, RouterMock, RouterOutletStubComponent } from './routing.mock';
import { ShoppingListSearchServiceStub, ShoppingListServiceStub } from './shoppinglist.mock';

export { AlertServiceMock } from './alert.mock';
export { AuthorizationGuardMock, AuthorizationServiceStub } from './authorization.mock';
export { ItemSearchMockComponent, LoginMockComponent, RegistrationMockComponent } from './components.mock';
export { ActivatedRouteMock, RouterLinkStubDirective, RouterMock, RouterOutletStubComponent } from './routing.mock';
export { ShoppingListSearchServiceStub, ShoppingListServiceStub } from './shoppinglist.mock';

@NgModule({
  declarations: [
    RouterLinkStubDirective, RouterOutletStubComponent,
    ItemSearchMockComponent, LoginMockComponent, RegistrationMockComponent
  ],
  providers: [
    AuthorizationGuardMock,
    AlertServiceMock,
    AuthorizationServiceStub,
    ShoppingListSearchServiceStub, ShoppingListServiceStub
  ]
})
export class MockModule {}
