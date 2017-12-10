import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DragulaModule } from 'ng2-dragula';
import { CustomMaterialModule } from '../custom-material.module';

import { DashboardComponent } from './dashboard.component';

import { Logger } from '../_helpers/logging';

import { ShoppingListService } from '../_services/shoppinglist.service';
import { AuthorizationService } from '../_services/authorization.service';
import { LocalStorageService } from '../_services/local-storage.service';

import { ShoppingListServiceStub } from '../_mocks/shoppinglist.mock';
import { AuthorizationServiceStub } from '../_mocks/authorization.mock';
import { RouterLinkStubDirective, RouterMock, ActivatedRouteMock } from '../_mocks/routing.mock';
import { ItemSearchMockComponent, LoginMockComponent } from '../_mocks/components.mock';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        ItemSearchMockComponent,
        LoginMockComponent,
        RouterLinkStubDirective
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        DragulaModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        LocalStorageService,
        CookieService,
        { provide: Router, useClass: RouterMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: ShoppingListService, useClass: ShoppingListServiceStub },
        { provide: AuthorizationService, useClass: AuthorizationServiceStub },
        { provide: APP_BASE_HREF, useValue : '/' }
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
