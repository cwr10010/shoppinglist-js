import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CustomMaterialModule } from '../custom-material.module';

import { RegistrationService } from '../_services/registration.service';
import { RegistrationData } from '../_models/registration-data';
import { FinishRegistrationComponent } from './finish-registration.component';

import { DragulaModule } from 'ng2-dragula';

import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';
import { ShoppingListItemSearchComponent } from '../item-search/item-search.component';
import { AlertComponent } from '../_directives/altert.component';

class RegistrationServiceMock {
  register(registrationData: RegistrationData) { }
  finish() { return Promise.all([]); }
}

describe('FinishRegistrationComponent', () => {
  let component: FinishRegistrationComponent;
  let fixture: ComponentFixture<FinishRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FinishRegistrationComponent,
        LoginComponent,
        RegistrationComponent,
        DashboardComponent,
        ItemDetailsComponent,
        ShoppingListItemSearchComponent,
        AlertComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragulaModule,
        AppRoutingModule,
        FormsModule,
        CustomMaterialModule
      ],
      providers: [
        { provide: RegistrationService, useClass: RegistrationServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
