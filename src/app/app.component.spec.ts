import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ShoppingListItemSearchComponent } from './item-search/item-search.component';

import { Logger } from './_helpers/logging';
import { AuthorizationService } from './_services/authorization.service';

class RouterMock {
  navigate(url: string[]) { return url; }
}

class AuthorizationServiceMock {
  getAuthToken() { return 'fake-auth-token'; }
}

describe('App', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            BrowserModule,
            FormsModule,
            AppRoutingModule,
            CustomMaterialModule
        ],
        declarations: [
            LoginComponent,
            DashboardComponent,
            ShoppingListItemSearchComponent,
            ItemDetailsComponent,
            AppComponent
        ],
        providers: [
            Logger,
            { provide: AuthorizationService, useClass: AuthorizationServiceMock },
            { provide: Router, useClass: RouterMock }
        ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;

  });

  it ('should work', () => {
    expect(appComponent instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
