
import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe, Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);

  private readonly paramMap = toSignal(
    this.route.paramMap,
    { initialValue: this.route.snapshot.paramMap }
  );

  readonly product = computed(() => {
    const id = Number(this.paramMap()?.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      return undefined;
    }

    return this.productService.products().find(
      product => product.id === id
    );
  });

  addToCart(): void {
    const product = this.product();

    if (product && product.active) {
      this.cartService.addProduct(product);
    }
  }

  getQuantityInCart(): number {
    const product = this.product();

    if (!product) {
      return 0;
    }

    return this.cartService.getQuantityInCart(product);
  }

  getAvailableStock(): number {
    const product = this.product();

    if (!product || !product.active) {
      return 0;
    }

    return this.cartService.getAvailableStock(product);
  }

  goBack(): void {
    this.location.back();
  }
}


