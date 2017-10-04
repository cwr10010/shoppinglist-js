import { Injectable } from '@angular/core';
import { ShoppingListItem, ShoppingList } from '../_models/shoppinglist';

@Injectable()
export class ShoppingListServiceMock {
  getItems(): Promise<ShoppingListItem[]> {
    return Promise.all([]);
  }

  partitionShoppingList(): Promise<ShoppingListItem[][]> {
    return Promise.all([]);
  }

  getItem(id: string): Promise<ShoppingListItem> {
    return Promise.resolve(new ShoppingListItem());
  }

  getShoppingLists(): Promise<ShoppingList[]> {
    return Promise.all([new ShoppingList('1', '2', 'id', '4')]);
  }
}

@Injectable()
export class ShoppingListSearchServiceMock {
  search(term: string): Promise<ShoppingListItem[]> {
    return Promise.all([]);
  }
}
