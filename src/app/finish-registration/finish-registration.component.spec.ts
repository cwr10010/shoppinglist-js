import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material.module';
import { APP_BASE_HREF } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../_services/registration.service';
import { RegistrationData } from '../_models/registration-data';
import { FinishRegistrationComponent } from './finish-registration.component';

import { LoginMockComponent } from '../_mocks/components.mock';
import { RouterMock, ActivatedRouteMock } from '../_mocks/routing.mock';

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
        LoginMockComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CustomMaterialModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: RegistrationService, useClass: RegistrationServiceMock },
        { provide: Router, useClass: RouterMock },
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
