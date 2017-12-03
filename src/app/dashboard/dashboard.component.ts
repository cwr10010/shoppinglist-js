import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DragulaService, DragulaDirective } from 'ng2-dragula';

import { ShoppingList, ShoppingListItem } from '../_models/shoppinglist';
import { ShoppingListService } from '../_services/shoppinglist.service';
import { AuthorizationService } from '../_services/authorization.service';
import { LocalStorageService } from '../_services/local-storage.service';

import { Logger } from '../_helpers/logging';

const ACRORDEON_POSITION = 'X-SLS-ARCORDEONPOSITION';
const CURRENT_SHOPPING_LIST_ID = 'X-SLS-SHOPPINGLIST';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      './dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

    shoppingLists: ShoppingList[];
    shoppingList: ShoppingListItem[];
    readShoppingList: ShoppingListItem[];

    step = -1;

    readItemsVisible = false;

    constructor(
      private shoppingListService: ShoppingListService,
      private authorizationService: AuthorizationService,
      private router: Router,
      private route: ActivatedRoute,
      private localStorage: LocalStorageService,
      private dragulaService: DragulaService,
      private log: Logger) {
    }

    ngOnInit(): void {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.openShoppingList(params.get('shopping_list_id')))
        .subscribe(() => this.initShoppingList());
      this.step = this.localStorage.read(ACRORDEON_POSITION);
      this.dragulaService.setOptions('shoppinglist-bag', {
        moves: function (el, container, handle) {
          return handle.className.includes('item-drag-handle');
        }
      });
      this.dragulaService.dropModel.subscribe( () => this.onDrop() );
    }

    openShoppingList(shoppingListId: string): Promise<any> {
      if (!shoppingListId) {
        this.shoppingListService.getShoppingLists()
          .then(lists => this.shoppingLists = lists)
          .then(lists => lists.find(list => list.owners_id === this.authorizationService.readUserId()))
          .then(list => {
            this.localStorage.store(CURRENT_SHOPPING_LIST_ID, list.shopping_list_id);
            return this.localStorage.read(CURRENT_SHOPPING_LIST_ID);
          })
          .then((id) => this.router.navigate([id]));
      } else {
        this.shoppingListService.getShoppingLists()
          .then(lists => this.shoppingLists = lists);

        this.localStorage.store(CURRENT_SHOPPING_LIST_ID, shoppingListId);
      }
      return Promise.all([]);
    }

    ngOnDestroy(): void {
      this.dragulaService.destroy('shoppinglist-bag');
    }

    currentShoppingListId(): string {
      return this.localStorage.read(CURRENT_SHOPPING_LIST_ID);
    }

    initShoppingList(): Promise<any> {
      return this.shoppingListService
        .partitionShoppingList(this.currentShoppingListId())
        .then((itemTuple: ShoppingListItem[][]) => {
          this.readShoppingList = itemTuple[0];
          this.shoppingList = itemTuple[1];
        }
      );
    }

    onSwipe(event: any): void {
      event.gesture.stopPropagation();
    }

    onDrop() {
        const listToBeSent = this.shoppingList.concat(this.readShoppingList);
        let position = 1;
        listToBeSent.forEach (
          item => {
            item.order = position++;
            this.shoppingListService.update(this.currentShoppingListId(), item);
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

    dashboardBelongsToOwner(id: string): boolean {
      return this.authorizationService.readUserId() === id;
    }

    toggleReadItems() {
      this.readItemsVisible = !this.readItemsVisible;
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
      this.shoppingListService.update(this.currentShoppingListId(), item)
        .then(() => this.log.info('Items checked: ' + item.checked))
        .then(() => this.initShoppingList());
    }

    addItem(name: string) {
      let max = 0;
      this.shoppingListService.getItems(this.currentShoppingListId()).then(items =>
          items.map(item => {
            max = Math.max(item.order, max);
          }))
        .then(() => this.shoppingListService.create(this.currentShoppingListId(), name, '', max + 1, false)
        .then(items => this.initShoppingList()));
    }

    deleteItem(item: ShoppingListItem) {
      this.shoppingListService.delete(this.currentShoppingListId(), item.id)
        .then(items => this.initShoppingList());
    }

    doLogout(): Promise<boolean> {
      return this.authorizationService.logout()
        .then(() => this.router.navigate(['/login']));
    }
}
