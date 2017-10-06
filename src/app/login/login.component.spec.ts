import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { CustomMaterialModule } from '../custom-material.module';

import { LoginComponent } from './login.component';

import { Logger } from '../_helpers/logging';
import { AuthorizationService } from '../_services/authorization.service';

import { RegistrationMockComponent } from '../_mocks/components.mock';
import { AuthorizationServiceMock } from '../_mocks/authorization.mock';
import { RouterLinkStubDirective, RouterMock, ActivatedRouteMock } from '../_mocks/routing.mock';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        RegistrationMockComponent,
        RouterLinkStubDirective
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
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: AuthorizationService, useClass: AuthorizationServiceMock },
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
