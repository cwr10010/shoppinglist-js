import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

import { CustomMaterialModule } from '../custom-material.module';

import { RegistrationService } from '../_services/registration.service';
import { RegistrationData } from '../_models/registration-data';

import { AlertService } from '../_services/alert.service';

import { RegistrationComponent } from '../registration/registration.component';
import { AlertComponent } from '../alert/alert.component';

import { RouterMock } from '../_mocks/routing.mock';
import { AlertServiceMock } from '../_mocks/alert.mock';

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
        RegistrationComponent,
        AlertComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: Router, useClass: RouterMock },
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
