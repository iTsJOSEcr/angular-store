import {
  Injectable,
  signal,
  computed,
  effect,
  inject
} from '@angular/core';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

import { Storage as StorageService } from './storage';

import {
  calculateTotalItems,
  calculateCartTotal,
  findCartItem
} from '../utils/cart.utils';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  private storageService = inject(StorageService);

  cart = signal<CartItem[]>(
    this.storageService.get<CartItem[]>('cart') ?? []
  );

  totalItems = computed(() =>
    calculateTotalItems(this.cart())
  );

  cartTotal = computed(() =>
    calculateCartTotal(this.cart())
  );

  constructor() {
    effect(() => {
      this.storageService.save(
        'cart',
        this.cart()
      );
    });
  }

  addProduct(product: Product): void {
    const existingItem = findCartItem(
      this.cart(),
      product.id
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;

        this.cart.update(items => [...items]);
      }

      return;
    }

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

  getTotalItems(): number {
    return this.totalItems();
  }

  getQuantityInCart(product: Product): number {
    const item = findCartItem(
      this.cart(),
      product.id
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
        cartItem =>
          cartItem.product.id !== item.product.id
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
    const quantityInCart =
      this.getQuantityInCart(product);

    return product.stock - quantityInCart;
  }
}