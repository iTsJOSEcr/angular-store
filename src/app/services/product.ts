import { Injectable } from '@angular/core';
import { Product as ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Product {

  products: ProductModel[] = [
    {
      id: 1,
      name: 'Laptop ASUS',
      description: 'Laptop para trabajo y estudio',
      price: 450000,
      stock: 10,
      imageUrl: '/images/products/laptop-asus.jpg',
      active: true
    },
    {
      id: 2,
      name: 'Mouse Logitech',
      description: 'Mouse inalámbrico',
      price: 25000,
      stock: 20,
      imageUrl: '/images/products/mouse-logitech.jpg',
      active: true
    }
  ];

  getProducts(): ProductModel[] {
    return this.products;
  }

  getProductById(id: number): ProductModel | undefined {
    return this.products.find(
      product => product.id === id
    );
  }
}
