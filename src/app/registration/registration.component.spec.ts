import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CustomMaterialModule } from '../custom-material.module';

import { SortablejsModule } from 'angular-sortablejs';

import { RegistrationService } from '../_services/registration.service';
import { RegistrationData } from '../_models/registration-data';

import { AlertService } from '../_services/alert.service';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';
import { RegistrationComponent } from '../registration/registration.component';
import { FinishRegistrationComponent } from '../finish-registration/finish-registration.component';
import { AlertComponent } from '../_directives/altert.component';

import { Logger } from '../_helpers/logging';

class RegistrationServiceMock {
  register(registrationData: RegistrationData) { }
  finish() { return Promise.all([]); }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

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
        AlertService,
        { provide: RegistrationService, useClass: RegistrationServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
