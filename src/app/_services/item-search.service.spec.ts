import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Headers, Http, ResponseOptions, Response } from '@angular/http';

import { Logger } from '../_helpers/logging';
import { HttpClient } from '../_helpers/http-client';
import { ShoppingListItemSearchService } from './item-search.service';
import { LocalStorageService } from './local-storage.service';

import { HttpClientStub, createResponse } from '../_mocks/http.mock';

class LocalStorageServiceStub {
  read() {}
}
describe('ShoppingListItemSearchService', () => {

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

  describe('search()', () => {

    it('should return a Promise<ShoppingList[]> of size 1',
      inject([ShoppingListItemSearchService], (shoppingListItemSearchService) => {
        spyOn(shoppingListItemSearchService.http, 'get').and.returnValues(
          createResponse([{id: 'id', name: 'name', description: 'a description', order: 1, checked: false}])
        );
        spyOn(shoppingListItemSearchService.localStorageService, 'read').and.returnValue('id');
        shoppingListItemSearchService.search('term').then((items) => {
          expect(shoppingListItemSearchService.http.get).toHaveBeenCalledWith('/shopping-list/id/entries?term=term');
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
      inject([ShoppingListItemSearchService], (shoppingListItemSearchService) => {
        spyOn(shoppingListItemSearchService.http, 'get').and.returnValue(Promise.reject('failed request'));
        spyOn(shoppingListItemSearchService.localStorageService, 'read').and.returnValue('id');
        shoppingListItemSearchService.search('term').then((it) => {
          expect(it).toBeUndefined();
        }).catch((result) => {
          expect(shoppingListItemSearchService.http.get).toHaveBeenCalledWith('/shopping-list/id/entries?term=term');
          expect(result).toBe('failed request');
        });
      })
    );

  });
});
