import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { ShoppingListItem } from '../model/shoppinglist';
import { LoggingService } from './logging.service';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from './http-client.module';

@Injectable()
export class ShoppingListService {

    constructor(
        private http: HttpClient,
        private authorizationService: AuthorizationService,
        private log: LoggingService) { }

    getItems(): Promise<ShoppingListItem[]> {
        return this.http.get(this.basePath())
                .toPromise()
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response, this.http.get(this.basePath())));
    }

    create(name: string, description: string, order: Number, read: boolean): Promise<ShoppingListItem[]> {
        return this.http.post(
                this.basePath(),
                JSON.stringify([{
                    name: name,
                    description: description,
                    order: order,
                    read: read}]))
                .toPromise()
                .then(response => response.json() as ShoppingListItem[])
                .catch(response => this.handleError(response, this.http.post(
                    this.basePath(),
                    JSON.stringify([{
                        name: name,
                        description: description,
                        order: order,
                        read: read}]))));
    }

    getItem(id: string): Promise<ShoppingListItem> {
        const url = `${this.basePath()}/${id}`;
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as ShoppingListItem)
                .catch(response => this.handleError(response, this.http.get(url)));
    }

    update(item: ShoppingListItem): Promise<ShoppingListItem> {
        const url = `${this.basePath()}/${item.id}`
        return this.http.post(
                url,
                JSON.stringify(item))
                .toPromise()
                .then(() => item)
                .catch(response =>
                    this.handleError(response, this.http.post(
                        url,
                        JSON.stringify(item))));
    }

    delete(id: string): Promise<void> {
        const url = `${this.basePath()}/${id}`;
        return this.http.delete(url)
                .toPromise()
                .then(() => null)
                .catch(response =>
                    this.handleError(response, this.http.delete(url)));
    }

    private basePath(): string {
        return '/shopping-list';
    }

    private handleError(error: any, retry: Observable<any>) {
        switch (error.status) {
            case 401:
            case 403:
                this.log.debug('refresh token', error);
                this.authorizationService.refresh();
                return retry.toPromise()
            default:
                this.log.warn('An error occurred', error);
                return Promise.reject(error);
        }
    }
}
