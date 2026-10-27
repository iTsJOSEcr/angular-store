
import { Component, inject, computed } from '@angular/core';

import { RouterLink } from '@angular/router';

import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';

import { Product as ProductService } from '../../services/product';
import { Favorite as FavoriteService } from '../../services/favorite';
import { Cart as CartService } from '../../services/cart';

import { FavoriteUtils } from '../../utils/favorite.utils';

@Component({
  selector: 'app-favorites',
  imports: [ProductCard, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {

  productService = inject(ProductService);
  favoriteService = inject(FavoriteService);
  cartService = inject(CartService);

  products = this.productService.getProducts();

  favoriteProducts = computed(() => {
    const favoriteIds = this.favoriteService.favoriteIds();

    return this.products.filter(product =>
      FavoriteUtils.isFavorite(favoriteIds, product.id)
    );
  });

  handleRemoveFavorite(productId: number): void {
    this.favoriteService.removeFavorite(productId);
  }

  handleAddToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }
}

