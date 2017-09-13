import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ShoppingListItem } from '../_models/shoppinglist';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from '../_helpers/http-client';
import { Logger } from '../_helpers/logging';

@Injectable()
export class ShoppingListItemSearchService {

    constructor(
        private http: HttpClient,
        private authorizationService: AuthorizationService,
        private log: Logger) { }

    search(term: string): Promise<ShoppingListItem[]> {
        this.log.info(`Search for term:  ${term}`);
        return this.http.get(`/shopping-list?term=${term}`)
            .then(response => response.json() as ShoppingListItem[]);
    }
}
