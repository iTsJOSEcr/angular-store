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
    },
    {
  id: 3,
  name: 'Teclado Mecánico',
  description: 'Teclado mecánico RGB para gaming',
  price: 45000,
  stock: 12,
  imageUrl: '/images/products/teclado-mecanico.jpg',
  active: true
},
{
  id: 4,
  name: 'Monitor Samsung',
  description: 'Monitor Full HD de 24 pulgadas',
  price: 135000,
  stock: 8,
  imageUrl: '/images/products/monitor-samsung.jpg',
  active: true
},
{
  id: 5,
  name: 'Audífonos JBL',
  description: 'Audífonos inalámbricos Bluetooth',
  price: 38000,
  stock: 15,
  imageUrl: '/images/products/audifonos-jbl.jpg',
  active: true
},
{
  id: 6,
  name: 'Webcam Logitech',
  description: 'Webcam Full HD para videollamadas',
  price: 52000,
  stock: 9,
  imageUrl: '/images/products/webcam-logitech.jpg',
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
