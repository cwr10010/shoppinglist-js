import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { ShoppingListItem } from '../_models/shoppinglist';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';

const CURRENT_SHOPPING_LIST_ID = 'X-SLS-SHOPPINGLIST';

@Injectable()
export class ShoppingListItemSearchService {

  constructor(
      private http: HttpClient,
      private localStorageService: LocalStorageService,
      private log: Logger) {
  }

  search(term: string): Promise<ShoppingListItem[]> {
    this.log.info(`Search for term:  ${term}`);
    const currentShoppingListId = this.localStorageService.read(CURRENT_SHOPPING_LIST_ID);
    return this.http.get(`/shopping-list/${currentShoppingListId}/entries?term=${term}`)
        .then(response => response.json() as ShoppingListItem[]);
  }
}
