import { Injectable, inject, signal } from '@angular/core';

import { Product as ProductModel } from '../models/product.model';
import { Storage as StorageService } from './storage';
import { DEFAULT_PRODUCTS } from '../data/product.data';

@Injectable({
  providedIn: 'root',
})
export class Product {

  private readonly storageService = inject(StorageService);

  private readonly productsState = signal<ProductModel[]>(
    this.storageService.get<ProductModel[]>('products')
      ?? DEFAULT_PRODUCTS.map(product => ({ ...product }))
  );

  readonly products = this.productsState.asReadonly();

  getProducts(): ProductModel[] {
    return this.productsState();
  }

  getProductById(id: number): ProductModel | undefined {
    return this.productsState().find(
      product => product.id === id
    );
  }

  updateStock(productId: number, quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return;
    }

    const product = this.getProductById(productId);

    if (!product || product.stock < quantity) {
      return;
    }

    this.productsState.update(products =>
      products.map(currentProduct =>
        currentProduct.id === productId
          ? {
              ...currentProduct,
              stock: currentProduct.stock - quantity
            }
          : currentProduct
      )
    );

    this.storageService.save(
      'products',
      this.productsState()
    );
  }
}