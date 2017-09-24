import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { ShoppingListItem } from '../_models/shoppinglist';
import { Logger } from '../_helpers/logging';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from '../_helpers/http-client';

@Injectable()
export class ShoppingListService {

    constructor(
        private http: HttpClient,
        private authorizationService: AuthorizationService,
        private log: Logger) { }

    getItems(): Promise<ShoppingListItem[]> {
        return this.http.get(this.basePath())
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response));
    }

    partitionShoppingList(): Promise<ShoppingListItem[][]> {
      const unreadshoppingList: ShoppingListItem[] = [];
      const readShoppingList: ShoppingListItem[] = [];
      return this.getItems().then(items => items.forEach(item => {
        if (item.checked) {
          readShoppingList.push(item);
        } else {
          unreadshoppingList.push(item);
        }
      })).then(() => [readShoppingList, unreadshoppingList]);
    }

    create(name: string, description: string, order: Number, checked: boolean): Promise<ShoppingListItem[]> {
        return this.http.post(
                this.basePath(),
                JSON.stringify([{
                    name: name,
                    description: description,
                    order: order,
                    checked: checked}]))
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response));
    }

    getItem(id: string): Promise<ShoppingListItem> {
        const url = `${this.basePath()}/${id}`;
        return this.http.get(url)
                .then(response => response.json() as ShoppingListItem)
                .catch(response => this.handleError(response));
    }

    update(item: ShoppingListItem): Promise<ShoppingListItem> {
        const url = `${this.basePath()}/${item.id}`;
        return this.http.post(
                url,
                JSON.stringify(item))
                .then(() => item)
                .catch(response =>
                    this.handleError(response));
    }

    delete(id: string): Promise<ShoppingListItem[]> {
        const url = `${this.basePath()}/${id}`;
        return this.http.delete(url)
                .then(response => response.json() as ShoppingListItem[])
                .catch(response =>
                    this.handleError(response));
    }

    private basePath(): string {
        return '/shopping-list';
    }

    private handleError(error: any) {
        switch (error.status) {
            case 401:
            case 403:
                this.log.debug('refresh token', error);
                this.authorizationService.refresh();
                break;
            default:
                this.log.warn('An error occurred', error);
                return Promise.reject(error);
        }
    }
}
