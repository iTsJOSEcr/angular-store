import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';
import { Order as OrderService } from '../../services/order';
import { Auth as AuthService } from '../../services/auth';

import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private formBuilder = inject(FormBuilder);

  cartService = inject(CartService);
  productService = inject(ProductService);
  orderService = inject(OrderService);
  authService = inject(AuthService);
  router = inject(Router);

  checkoutForm = this.formBuilder.group({
    name: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    address: ['', Validators.required]
  });

  submitOrder(): void {
    if (!this.isFormValid()) {
      return;
    }

    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const order = this.createOrder(currentUser);

    this.processOrder(order);
    this.finishCheckout();
  }

  private isFormValid(): boolean {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return false;
    }

    return true;
  }

  private createOrder(currentUser: User): Order {
    return {
      id: this.orderService.getNextId(),
      orderNumber:
        this.orderService.getNextOrderNumber(currentUser.id),
      userId: currentUser.id,
      customerName: this.checkoutForm.value.name!,
      customerEmail: this.checkoutForm.value.email!,
      address: this.checkoutForm.value.address!,
      items: [...this.cartService.cart()],
      total: this.cartService.cartTotal(),
      date: new Date().toLocaleString()
    };
  }

  private processOrder(order: Order): void {
    this.orderService.addOrder(order);

    this.updateProductStock();
  }

  private updateProductStock(): void {
    this.cartService.cart().forEach(item => {
      this.productService.updateStock(
        item.product.id,
        item.quantity
      );
    });
  }

  private finishCheckout(): void {
    this.cartService.clearCart();

    this.router.navigate(['/'], {
      state: {
        purchaseSuccess: true
      }
    });
  }
}