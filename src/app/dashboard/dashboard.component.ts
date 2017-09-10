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

    step:number = 0;

    constructor(private shoppingListService: ShoppingListService,
      private authorizationService: AuthorizationService,
      private router: Router,
      private localStorage: LocalStorageService) {
      this.step = this.localStorage.read("acrpos");
    }

    ngOnInit(): void {
      this.initShoppingList();
    }

    isExpanded(item: ShoppingListItem): boolean {
      this.step = this.localStorage.read("acrpos");
      var is_expanded = this.step == item.order;
      return is_expanded;
    }

    initShoppingList(): void {
        this.shoppingListService.getItems().then(shoppingList => this.shoppingList = shoppingList);
    }

    onSelect(item: ShoppingListItem): void {
        this.step = item.order;
        this.selectedItem = item;
        this.localStorage.store("acrpos", this.step);
    }

    gotoDetail(): void {
      this.router.navigate(['/details', this.selectedItem.id]);
    }

    doLogout(): Promise<boolean> {
        return this.authorizationService.logout()
          .then(() => this.router.navigate(['/login']));
    }
}
