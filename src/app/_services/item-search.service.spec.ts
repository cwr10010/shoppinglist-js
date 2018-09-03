import { TestBed, inject } from '@angular/core/testing';

import { Logger } from '../_helpers/logging';
import { HttpClient } from '../_helpers/http-client';
import { ShoppingListItemSearchService } from './item-search.service';
import { LocalStorageService } from './local-storage.service';

import { HttpClientStub, createResponse } from '../_mocks/http.mock';

class LocalStorageServiceStub {
  read() {}
}
describe('ShoppingListItemSearchService', () => {

  let http: HttpClient;
  let shoppingListItemSearchService: ShoppingListItemSearchService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ShoppingListItemSearchService,
        Logger,
        { provide: LocalStorageService, useClass: LocalStorageServiceStub },
        { provide: HttpClient, useClass: HttpClientStub },
      ]
    });
  });

  beforeEach(
    inject([HttpClient, ShoppingListItemSearchService, LocalStorageService],
      (_http: HttpClient, _shoppingListItemSearchService: ShoppingListItemSearchService, _localStorageService: LocalStorageService) => {
        http = _http;
        shoppingListItemSearchService = _shoppingListItemSearchService;
        localStorageService = _localStorageService;
    })
  );

  describe('search()', () => {

    it('should return a Promise<ShoppingList[]> of size 1', (done: DoneFn) => {
      const httpGetSpy = spyOn(http, 'get').and.returnValues(
        createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
      );
      spyOn(localStorageService, 'read').and.returnValue('id');
      shoppingListItemSearchService.search('term').then((items) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/id/entries?term=term');
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
      spyOn(localStorageService, 'read').and.returnValue('id');
      shoppingListItemSearchService.search('term').catch((result) => {
        expect(httpGetSpy).toHaveBeenCalledWith('/shopping-list/id/entries?term=term');
        expect(result).toBe('failed request');
        done();
      });
    });

  });
});
