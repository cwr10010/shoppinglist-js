import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { By, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material.module';
import { APP_BASE_HREF } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../_services/registration.service';
import { RegistrationData } from '../_models/registration-data';
import { FinishRegistrationComponent } from './finish-registration.component';
import { User } from '../_models/user';

import { LoginMockComponent } from '../_mocks/components.mock';
import { RouterMock, ActivatedRouteMock } from '../_mocks/routing.mock';

class RegistrationServiceMock {
  register(registrationData: RegistrationData) { }
  finish() { return Promise.all([]); }
}

describe('FinishRegistrationComponent', () => {
  let component: FinishRegistrationComponent;
  let fixture: ComponentFixture<FinishRegistrationComponent>;

  let registrationService: RegistrationService;
  let router: Router;

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

  beforeEach(
    inject([RegistrationService, Router], (_registrationService: RegistrationService, _router: Router) => {
      registrationService = _registrationService;
      spyOn(registrationService, 'finish').and.callThrough();
      router = _router;
    })
  );

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinishRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
    expect(registrationService.finish).toHaveBeenCalledTimes(1);
    expect(registrationService.finish).toHaveBeenCalledWith('token');
  }));

  it('should show username on successful registration', async(() => {
    component.user = {username: 'username', password: 'password'} as User;
    fixture.detectChanges();
    const messageNode = fixture.debugElement.query(By.css('mat-card-content'));
    expect(messageNode.nativeElement.innerHTML).toContain(component.user.username);
  }));

  it('should navigate to login page on button click', async(() => {
    const button = fixture.debugElement.query(By.css('button'));
    spyOn(router, 'navigate');
    button.triggerEventHandler('click', {});
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
