import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Logger } from '../_helpers/logging';

import { DashboardComponent } from './dashboard.component';
import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';

import { ShoppingListItem } from '../_models/shoppinglist';

import { ShoppingListService } from '../_services/shoppinglist.service';
import { ShoppingListItemSearchService } from '../_services/item-search.service';
import { AuthorizationService } from '../_services/authorization.service';
import { LocalStorageService } from '../_services/local-storage.service';

import { CustomMaterialModule } from '../custom-material.module';

import { ShoppingListServiceMock, ShoppingListSearchServiceMock } from '../_mocks/shoppinglist.mock';

class RouterMock {
  navigate(url: string[]) { return url; }
}

class AuthorizationServiceMock {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        ShoppingListItemSearchComponent,
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        LocalStorageService,
        CookieService,
        { provide: Router, useClass: RouterMock },
        { provide: ShoppingListService, useClass: ShoppingListServiceMock },
        { provide: AuthorizationService, useClass: AuthorizationServiceMock },
        { provide: ShoppingListItemSearchService, useClass: ShoppingListSearchServiceMock }
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
