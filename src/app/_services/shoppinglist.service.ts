import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { ShoppingList, ShoppingListItem } from '../_models/shoppinglist';
import { Logger } from '../_helpers/logging';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from '../_helpers/http-client';

@Injectable()
export class ShoppingListService {

    constructor(
        private http: HttpClient,
        private authorizationService: AuthorizationService,
        private log: Logger) { }

    getShoppingLists(): Promise<ShoppingList[]> {
      return this.http.get('/shopping-list')
        .then(response => response.json() as ShoppingList[])
        .catch(response => this.handleError(response));
    }

    getItems(shoppinglistId: string): Promise<ShoppingListItem[]> {
      return this.http.get(this.basePath(shoppinglistId))
        .then(response => response.json() as ShoppingListItem[])
        .catch(response => this.handleError(response));
    }

    partitionShoppingList(shoppinglistId: string): Promise<ShoppingListItem[][]> {
      const unreadshoppingList: ShoppingListItem[] = [];
      const readShoppingList: ShoppingListItem[] = [];
      return this.getItems(shoppinglistId).then(items => items.forEach(item => {
        if (item.checked) {
          readShoppingList.push(item);
        } else {
          unreadshoppingList.push(item);
        }
      })).then(() => [readShoppingList, unreadshoppingList]);
    }

    create(shoppinglistId: string, name: string, description: string, order: Number, checked: boolean): Promise<ShoppingListItem[]> {
        return this.http.post(
                this.basePath(shoppinglistId),
                JSON.stringify([{
                    name: name,
                    description: description,
                    order: order,
                    checked: checked}]))
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response));
    }

    getItem(shoppinglistId: string, id: string): Promise<ShoppingListItem> {
        const url = `${this.basePath(shoppinglistId)}/${id}`;
        return this.http.get(url)
                .then(response => response.json() as ShoppingListItem)
                .catch(response => this.handleError(response));
    }

    update(shoppinglistId: string, item: ShoppingListItem): Promise<ShoppingListItem> {
        const url = `${this.basePath(shoppinglistId)}/${item.id}`;
        return this.http.post(
                url,
                JSON.stringify(item))
                .then(() => item)
                .catch(response =>
                    this.handleError(response));
    }

    delete(shoppinglistId: string, id: string): Promise<ShoppingListItem[]> {
        const url = `${this.basePath(shoppinglistId)}/${id}`;
        return this.http.delete(url)
                .then(response => response.json() as ShoppingListItem[])
                .catch(response =>
                    this.handleError(response));
    }

    private basePath(id: string): string {
        return `/shopping-list/${id}/entries`;
    }

    handleError(error: any) {
        this.log.warn('An error occurred', error);
        return Promise.reject(error);
    }
}
