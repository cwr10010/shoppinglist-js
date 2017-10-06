import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { CustomMaterialModule } from '../custom-material.module';

import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';

import { ShoppingListItem } from '../_models/shoppinglist';
import { Logger } from '../_helpers/logging';
import { ShoppingListItemSearchService } from '../_services/item-search.service';

import { ShoppingListSearchServiceMock } from '../_mocks/shoppinglist.mock';
import { RouterMock } from '../_mocks/routing.mock';

class AuthorizationServiceMock {
  getAuthToken(): string { return 'fake-token'; }
  refresh() {}
}

describe('ItemSearchComponent', () => {
  let component: ShoppingListItemSearchComponent;
  let fixture: ComponentFixture<ShoppingListItemSearchComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShoppingListItemSearchComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        { provide: Router, useClass: RouterMock },
        { provide: ShoppingListItemSearchService, useClass: ShoppingListSearchServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListItemSearchComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
