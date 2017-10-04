import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ShoppingListItem } from '../_models/shoppinglist';
import { ShoppingListService } from './shoppinglist.service';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';

@Injectable()
export class ShoppingListItemSearchService {

  shoppingListId: string;

  constructor(
      private http: HttpClient,
      private authorizationService: AuthorizationService,
      private shoppingListService: ShoppingListService,
      private log: Logger) {
    this.shoppingListService.getShoppingLists()
      .then(lists => lists.find(list => list.owners_id === this.authorizationService.readUserId()))
      .then(list => this.shoppingListId = list.shopping_list_id);
  }

  search(term: string): Promise<ShoppingListItem[]> {
    this.log.info(`Search for term:  ${term}`);
    return this.http.get(`/shopping-list/${this.shoppingListId}/entries?term=${term}`)
        .then(response => response.json() as ShoppingListItem[]);
  }
}
