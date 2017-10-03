import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DragulaService, DragulaDirective } from 'ng2-dragula';

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

    step = -1;

    readItemsVisible = false;

    constructor(private shoppingListService: ShoppingListService,
      private authorizationService: AuthorizationService,
      private router: Router,
      private localStorage: LocalStorageService,
      private dragulaService: DragulaService,
      private log: Logger) {
      this.step = this.localStorage.read(ACRORDEON_POSITION);
    }

    ngOnInit(): void {
      this.initShoppingList().then(() => {});
      this.dragulaService.setOptions('shoppinglist-bag', {
        moves: function (el, container, handle) {
          return handle.className.includes('item-drag-handle');
        }
      });
      this.dragulaService.dropModel.subscribe( () => this.onDrop() );
    }

    onSwipe(event: Event): void {
      event.preventDefault();
    }

    onDrop() {
        const listToBeSent = this.shoppingList.concat(this.readShoppingList);
        let position = 1;
        listToBeSent.forEach (
          item => {
            item.order = position++;
            this.shoppingListService.update(item);
          }
        );
        this.log.info(`updated shopping list: ${listToBeSent}`);
    }
    isExpanded(item: ShoppingListItem): boolean {
      if (this.localStorage.read(ACRORDEON_POSITION)) {
        this.step = this.localStorage.read(ACRORDEON_POSITION);
      }
      return this.step === item.order;
    }

    toggleReadItems() {
      this.readItemsVisible = !this.readItemsVisible;
    }

    initShoppingList(): Promise<any> {
      return this.shoppingListService
        .partitionShoppingList()
        .then((itemTuple: ShoppingListItem[][]) => {
          this.readShoppingList = itemTuple[0];
          this.shoppingList = itemTuple[1];
        }
      );
    }

    onOpen(item: ShoppingListItem): void {
      this.step = item.order;
      this.localStorage.store(ACRORDEON_POSITION, this.step);
    }

    onClose(item: ShoppingListItem): void {
      if (item.order === this.step) {
        this.step = -1;
        this.localStorage.remove(ACRORDEON_POSITION);
      }
    }

    gotoDetail(item: ShoppingListItem): void {
      this.router.navigate(['/details', item.id]);
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
