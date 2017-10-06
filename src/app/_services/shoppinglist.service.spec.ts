import { TestBed, async, inject } from '@angular/core/testing';
import { Headers, Http, ResponseOptions, Response } from '@angular/http';

import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';

import { ShoppingList } from '../_models/shoppinglist';
import { ShoppingListService } from './shoppinglist.service';
import { AuthorizationService } from './authorization.service';

import { AuthorizationServiceMock } from '../_mocks/authorization.mock';

const shoppingListMockResponse = [
  new ShoppingList('sl-id', 'sl-name', 'ow-id', 'ow-name')
];

class HttpClientMock {
  get(): Promise<Response> {
    return Promise.resolve(
      new Response(
        new ResponseOptions({
          body: JSON.stringify(shoppingListMockResponse),
          status: 200
        })
      ));
    }
  createHeaders(): Promise<Headers> { return Promise.apply(new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    }));
  }
}

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
        shoppingListService.getShoppingLists().then((shoppinglists) => {
          expect(shoppinglists.length).toBe(1);
        });
      })
    );

  });

});
