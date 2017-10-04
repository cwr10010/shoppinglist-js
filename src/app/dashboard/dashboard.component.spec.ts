import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DragulaModule } from 'ng2-dragula';
import { CustomMaterialModule } from '../custom-material.module';

import { Logger } from '../_helpers/logging';

import { RegistrationComponent } from '../registration/registration.component';
import { FinishRegistrationComponent } from '../finish-registration/finish-registration.component';

import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from '../login/login.component';
import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';

import { AlertComponent } from '../_directives/altert.component';

import { ShoppingListItem } from '../_models/shoppinglist';

import { ShoppingListService } from '../_services/shoppinglist.service';
import { ShoppingListItemSearchService } from '../_services/item-search.service';
import { AuthorizationService } from '../_services/authorization.service';
import { LocalStorageService } from '../_services/local-storage.service';

import { AuthorizationGuard } from '../_guards/authorization.guard';

import { ShoppingListServiceMock, ShoppingListSearchServiceMock } from '../_mocks/shoppinglist.mock';
import { AuthorizationServiceMock } from '../_mocks/authorization.mock';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertComponent,
        DashboardComponent,
        LoginComponent,
        RegistrationComponent,
        FinishRegistrationComponent,
        ShoppingListItemSearchComponent,
        ItemDetailsComponent
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        DragulaModule,
        AppRoutingModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        LocalStorageService,
        CookieService,
        AuthorizationGuard,
        { provide: ShoppingListService, useClass: ShoppingListServiceMock },
        { provide: AuthorizationService, useClass: AuthorizationServiceMock },
        { provide: ShoppingListItemSearchService, useClass: ShoppingListSearchServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
