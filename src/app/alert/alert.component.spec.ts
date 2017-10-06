import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CustomMaterialModule } from '../custom-material.module';

import { AlertComponent } from './alert.component';

import { Logger } from '../_helpers/logging';

import { AlertService } from '../_services/alert.service';

import { RouterMock } from '../_mocks/routing.mock';
import { AlertServiceMock } from '../_mocks/alert.mock';

describe('AlertComponent', () => {
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
});
