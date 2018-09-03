
import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AlertService } from './alert.service';
import { AlertType } from '../_models/alert';

import { RouterMock } from '../_mocks/routing.mock';

describe('AlertService', () => {

  let alertService: AlertService;
  let alertServiceNextSpy: any;

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
      alertServiceNextSpy = spyOn(alertService.subject, 'next');
    })
  );

  describe('success()', () => {

    it('should add a new success alert and should not be kept after route change', () => {
      alertService.success('success message');
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Success, message: 'success message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new success alert and should be kept after route change', () => {
      alertService.success('success message', true);
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Success, message: 'success message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });
  });

  describe('error()', () => {

    it('should add a new error alert and should not be kept after route change', () => {
      alertService.error('error message');
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Error, message: 'error message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new error alert and should be kept after route change', () => {
      alertService.error('error message', true);
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Error, message: 'error message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });
  });

  describe('info()', () => {

    it('should add a new info alert and should not be kept after route change', () => {
      alertService.info('info message');
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Info, message: 'info message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new info alert and should be kept after route change', () => {
      alertService.info('info message', true);
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Info, message: 'info message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });
  });

  describe('warn()', () => {

    it('should add a new warn alert and should not be kept after route change', () => {
      alertService.warn('warn message');
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Warning, message: 'warn message'});
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

    it('should add a new warn alert and should be kept after route change', () => {
      alertService.warn('warn message', true);
      expect(alertServiceNextSpy).toHaveBeenCalledWith({ type: AlertType.Warning, message: 'warn message'});
      expect(alertService.keepAfterRouteChange).toBe(true);
    });

    it('should add a new warn alert and should be kept after route change', () => {
      alertService.clear();
      expect(alertServiceNextSpy).toHaveBeenCalledTimes(1);
      expect(alertService.keepAfterRouteChange).toBe(false);
    });

  });

});
