import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  cart: CartItem[] = [];

  addProduct(product: Product): void {
    const existingItem = this.cart.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      }
    } else {
      if (product.stock > 0) {
        this.cart.push({
          product,
          quantity: 1
        });
      }
    }
  }

  getTotalItems(): number {
    return this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  getQuantityInCart(product: Product): number {
    const item = this.cart.find(
      item => item.product.id === product.id
    );

    return item?.quantity ?? 0;
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.product.stock) {
      item.quantity++;
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeProduct(item: CartItem): void {
    this.cart = this.cart.filter(
      cartItem => cartItem.product.id !== item.product.id
    );
  }

  clearCart(): void {
    this.cart = [];
  }

  getCartTotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}