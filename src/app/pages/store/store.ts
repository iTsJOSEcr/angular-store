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
  selectedCategory = signal('Todos');

categories = [
  'Todos',
  'Computadoras',
  'Periféricos',
  'Monitores',
  'Audio',
  'Componentes',
  'Accesorios',
  'Redes',
  'Muebles'
];

selectedPrice = signal('Todos');

priceRanges = [
  'Todos',
  'Menos de ₡30,000',
  '₡30,000 - ₡60,000',
  '₡60,000 - ₡150,000',
  'Más de ₡150,000'
];


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
  const category = this.selectedCategory();
  const price = this.selectedPrice();

  return this.products.filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);

    const matchesCategory =
      category === 'Todos' ||
      product.category === category;

    let matchesPrice = true;

    if (price === 'Menos de ₡30,000') {
      matchesPrice = product.price < 30000;
    }

    if (price === '₡30,000 - ₡60,000') {
      matchesPrice =
        product.price >= 30000 &&
        product.price <= 60000;
    }

    if (price === '₡60,000 - ₡150,000') {
      matchesPrice =
        product.price > 60000 &&
        product.price <= 150000;
    }

    if (price === 'Más de ₡150,000') {
      matchesPrice = product.price > 150000;
    }

    return matchesSearch &&
           matchesCategory &&
           matchesPrice;
  });
});


}
