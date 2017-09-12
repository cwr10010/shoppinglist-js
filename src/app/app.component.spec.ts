import { TestBed } from '@angular/core/testing';

import {APP_BASE_HREF} from '@angular/common';

import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from './_helpers/http-client';
import { Logger } from './_helpers/logging';

import { ShoppingListService } from './_services/shoppinglist.service';
import { ShoppingListItemSearchService } from './_services/item-search.service';
import { LocalStorageService } from './_services/local-storage.service';
import { AuthorizationService } from './_services/authorization.service';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ShoppingListItemSearchComponent } from './item-search/item-search.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            AppRoutingModule
        ],
        declarations: [
            AppComponent,
            LoginComponent,
            DashboardComponent,
            ItemDetailsComponent,
            ShoppingListItemSearchComponent
        ],
        providers: [
            ShoppingListService,
            ShoppingListItemSearchService,
            CookieService,
            LocalStorageService,
            AuthorizationService,
            Logger,
            HttpClient,
            {provide: APP_BASE_HREF, useValue : '/' }
        ]
    });
  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
