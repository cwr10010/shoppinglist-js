import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { ShoppingListService } from '../_services/shoppinglist.service';
import { LocalStorageService } from '../_services/local-storage.service';
import { ShoppingListItem } from '../_models/shoppinglist';

const CURRENT_SHOPPING_LIST_ID = 'X-SLS-SHOPPINGLIST';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: [
        './item-details.component.css'
    ]
})
export class ItemDetailsComponent implements OnInit {

    @Input() item: ShoppingListItem;

    shoppingListId: string;

    constructor(
            private shoppingListService: ShoppingListService,
            private route: ActivatedRoute,
            private localStorage: LocalStorageService,
            private location: Location) { }

    ngOnInit(): void {
      this.route.paramMap
          .switchMap((params: ParamMap) => this.loadShoppingListId(params.get('id')))
          .subscribe(item => this.item = item);
    }

    loadShoppingListId(itemId) {
      this.shoppingListId = this.localStorage.read(CURRENT_SHOPPING_LIST_ID);
      return this.shoppingListService.getItem(this.shoppingListId, itemId);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.shoppingListService.update(this.shoppingListId, this.item)
            .then(() => this.goBack());
    }

  }
