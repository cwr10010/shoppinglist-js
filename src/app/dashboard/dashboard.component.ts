import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShoppingListItem } from '../_models/shoppinglist';
import { ShoppingListService } from '../_services/shoppinglist.service';
import { AuthorizationService } from '../_services/authorization.service';
import { LocalStorageService } from '../_services/local-storage.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
      './dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {

    shoppingList: ShoppingListItem[];
    selectedItem: ShoppingListItem;

    step:number = -1;

    constructor(private shoppingListService: ShoppingListService,
      private authorizationService: AuthorizationService,
      private router: Router,
      private localStorage: LocalStorageService) {
      this.step = this.localStorage.read(ACRORDEON_POSITION);
    }

    ngOnInit(): void {
      this.initShoppingList();
    }

    isExpanded(item: ShoppingListItem): boolean {
      if (this.localStorage.read(ACRORDEON_POSITION)) {
        this.step = this.localStorage.read(ACRORDEON_POSITION);
      }
      var is_expanded = this.step == item.order;
      return is_expanded;
    }

    initShoppingList(): void {
      this.shoppingListService.getItems().then(shoppingList => this.shoppingList = shoppingList);
    }

    onOpen(item: ShoppingListItem): void {
      this.step = item.order;
      this.selectedItem = item;
      this.localStorage.store(ACRORDEON_POSITION, this.step);
    }

    onClose(item: ShoppingListItem): void {
      if (item.order == this.step) {
        this.step = -1;
        this.selectedItem = undefined;
        this.localStorage.remove(ACRORDEON_POSITION);
      }
    }

    gotoDetail(): void {
      this.router.navigate(['/details', this.selectedItem.id]);
    }

    doLogout(): Promise<boolean> {
        return this.authorizationService.logout()
          .then(() => this.router.navigate(['/login']));
    }
}

const ACRORDEON_POSITION: string = "X-SLS-ARCORDEONPOSITION"
