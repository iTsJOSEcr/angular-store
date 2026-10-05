import { Injectable, inject } from '@angular/core';

import { Product as ProductModel } from '../models/product.model';
import { Storage as StorageService } from './storage';
import { DEFAULT_PRODUCTS } from '../data/product.data';

@Injectable({
  providedIn: 'root',
})
export class Product {

  private storageService = inject(StorageService);

  products: ProductModel[] =
    this.storageService.get<ProductModel[]>('products')
    ?? DEFAULT_PRODUCTS;

  getProducts(): ProductModel[] {
    return this.products;
  }

  getProductById(id: number): ProductModel | undefined {
    return this.products.find(
      product => product.id === id
    );
  }

  updateStock(
    productId: number,
    quantity: number
  ): void {
    const product = this.getProductById(productId);

    if (!product) {
      return;
    }

    product.stock -= quantity;

    this.storageService.save(
      'products',
      this.products
    );
  }
}