import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from './services/http-client.module';

import { ShoppingListService } from './services/shoppinglist.service';
import { ShoppingListItemSearchService } from './services/item-search.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthorizationService } from './services/authorization.service';
import { LoggingService } from './services/logging.service';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ShoppingListComponent } from './shoppinglist/shoppinglist.component';
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
    ShoppingListComponent,
    ShoppingListItemSearchComponent
  ],
  providers: [
      ShoppingListService,
      ShoppingListItemSearchService,
      CookieService,
      LocalStorageService,
      AuthorizationService,
      LoggingService,
      HttpClient
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
