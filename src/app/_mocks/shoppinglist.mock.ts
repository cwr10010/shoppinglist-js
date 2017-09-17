import { Injectable } from '@angular/core'
import { ShoppingListItem } from '../_models/shoppinglist'

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
}

@Injectable()
export class ShoppingListSearchServiceMock {
  search(term: string): Promise<ShoppingListItem[]> {
    return Promise.all([]);
  }
}
