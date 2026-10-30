
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
import { Product as ProductService } from './product';

import { CartUtils } from '../utils/cart.utils';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  private readonly storageService = inject(StorageService);
  private readonly productService = inject(ProductService);

  private readonly cartState = signal<CartItem[]>(
    this.storageService.get<CartItem[]>('cart') ?? []
  );

  readonly cart = this.cartState.asReadonly();

  readonly totalItems = computed(() =>
    CartUtils.calculateTotalItems(this.cart())
  );

  readonly cartTotal = computed(() =>
    CartUtils.calculateCartTotal(this.cart())
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
    const currentProduct =
      this.productService.getProductById(product.id);

    if (!currentProduct || !currentProduct.active) {
      return;
    }

    const existingItem = CartUtils.findCartItem(
      this.cart(),
      currentProduct.id
    );

    const currentQuantity = existingItem?.quantity ?? 0;

    if (currentQuantity >= currentProduct.stock) {
      return;
    }

    if (existingItem) {
      this.cartState.update(items =>
        CartUtils.updateQuantity(
          items,
          currentProduct.id,
          currentQuantity + 1
        )
      );

      return;
    }

    this.cartState.update(items => [
      ...items,
      {
        product: currentProduct,
        quantity: 1
      }
    ]);
  }

  getTotalItems(): number {
    return this.totalItems();
  }

  getQuantityInCart(product: Product): number {
    const item = CartUtils.findCartItem(
      this.cart(),
      product.id
    );

    return item?.quantity ?? 0;
  }

  increaseQuantity(item: CartItem): void {
    const currentProduct =
      this.productService.getProductById(item.product.id);

    if (!currentProduct || !currentProduct.active) {
      return;
    }

    const currentItem = CartUtils.findCartItem(
      this.cart(),
      currentProduct.id
    );

    if (!currentItem || currentItem.quantity >= currentProduct.stock) {
      return;
    }

    this.cartState.update(items =>
      CartUtils.updateQuantity(
        items,
        currentProduct.id,
        currentItem.quantity + 1
      )
    );
  }

  decreaseQuantity(item: CartItem): void {
    const currentItem = CartUtils.findCartItem(
      this.cart(),
      item.product.id
    );

    if (!currentItem || currentItem.quantity <= 1) {
      return;
    }

    this.cartState.update(items =>
      CartUtils.updateQuantity(
        items,
        currentItem.product.id,
        currentItem.quantity - 1
      )
    );
  }

  removeProduct(item: CartItem): void {
    this.cartState.update(items =>
      CartUtils.removeCartItem(
        items,
        item.product.id
      )
    );
  }

  clearCart(): void {
    this.cartState.set([]);
  }

  getCartTotal(): number {
    return this.cartTotal();
  }

  getAvailableStock(product: Product): number {
    const currentProduct =
      this.productService.getProductById(product.id);

    if (!currentProduct || !currentProduct.active) {
      return 0;
    }

    const quantityInCart =
      this.getQuantityInCart(currentProduct);

    return Math.max(
      0,
      currentProduct.stock - quantityInCart
    );
  }
}
