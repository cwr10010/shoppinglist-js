import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShoppingListItem } from '../_models/shoppinglist';
import { ShoppingListService } from '../_services/shoppinglist.service';
import { AuthorizationService } from '../_services/authorization.service';
import { LocalStorageService } from '../_services/local-storage.service';

import { Logger } from '../_helpers/logging';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      './dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {

    shoppingList: ShoppingListItem[];
    readShoppingList: ShoppingListItem[];
    selectedItem: ShoppingListItem;

    step: number = -1;

    constructor(private shoppingListService: ShoppingListService,
      private authorizationService: AuthorizationService,
      private router: Router,
      private localStorage: LocalStorageService,
      private log: Logger) {
      this.step = this.localStorage.read(ACRORDEON_POSITION);
    }

    ngOnInit(): void {
      this.initShoppingList();
    }

    isExpanded(item: ShoppingListItem): boolean {
      if (this.localStorage.read(ACRORDEON_POSITION)) {
        this.step = this.localStorage.read(ACRORDEON_POSITION);
      }
      return this.step === item.order;
    }

    initShoppingList(): void {
      this.shoppingListService
        .partitionShoppingList()
        .then((itemTuple: ShoppingListItem[][]) => {
          this.readShoppingList = itemTuple[0];
          this.shoppingList = itemTuple[1];
        }
      );
    }

    onOpen(item: ShoppingListItem): void {
      this.step = item.order;
      this.selectedItem = item;
      this.localStorage.store(ACRORDEON_POSITION, this.step);
    }

    onClose(item: ShoppingListItem): void {
      if (item.order === this.step) {
        this.step = -1;
        this.selectedItem = undefined;
        this.localStorage.remove(ACRORDEON_POSITION);
      }
    }

    gotoDetail(): void {
      this.router.navigate(['/details', this.selectedItem.id]);
    }

    itemIsChecked(item: ShoppingListItem): boolean {
      this.log.info('Item is read: ' + item.checked);
      return item.checked;
    }

    itemChange(item: ShoppingListItem) {
      this.shoppingListService.update(item)
        .then(() => this.log.info('Items checked: ' + item.checked))
        .then(() => this.initShoppingList());
    }

    addItem(name: string) {
      let max = 0;
      this.shoppingListService.getItems().then(items =>
          items.map(item => {
            max = Math.max(item.order, max);
          }))
        .then(() => this.shoppingListService.create(name, '', max + 1, false)
        .then(items => this.initShoppingList()));
    }

    deleteItem(item: ShoppingListItem) {
      this.shoppingListService.delete(item.id)
        .then(items => this.initShoppingList());
    }

    doLogout(): Promise<boolean> {
        return this.authorizationService.logout()
          .then(() => this.router.navigate(['/login']));
    }
}

const ACRORDEON_POSITION = 'X-SLS-ARCORDEONPOSITION';
