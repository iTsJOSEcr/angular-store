import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  cart = signal<CartItem[]>(this.loadCart());

  totalItems = computed(() =>
    this.cart().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  cartTotal = computed(() =>
    this.cart().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  );

  addProduct(product: Product): void {
    const existingItem = this.cart().find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;

        this.cart.update(items => [...items]);
      }
    } else {
      if (product.stock > 0) {
        this.cart.update(items => [
          ...items,
          {
            product,
            quantity: 1
          }
        ]);
      }
    }
  }

  getTotalItems(): number {
    return this.totalItems();
  }

  getQuantityInCart(product: Product): number {
    const item = this.cart().find(
      item => item.product.id === product.id
    );

    return item?.quantity ?? 0;
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.product.stock) {
      item.quantity++;

      this.cart.update(items => [...items]);
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;

      this.cart.update(items => [...items]);
    }
  }

  removeProduct(item: CartItem): void {
    this.cart.update(items =>
      items.filter(
        cartItem => cartItem.product.id !== item.product.id
      )
    );
  }

  clearCart(): void {
    this.cart.set([]);
  }

  getCartTotal(): number {
    return this.cartTotal();
  }

  getAvailableStock(product: Product): number {
  const quantityInCart = this.getQuantityInCart(product);

  return product.stock - quantityInCart;
}


constructor() {
  effect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(this.cart())
    );
  });
}


private loadCart(): CartItem[] {
  const savedCart = localStorage.getItem('cart');

  if (!savedCart) {
    return [];
  }

  return JSON.parse(savedCart);
}


}