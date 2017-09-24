import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CustomMaterialModule } from '../custom-material.module';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';

import { ShoppingListItem } from '../_models/shoppinglist';
import { Logger } from '../_helpers/logging';
import { ShoppingListService } from '../_services/shoppinglist.service';
import { ShoppingListItemSearchService } from '../_services/item-search.service';
import { AuthorizationService } from '../_services/authorization.service';
import { RegistrationComponent } from '../registration/registration.component';
import { FinishRegistrationComponent } from '../finish-registration/finish-registration.component';
import { ItemDetailsComponent } from './item-details.component';
import { AlertComponent } from '../_directives/altert.component';

import { ShoppingListServiceMock } from '../_mocks/shoppinglist.mock';

class AuthorizationServiceMock {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
}

describe('ItemDetailComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        DashboardComponent,
        ItemDetailsComponent,
        ShoppingListItemSearchComponent,
        RegistrationComponent,
        FinishRegistrationComponent,
        AlertComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        { provide: AuthorizationService, useClass: AuthorizationServiceMock },
        { provide: ShoppingListService, useClass: ShoppingListServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
