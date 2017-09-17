import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ShoppingListItem } from '../_models/shoppinglist';
import { ShoppingListItemSearchService } from '../_services/item-search.service';
import { Logger } from '../_helpers/logging';

@Component({
    selector: 'item-search',
    templateUrl: './item-search.component.html',
    styleUrls: [
        './item-search.component.css'
    ]
})
export class ShoppingListItemSearchComponent implements OnInit {

    shoppinglist: Observable<ShoppingListItem[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private itemSearchService: ShoppingListItemSearchService,
        private router: Router,
        private log: Logger) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this .shoppinglist = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term ? this.itemSearchService.search(term) : Observable.of<ShoppingListItem[]>([]))
            .catch(error => {
                this.log.warn(error);
                return Observable.of<ShoppingListItem[]>([]);
            })
    }

    gotoDetails(item: ShoppingListItem): void {
        let link = ['/details', item.id];
        this.router.navigate(link);
    }
}
