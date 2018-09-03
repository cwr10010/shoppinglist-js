import { TestBed, async, inject } from '@angular/core/testing';

import { } from 'jasmine';
import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';

import { ShoppingListService } from './shoppinglist.service';
import { AuthorizationService } from './authorization.service';

import { AuthorizationServiceStub } from '../_mocks/authorization.mock';
import { HttpClientStub, createResponse } from '../_mocks/http.mock';

describe('ShoppingListService', () => {

  let shoppingListService: ShoppingListService;
  let http: HttpClient;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ShoppingListService,
        Logger,
        { provide: AuthorizationService, useClass: AuthorizationServiceStub },
        { provide: HttpClient, useClass: HttpClientStub },
      ]
    });
  });

  beforeEach(
    inject([HttpClient, ShoppingListService], (_http: HttpClient, _shoppingListService: ShoppingListService) => {
      http = _http;
      shoppingListService = _shoppingListService;
    })
  );

  describe('getShoppingLists()', () => {

    it('should return a Promise<ShoppingList[]> of size 1', (done: DoneFn) => {

      const httpGetSpy = spyOn(http, 'get').and.returnValues(
        createResponse([{shopping_list_id: 'sl-id', shopping_list_name: 'sl-name', owners_id: 'ow-id', owners_name: 'ow-name'}])
      );
      shoppingListService.getShoppingLists().then((shoppinglists) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list');
        expect(shoppinglists.length).toBe(1);
        expect(shoppinglists[0].shopping_list_id).toBe('sl-id');
        expect(shoppinglists[0].shopping_list_name).toBe('sl-name');
        expect(shoppinglists[0].owners_id).toBe('ow-id');
        expect(shoppinglists[0].owners_name).toBe('ow-name');
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(Promise.reject('failed request'));
      shoppingListService.getShoppingLists().then((it) => {
        expect(it).toBeUndefined();
      }).catch((result) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list');
        expect(result).toBe('failed request');
        done();
      });
    });
  });

  describe('getItems()', () => {

    it('should return items of the current list', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValues(
        createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
      );
      shoppingListService.getItems('id').then((items) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/id/entries');
        expect(items.length).toBe(1);
        expect(items[0].id).toBe('id');
        expect(items[0].name).toBe('name');
        expect(items[0].description).toBe('a description');
        expect(items[0].order).toBe(1);
        expect(items[0].checked).toBe(false);
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(Promise.reject('failed request'));
      shoppingListService.getItems('id').then((it) => {
        expect(it).toBeUndefined();
      }).catch((result) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/id/entries');
        expect(result).toBe('failed request');
        done();
      });
    });

  });

  describe('partitionShoppingList()', () => {

    it('should return items of the current list, partitionated by checked', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValues(
        createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false},
          {id: 'id2', name: 'name', description: 'a description', order: 2, checked: true}])
      );
      shoppingListService.partitionShoppingList('id').then(items => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/id/entries');
        expect(items[0].length).toBe(1);
        expect(items[0][0].id).toBe('id2');
        expect(items[0][0].name).toBe('name');
        expect(items[0][0].description).toBe('a description');
        expect(items[0][0].order).toBe(2);
        expect(items[0][0].checked).toBe(true);
        expect(items[1].length).toBe(1);
        expect(items[1][0].id).toBe('id');
        expect(items[1][0].name).toBe('name');
        expect(items[1][0].description).toBe('a description');
        expect(items[1][0].order).toBe(1);
        expect(items[1][0].checked).toBe(false);
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(Promise.reject('failed request'));
      shoppingListService.partitionShoppingList('id').then((it) => {
        expect(it).toBeUndefined();
      }).catch((result) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/id/entries');
        expect(result).toBe('failed request');
        done();
      });
    });

  });

  describe('getItem()', () => {

    it('should return requested item', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValues(
        createResponse({id: 'id', name: 'name', description: 'a description', order: 1, checked: false})
      );
      shoppingListService.getItem('sl_id', 'id').then((item) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/sl_id/entries/id');
        expect(item.id).toBe('id');
        expect(item.name).toBe('name');
        expect(item.description).toBe('a description');
        expect(item.order).toBe(1);
        expect(item.checked).toBe(false);
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValue(Promise.reject('failed request'));
      shoppingListService.getItem('sl_id', 'id').then((it) => {
        expect(it).toBeUndefined();
      }).catch((result) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/sl_id/entries/id');
        expect(result).toBe('failed request');
        done();
      });
    });
  });

  describe('create()', () => {

    it('should update requested item', (done: DoneFn) => {
      const httpPostSpy = spyOn(http, 'post').and.returnValues(
        createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
      );
      shoppingListService.create('id', 'name', 'a description', 1, false).then((items) => {
        expect(httpPostSpy).toHaveBeenCalledWith('/shopping-list/id/entries',
          '[{"name":"name","description":"a description","order":1,"checked":false}]');
        expect(items.length).toBe(1);
        expect(items[0].id).toBe('id');
        expect(items[0].name).toBe('name');
        expect(items[0].description).toBe('a description');
        expect(items[0].order).toBe(1);
        expect(items[0].checked).toBe(false);
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpPostSpy = spyOn(http, 'post').and.returnValue(Promise.reject('failed request'));
      shoppingListService.create('id', 'name', 'a description', 1, false).catch((result) => {
        expect(httpPostSpy).toHaveBeenCalledWith('/shopping-list/id/entries',
          '[{"name":"name","description":"a description","order":1,"checked":false}]');
        expect(result).toBe('failed request');
        done();
      });
    });
  });

  describe('update()', () => {

    it('should update requested item', (done: DoneFn) => {
      const httpPostSpy = spyOn(http, 'post').and.returnValues(
        createResponse({id: 'id', name: 'name', description: 'a description', order: 1, checked: false})
      );
      shoppingListService.update('sl_id', Object({id: 'id'})).then((items) => {
        expect(httpPostSpy).toHaveBeenCalledWith('/shopping-list/sl_id/entries/id', '{"id":"id"}');
        expect(items.id).toBe('id');
        expect(items.name).toBe('name');
        expect(items.description).toBe('a description');
        expect(items.order).toBe(1);
        expect(items.checked).toBe(false);
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpPostSpy = spyOn(http, 'post').and.returnValue(Promise.reject('failed request'));
      shoppingListService.update('sl_id', Object({id: 'id'})).catch((result) => {
        expect(httpPostSpy).toHaveBeenCalledWith('/shopping-list/sl_id/entries/id', '{"id":"id"}');
        expect(result).toBe('failed request');
        done();
      });
    });
  });

  describe('delete()', () => {

    it('should update requested item', (done: DoneFn) => {
      const httpDeleteSpy = spyOn(http, 'delete').and.returnValues(
        createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
      );
      shoppingListService.delete('sl_id', 'id').then((items) => {
        expect(httpDeleteSpy).toHaveBeenCalledWith('/shopping-list/sl_id/entries/id');
        expect(items.length).toBe(1);
        expect(items[0].id).toBe('id');
        expect(items[0].name).toBe('name');
        expect(items[0].description).toBe('a description');
        expect(items[0].order).toBe(1);
        expect(items[0].checked).toBe(false);
        done();
      });
    });

    it('should throw an error if http request fails', (done: DoneFn) => {
      const httpDeleteSpy = spyOn(http, 'delete').and.returnValue(Promise.reject('failed request'));
      shoppingListService.delete('sl_id', 'id').catch((result) => {
        expect(httpDeleteSpy).toHaveBeenCalledWith('/shopping-list/sl_id/entries/id');
        expect(result).toBe('failed request');
        done();
      });
    });
  });

});
