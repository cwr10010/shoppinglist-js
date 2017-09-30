import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CustomMaterialModule } from '../custom-material.module';

import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';
import { RegistrationComponent } from '../registration/registration.component';
import { FinishRegistrationComponent } from '../finish-registration/finish-registration.component';
import { AlertComponent } from '../_directives/altert.component';

import { ShoppingListItem } from '../_models/shoppinglist';
import { Logger } from '../_helpers/logging';
import { ShoppingListService } from '../_services/shoppinglist.service';
import { ShoppingListItemSearchService } from '../_services/item-search.service';
import { AuthorizationService } from '../_services/authorization.service';

class AuthorizationServiceMock {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
        SortablejsModule,
        AppRoutingModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        { provide: AuthorizationService, useClass: AuthorizationServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
