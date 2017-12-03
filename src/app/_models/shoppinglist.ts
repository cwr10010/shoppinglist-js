export class ShoppingListItem {
    id: string;
    name: string;
    description: string;
    order: number;
    checked: boolean;
}

export class ShoppingList {

  constructor(shoppingListId: string, shoppingListName: string, ownerId: string, ownerName: string) {
    this.shopping_list_id = shoppingListId;
    this.shopping_list_name = shoppingListName;
    this.owners_id = ownerId;
    this.owners_name = ownerName;
  }

  shopping_list_id: string;
  shopping_list_name: string;
  owners_id: string;
  owners_name: string;
}
