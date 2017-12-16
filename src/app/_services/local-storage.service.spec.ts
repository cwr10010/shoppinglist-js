import { TestBed, async, inject } from '@angular/core/testing';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { CookieService } from 'ngx-cookie-service';

import { Logger } from '../_helpers/logging';
import { LocalStorageService } from './local-storage.service';

class CookieServiceStub {
  get() {}
  set() {}
  delete() {}
}

describe('LocalStorageService', () => {

  let cookieService: CookieService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        Logger,
        { provide: CookieService, useClass: CookieServiceStub }
      ]
    });
  });

  beforeEach(
    inject([CookieService, LocalStorageService],
      (_cookieService: CookieService, _localStorageService: LocalStorageService) => {
        cookieService = _cookieService;
        localStorageService = _localStorageService;
      }
    )
  );

  describe('store()', () => {

    it('should store a string value into the local storage if available', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'setItem');
      spyOn(cookieService, 'set');
      localStorageService.store('key', 'value');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('key', 'value');
      expect(cookieService.set).toHaveBeenCalledTimes(0);
    });

    it('should store a string value into the cookie elseway', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'setItem');
      spyOn(cookieService, 'set');
      localStorageService.store('key', 'value');
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(cookieService.set).toHaveBeenCalledWith('key', 'value', 30, '/', '', true);
    });

    it('should store an object value into the local storage if available', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'setItem');
      spyOn(cookieService, 'set');
      localStorageService.store('key', {id: 'id'});
      expect(window.localStorage.setItem).toHaveBeenCalledWith('key', '{"id":"id"}');
      expect(cookieService.set).toHaveBeenCalledTimes(0);
    });

    it('should store an object value into the cookie elseway', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'setItem');
      spyOn(cookieService, 'set');
      localStorageService.store('key', {id: 'id'});
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
      expect(cookieService.set).toHaveBeenCalledWith('key', '{"id":"id"}', 30, '/', '', true);
    });

    it('should remove item from local storage if available and value is null', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'removeItem');
      spyOn(cookieService, 'delete');
      localStorageService.store('key', null);
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
      expect(cookieService.delete).toHaveBeenCalledTimes(0);
    });

    it('should remove item from the cookie else and if value is null', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'removeItem');
      spyOn(cookieService, 'delete');
      localStorageService.store('key', null);
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(0);
      expect(cookieService.delete).toHaveBeenCalledWith('key', '/');
    });

    it('should remove item from local storage if available and value is undefined', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'removeItem');
      spyOn(cookieService, 'delete');
      localStorageService.store('key', undefined);
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
      expect(cookieService.delete).toHaveBeenCalledTimes(0);
    });

    it('should remove item from the cookie else and if value is undefined', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'removeItem');
      spyOn(cookieService, 'delete');
      localStorageService.store('key', undefined);
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(0);
      expect(cookieService.delete).toHaveBeenCalledWith('key', '/');
    });

  });

  describe('read()', () => {

    it('should read a string value from local storage if available', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'getItem').and.returnValue('value');
      spyOn(cookieService, 'get');
      expect(localStorageService.read('key')).toBe('value');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
      expect(cookieService.get).toHaveBeenCalledTimes(0);
    });

    it('should read a string value from local storage if available', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'getItem');
      spyOn(cookieService, 'get').and.returnValue('value');
      expect(localStorageService.read('key')).toBe('value');
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(0);
      expect(cookieService.get).toHaveBeenCalledWith('key');
    });

    it('should read an object value from local storage if available', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'getItem').and.returnValue({id: 'id'});
      spyOn(cookieService, 'get');
      expect(localStorageService.read('key').id).toBe('id');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
      expect(cookieService.get).toHaveBeenCalledTimes(0);
    });

    it('should read an object value from local storage if available', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'getItem');
      spyOn(cookieService, 'get').and.returnValue('{"id":"id"}');
      expect(localStorageService.read('key').id).toBe('id');
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(0);
      expect(cookieService.get).toHaveBeenCalledWith('key');
    });

  });

  describe('remove()', () => {

    it('should remove item from local storage if available', () => {
      localStorageService.localStorageAvailable = true;
      spyOn(localStorage, 'removeItem');
      spyOn(cookieService, 'delete');
      localStorageService.remove('key');
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
      expect(cookieService.delete).toHaveBeenCalledTimes(0);
    });

    it('should remove item from the cookie else', () => {
      localStorageService.localStorageAvailable = false;
      spyOn(localStorage, 'removeItem');
      spyOn(cookieService, 'delete');
      localStorageService.remove('key');
      expect(window.localStorage.removeItem).toHaveBeenCalledTimes(0);
      expect(cookieService.delete).toHaveBeenCalledWith('key', '/');
    });

  });
});
