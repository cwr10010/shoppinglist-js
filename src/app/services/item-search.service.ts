import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ShoppingListItem } from '../model/shoppinglist';
import { HttpClient } from './http-client.module';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ShoppingListItemSearchService {

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService) { }

    search(term: string): Observable<ShoppingListItem[]> {
        return this.http.get(`${this.basePath()}?name=${term}`, true)
            .map(response => response.json() as ShoppingListItem[]);
    }

    private basePath(): string {
        return `/users/${this.localStorage.readUserId()}/shopping-list`;
    }
}
