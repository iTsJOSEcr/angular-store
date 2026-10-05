import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';

import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';
import { Auth as AuthService } from '../../services/auth';

import { filterAndSortProducts } from '../../utils/product.utils';

import {
  PRODUCT_CATEGORIES,
  PRICE_RANGES,
  SORT_OPTIONS
} from '../../constants/product.constants';

@Component({
  selector: 'app-store',
  imports: [ProductCard, RouterLink],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {

  cartService = inject(CartService);
  productService = inject(ProductService);
  authService = inject(AuthService);
  router = inject(Router);

  products = this.productService.getProducts();

  searchTerm = signal('');
  selectedCategory = signal('Todos');
  selectedPrice = signal('Todos');
  selectedSort = signal('default');

  purchaseSuccess = signal(
    history.state.purchaseSuccess === true
  );

  categories = PRODUCT_CATEGORIES;
  priceRanges = PRICE_RANGES;
  sortOptions = SORT_OPTIONS;

  filteredProducts = computed(() => {
    return filterAndSortProducts(
      this.products,
      this.searchTerm(),
      this.selectedCategory(),
      this.selectedPrice(),
      this.selectedSort()
    );
  });

  constructor() {
    if (this.purchaseSuccess()) {
      setTimeout(() => {
        this.purchaseSuccess.set(false);
      }, 3000);
    }
  }

  handleAddToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}