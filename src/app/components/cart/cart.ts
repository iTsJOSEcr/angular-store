import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { Cart as CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  cartService = inject(CartService);

  get cart(): CartItem[] {
    return this.cartService.cart();
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeProduct(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }
}