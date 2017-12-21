import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';

import { AlertComponent } from './alert.component';
import { Alert, AlertType } from '../_models/alert';

import { Logger } from '../_helpers/logging';

import { AlertService } from '../_services/alert.service';

import { RouterMock, AlertServiceMock } from '../_mocks';

fdescribe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertComponent,
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule
      ],
      providers: [
        Logger,
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success alert', async(() => {
    component.alerts = [
      { type: AlertType.Success, message: 'a message' }
    ];
    fixture.detectChanges();
    const allAlerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(allAlerts.length).toBe(1);
    expect(allAlerts[0].nativeElement.classList).toContain('alert-success');
    expect(allAlerts[0].nativeElement.innerHTML).toContain('a message');
  }));

  it('should show error alert', async(() => {
    component.alerts = [
      { type: AlertType.Error, message: 'a message' }
    ];
    fixture.detectChanges();
    const allAlerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(allAlerts.length).toBe(1);
    expect(allAlerts[0].nativeElement.classList).toContain('alert-danger');
    expect(allAlerts[0].nativeElement.innerHTML).toContain('a message');
  }));

  it('should show info alert', async(() => {
    component.alerts = [
      { type: AlertType.Info, message: 'a message' }
    ];
    fixture.detectChanges();
    const allAlerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(allAlerts.length).toBe(1);
    expect(allAlerts[0].nativeElement.classList).toContain('alert-info');
    expect(allAlerts[0].nativeElement.innerHTML).toContain('a message');
  }));

  it('should show warning alert', async(() => {
    component.alerts = [
      { type: AlertType.Warning, message: 'a message' }
    ];
    fixture.detectChanges();
    const allAlerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(allAlerts.length).toBe(1);
    expect(allAlerts[0].nativeElement.classList).toContain('alert-warning');
    expect(allAlerts[0].nativeElement.innerHTML).toContain('a message');
  }));

  it('should remove warning alert', async(() => {
    const alert = { type: AlertType.Warning, message: 'a message' };
    component.alerts = [
      alert
    ];
    fixture.detectChanges();
    let allAlerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(allAlerts.length).toBe(1);
    expect(allAlerts[0].nativeElement.classList).toContain('alert-warning');
    expect(allAlerts[0].nativeElement.innerHTML).toContain('a message');

    component.removeAlert(alert);
    fixture.detectChanges();
    allAlerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(allAlerts.length).toBe(0);
  }));
});
