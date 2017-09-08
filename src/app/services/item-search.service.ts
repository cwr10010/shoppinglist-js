import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ShoppingListItem } from '../model/shoppinglist';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from './http-client.module';

@Injectable()
export class ShoppingListItemSearchService {

    constructor(
        private http: HttpClient,
        private authorizationService: AuthorizationService) { }

    search(term: string): Observable<ShoppingListItem[]> {
        return this.http.get(`/shopping-list?term=${term}`)
            .map(response => response.json() as ShoppingListItem[]);
    }
}
