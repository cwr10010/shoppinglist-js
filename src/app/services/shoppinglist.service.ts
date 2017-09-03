import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { LoggingService } from './logging.service';
import { ShoppingListItem } from '../model/shoppinglist';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from './http-client.module';

@Injectable()
export class ShoppingListService {

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService,
        private log: LoggingService) { }

    getItems(): Promise<ShoppingListItem[]> {
        return this.http.get(this.basePath(), true)
                .toPromise()
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response));
    }

    create(name: string, description: string, order: Number, read: boolean): Promise<ShoppingListItem[]> {
        return this.http.post(
                this.basePath(),
                JSON.stringify([{
                    name: name,
                    description: description,
                    order: order,
                    read: read}]),
                true)
                .toPromise()
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response));
    }

    getItem(id: string): Promise<ShoppingListItem> {
        const url = `${this.basePath()}/${id}`;
        return this.http.get(url, true)
                .toPromise()
                .then(response => response.json() as ShoppingListItem)
                .catch(response => this.handleError(response));
    }

    update(item: ShoppingListItem): Promise<ShoppingListItem> {
        const url = `${this.basePath()}/${item.id}`
        return this.http.post(url, JSON.stringify(item), true)
                .toPromise()
                .then(() => item)
                .catch(response => this.handleError(response));
    }

    delete(id: string): Promise<void> {
        const url = `${this.basePath()}/${id}`;
        return this.http.delete(url, true)
                .toPromise()
                .then(() => null)
                .catch(response => this.handleError(response));
    }

    private basePath(): string {
        return `/users/${this.localStorage.readUserId()}/shopping-list`;
    }

    private handleError(error: any): Promise<any> {
        switch (error.status) {
            case 401:
            case 403:
                this.log.debug('reset token', error);
                this.localStorage.resetToken();
                return Promise.all([])
            default:
                this.log.warn('An error occurred', error);
                return Promise.reject(error);
        }
    }
}
