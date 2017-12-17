
import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import { AlertService } from './alert.service';
import { Alert, AlertType } from '../_models/alert';

import { RouterMock } from '../_mocks/routing.mock';

describe('AlertService', () => {

  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: Router, useClass: RouterMock },
      ]
    });
  });

  beforeEach(
    inject([AlertService], (_alertService: AlertService) => {
      alertService = _alertService;
    })
  );

  describe('success()', () => {

    it('should add a new success alert and should not be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.success('success message');
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Success, message: 'success message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new success alert and should be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.success('success message', true);
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Success, message: 'success message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });
  });

  describe('error()', () => {

    it('should add a new error alert and should not be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.error('error message');
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Error, message: 'error message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new error alert and should be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.error('error message', true);
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Error, message: 'error message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });
  });

  describe('info()', () => {

    it('should add a new info alert and should not be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.info('info message');
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Info, message: 'info message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new info alert and should be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.info('info message', true);
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Info, message: 'info message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });
  });

  describe('warn()', () => {

    it('should add a new warn alert and should not be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.warn('warn message');
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Warning, message: 'warn message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new warn alert and should be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.warn('warn message', true);
      expect(alertService.subject.next).toHaveBeenCalledWith({ type: AlertType.Warning, message: 'warn message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });

    it('should add a new warn alert and should be kept after route change', () => {
      spyOn(alertService.subject, 'next');
      alertService.clear();
      expect(alertService.subject.next).toHaveBeenCalledTimes(1);
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

  });

});
