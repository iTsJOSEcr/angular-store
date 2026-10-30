
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

  private readonly productService = inject(ProductService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly cartService = inject(CartService);

  readonly favoriteProducts = computed(() => {
    const favoriteIds = this.favoriteService.favoriteIds();
    const products = this.productService.products();

    return products.filter(product =>
      product.active &&
      FavoriteUtils.isFavorite(favoriteIds, product.id)
    );
  });

  handleRemoveFavorite(productId: number): void {
    this.favoriteService.removeFavorite(productId);
  }

  handleAddToCart(product: Product): void {
    if (!product.active) {
      return;
    }

    this.cartService.addProduct(product);
  }

  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }
}

