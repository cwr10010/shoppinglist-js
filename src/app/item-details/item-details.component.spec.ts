import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { CustomMaterialModule } from '../custom-material.module';

import { Logger } from '../_helpers/logging';
import { ShoppingListService } from '../_services/shoppinglist.service';
import { LocalStorageService } from '../_services/local-storage.service';
import { CookieService } from 'ngx-cookie-service';

import { ItemDetailsComponent } from './item-details.component';

import { ShoppingListServiceStub } from '../_mocks/shoppinglist.mock';
import { LoginMockComponent } from '../_mocks/components.mock';
import { RouterMock, ActivatedRouteMock } from '../_mocks/routing.mock';

class LocationMock {
  back() {}
}

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
        ItemDetailsComponent,
        LoginMockComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        LocalStorageService,
        CookieService,
        { provide: Location, useClass: LocationMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: ShoppingListService, useClass: ShoppingListServiceStub },
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
