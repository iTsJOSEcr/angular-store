
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';

import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';
import { Auth as AuthService } from '../../services/auth';
import { Favorite as FavoriteService } from '../../services/favorite';

import { ProductUtils } from '../../utils/product.utils';
import { FavoriteUtils } from '../../utils/favorite.utils';

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
  favoriteService = inject(FavoriteService);
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
    const products = ProductUtils.filterProducts(
      this.products,
      this.searchTerm(),
      this.selectedCategory(),
      this.selectedPrice()
    );

    return ProductUtils.sortProducts(
      products,
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

  isFavorite(productId: number): boolean {
    return FavoriteUtils.isFavorite(
      this.favoriteService.favoriteIds(),
      productId
    );
  }

  handleToggleFavorite(productId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.isFavorite(productId)) {
      this.favoriteService.removeFavorite(productId);
    } else {
      this.favoriteService.addFavorite(productId);
    }
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


