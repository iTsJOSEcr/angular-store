import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';


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

