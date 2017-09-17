import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';

import { AuthorizationGuard } from './_guards/authorization.guard'
import { LoggedInGuard } from './_guards/loggedin.guard'

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
import { CustomMaterialModule } from './custom-material.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
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
    AuthorizationGuard,
    LoggedInGuard,
    ShoppingListService,
    ShoppingListItemSearchService,
    CookieService,
    LocalStorageService,
    AuthorizationService,
    Logger,
    HttpClient
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
