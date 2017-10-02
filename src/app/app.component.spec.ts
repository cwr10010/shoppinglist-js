import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DragulaModule } from 'ng2-dragula';

import { AlertComponent } from './_directives/altert.component';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ShoppingListItemSearchComponent } from './item-search/item-search.component';
import { RegistrationComponent } from './registration/registration.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material.module';

import { ShoppingListItem } from './_models/shoppinglist';
import { Logger } from './_helpers/logging';

import { ShoppingListService } from './_services/shoppinglist.service';
import { ShoppingListItemSearchService } from './_services/item-search.service';
import { AuthorizationService } from './_services/authorization.service';

class RouterMock {
  navigate(url: string[]) { return url; }
}

class AuthorizationServiceMock {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
}

class ShoppingListServiceMock {
  getItems(): Promise<ShoppingListItem[]> {
    return Promise.all([]);
  }
}

class ShoppingListSearchServiceMock {
  search(term: string): Promise<ShoppingListItem[]> {
    return Promise.all([]);
  }
}

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        DashboardComponent,
        ItemDetailsComponent,
        ShoppingListItemSearchComponent,
        AppComponent,
        RegistrationComponent,
        FinishRegistrationComponent,
        AlertComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        DragulaModule,
        CustomMaterialModule
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
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
  });

  it('should create the app', async(() => {
    expect(appComponent).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(appComponent.title).toEqual('Shopping List App');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(debugElement.query(By.css('.app-title')).nativeElement.textContent).toContain('Shopping List App');
  }));
});
