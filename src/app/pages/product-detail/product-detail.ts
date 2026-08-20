import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  route = inject(ActivatedRoute);
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
}
