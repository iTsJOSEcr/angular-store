import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product.model';
import { Cart as CartService } from '../../services/cart';
import { Product as ProductService } from '../../services/product';

@Component({
  selector: 'app-store',
  imports: [ProductCard, RouterLink],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {

  cartService = inject(CartService);
  productService = inject(ProductService);

  products = this.productService.getProducts();
  searchTerm = signal('');

  handleAddToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  getQuantityInCart(product: Product): number {
    return this.cartService.getQuantityInCart(product);
  }


  filteredProducts = computed(() => {
  const term = this.searchTerm().toLowerCase().trim();

  if (!term) {
    return this.products;
  }

  return this.products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
});


}
