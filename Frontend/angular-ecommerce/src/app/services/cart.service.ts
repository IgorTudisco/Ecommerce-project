import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cardItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have a item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if (this.cardItems.length > 0) {

      // find the item in the cart based on item id
      for (let tempCartItem of this.cardItems) {

        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {

      // increment the quantity
      existingCartItem.quantity++;

    } else {

      // just add item in to a array
      this.cardItems.push(theCartItem);

    }

    // computer cart total price and total quantity
    this.computeCartTotal();
  }

  computeCartTotal() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cardItems) {

      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;

      totalQuantityValue += currentCartItem.quantity;

    }

    // publish the new values... all subscribers will receives the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log("Contents of the cart");
    for (let tempCartItem of this.cardItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`)
    }

    // toFixed(2): It is used to fix two decimal places.
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log("-----")

  }

}
