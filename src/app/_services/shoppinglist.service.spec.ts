import { TestBed, async, inject } from '@angular/core/testing';

import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';

import { ShoppingListService } from './shoppinglist.service';
import { AuthorizationService } from './authorization.service';

import { AuthorizationServiceMock } from '../_mocks/authorization.mock';
import { HttpClientMock, createResponse } from '../_mocks/http.mock';

describe('ShoppingListService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ShoppingListService,
        Logger,
        { provide: AuthorizationService, useClass: AuthorizationServiceMock },
        { provide: HttpClient, useClass: HttpClientMock },
      ]
    });
  });

  describe('getShoppingLists()', () => {

    it('should return a Promise<ShoppingList[]> of size 1',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'get').and.returnValues(
          createResponse([{shopping_list_id: 'sl-id', shopping_list_name: 'sl-name', owners_id: 'ow-id', owners_name: 'ow-name'}])
        );
        shoppingListService.getShoppingLists().then((shoppinglists) => {
          expect(shoppinglists.length).toBe(1);
          expect(shoppinglists[0].shopping_list_id).toBe('sl-id');
          expect(shoppinglists[0].shopping_list_name).toBe('sl-name');
          expect(shoppinglists[0].owners_id).toBe('ow-id');
          expect(shoppinglists[0].owners_name).toBe('ow-name');
        });
      })
    );

    it('should throw an error if http request fails',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'get').and.returnValue(Promise.reject('failed request'));
        shoppingListService.getShoppingLists().then((it) => {
          expect(it).toBeUndefined();
        }).catch((result) => {
          expect(result).toBe('failed request');
        });
      })
    );

  });

  describe('getItems()', () => {

    it('should return items of the current list',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'get').and.returnValues(
          createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
        );
        shoppingListService.getItems().then((items) => {
          expect(items.length).toBe(1);
          expect(items[0].id).toBe('id');
          expect(items[0].name).toBe('name');
          expect(items[0].description).toBe('a description');
          expect(items[0].order).toBe(1);
          expect(items[0].checked).toBe(false);
        });
      })
    );

    it('should throw an error if http request fails',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'get').and.returnValue(Promise.reject('failed request'));
        shoppingListService.getItems().then((it) => {
          expect(it).toBeUndefined();
        }).catch((result) => {
          expect(result).toBe('failed request');
        });
      })
    );

  });

  describe('getItem()', () => {

    it('should return requested item',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'get').and.returnValues(
          createResponse({id: 'id', name: 'name', description: 'a description', order: 1, checked: false})
        );
        shoppingListService.getItem('sl_id', 'id').then((items) => {
          expect(items.id).toBe('id');
          expect(items.name).toBe('name');
          expect(items.description).toBe('a description');
          expect(items.order).toBe(1);
          expect(items.checked).toBe(false);
        });
      })
    );

    it('should throw an error if http request fails',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'get').and.returnValue(Promise.reject('failed request'));
        shoppingListService.getItem('sl_id', 'id').then((it) => {
          expect(it).toBeUndefined();
        }).catch((result) => {
          expect(result).toBe('failed request');
        });
      })
    );
  });

  describe('update()', () => {

    it('should update requested item',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'post').and.returnValues(
          createResponse({id: 'id', name: 'name', description: 'a description', order: 1, checked: false})
        );
        shoppingListService.update('sl_id', {id: 'id'}).then((items) => {
          expect(items.id).toBe('id');
          expect(items.name).toBe('name');
          expect(items.description).toBe('a description');
          expect(items.order).toBe(1);
          expect(items.checked).toBe(false);
        });
      })
    );

    it('should throw an error if http request fails',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'post').and.returnValue(Promise.reject('failed request'));
        shoppingListService.update('sl_id', {id: 'id'}).then((it) => {
          expect(it).toBeUndefined();
        }).catch((result) => {
          expect(result).toBe('failed request');
        });
      })
    );
  });

  describe('delete()', () => {

    it('should update requested item',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'delete').and.returnValues(
          createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
        );
        shoppingListService.delete('sl_id', 'id').then((items) => {
          expect(items.length).toBe(1);
          expect(items[0].id).toBe('id');
          expect(items[0].name).toBe('name');
          expect(items[0].description).toBe('a description');
          expect(items[0].order).toBe(1);
          expect(items[0].checked).toBe(false);
        });
      })
    );

    it('should throw an error if http request fails',
      inject([ShoppingListService], (shoppingListService) => {
        spyOn(shoppingListService.http, 'delete').and.returnValue(Promise.reject('failed request'));
        shoppingListService.delete('sl_id', 'id').then((it) => {
          expect(it).toBeUndefined();
        }).catch((result) => {
          expect(result).toBe('failed request');
        });
      })
    );
  });

});
