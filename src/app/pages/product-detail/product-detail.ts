import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe, Location } from '@angular/common';
import { Product } from '../../models/product.model';
import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  imports: [DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  route = inject(ActivatedRoute);
  location = inject(Location);

  cartService = inject(CartService);
  productService = inject(ProductService);

  product?: Product;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product = this.productService.getProductById(id);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addProduct(this.product);
    }
  }

  getQuantityInCart(): number {
    if (!this.product) {
      return 0;
    }

    return this.cartService.getQuantityInCart(this.product);
  }

  getAvailableStock(): number {
    if (!this.product) {
      return 0;
    }

    return this.cartService.getAvailableStock(this.product);
  }

  goBack(): void {
    this.location.back();
  }
}