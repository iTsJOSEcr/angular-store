import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';
import { Order as OrderService } from '../../services/order';
import { Auth as AuthService } from '../../services/auth';

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
  router = inject(Router);
  orderService = inject(OrderService);
  authService = inject(AuthService);

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

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const order = {
  id: this.orderService.getNextId(),
  orderNumber: this.orderService.getNextOrderNumber(currentUser.id),
  userId: currentUser.id,
  customerName: this.checkoutForm.value.name!,
  customerEmail: this.checkoutForm.value.email!,
  address: this.checkoutForm.value.address!,
  items: [...this.cartService.cart()],
  total: this.cartService.cartTotal(),
  date: new Date().toLocaleString()
};

    this.orderService.addOrder(order);

    this.cartService.cart().forEach(item => {
      this.productService.updateStock(
        item.product.id,
        item.quantity
      );
    });

    this.cartService.clearCart();

    this.router.navigate(['/'], {
      state: {
        purchaseSuccess: true
      }
    });
  }
}


