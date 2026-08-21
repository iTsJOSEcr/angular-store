import { Injectable } from '@angular/core';
import { Product as ProductModel } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class Product {

  private defaultProducts: ProductModel[] = [
  {
    id: 1,
    name: 'Laptop ASUS',
    description: 'Laptop para trabajo y estudio',
    price: 450000,
    stock: 10,
    imageUrl: '/images/products/laptop-asus.jpg',
    active: true,
    category: 'Computadoras'
  },
  {
    id: 2,
    name: 'Mouse Logitech',
    description: 'Mouse inalámbrico',
    price: 25000,
    stock: 20,
    imageUrl: '/images/products/mouse-logitech.jpg',
    active: true,
    category: 'Periféricos'
  },
  {
    id: 3,
    name: 'Teclado Mecánico',
    description: 'Teclado mecánico RGB para gaming',
    price: 45000,
    stock: 12,
    imageUrl: '/images/products/teclado-mecanico.jpg',
    active: true,
    category: 'Periféricos'
  },
  {
    id: 4,
    name: 'Monitor Samsung',
    description: 'Monitor Full HD de 24 pulgadas',
    price: 135000,
    stock: 8,
    imageUrl: '/images/products/monitor-samsung.jpg',
    active: true,
    category: 'Monitores'
  },
  {
    id: 5,
    name: 'Audífonos JBL',
    description: 'Audífonos inalámbricos Bluetooth',
    price: 38000,
    stock: 15,
    imageUrl: '/images/products/audifonos-jbl.jpg',
    active: true,
    category: 'Audio'
  },
  {
    id: 6,
    name: 'Webcam Logitech',
    description: 'Webcam Full HD para videollamadas',
    price: 52000,
    stock: 9,
    imageUrl: '/images/products/webcam-logitech.jpg',
    active: true,
    category: 'Periféricos'
  },
  {
    id: 7,
    name: 'SSD Kingston 1TB',
    description: 'Unidad SSD de 1TB de alta velocidad',
    price: 62000,
    stock: 14,
    imageUrl: '/images/products/ssd-kingston.jpg',
    active: true,
    category: 'Componentes'
  },
  {
    id: 8,
    name: 'Memoria RAM Corsair',
    description: 'Memoria RAM DDR4 de 16GB',
    price: 42000,
    stock: 18,
    imageUrl: '/images/products/ram-corsair.jpg',
    active: true,
    category: 'Componentes'
  },
  {
    id: 9,
    name: 'Micrófono HyperX',
    description: 'Micrófono USB para streaming y gaming',
    price: 68000,
    stock: 7,
    imageUrl: '/images/products/microfono-hyperx.jpg',
    active: true,
    category: 'Audio'
  },
  {
    id: 10,
    name: 'Silla Gamer',
    description: 'Silla ergonómica para gaming y oficina',
    price: 145000,
    stock: 6,
    imageUrl: '/images/products/silla-gamer.jpg',
    active: true,
    category: 'Muebles'
  },
  {
    id: 11,
    name: 'Mousepad XL',
    description: 'Mousepad grande para escritorio y gaming',
    price: 15000,
    stock: 25,
    imageUrl: '/images/products/mousepad-xl.jpg',
    active: true,
    category: 'Accesorios'
  },
  {
    id: 12,
    name: 'Hub USB-C',
    description: 'Hub USB-C con múltiples puertos',
    price: 32000,
    stock: 16,
    imageUrl: '/images/products/hub-usb-c.jpg',
    active: true,
    category: 'Accesorios'
  },
  {
    id: 13,
    name: 'Bocinas Logitech',
    description: 'Sistema de bocinas estéreo para computadora',
    price: 48000,
    stock: 11,
    imageUrl: '/images/products/bocinas-logitech.jpg',
    active: true,
    category: 'Audio'
  },
  {
    id: 14,
    name: 'Router TP-Link',
    description: 'Router Wi-Fi de doble banda',
    price: 55000,
    stock: 13,
    imageUrl: '/images/products/router-tplink.jpg',
    active: true,
    category: 'Redes'
  },
  {
    id: 15,
    name: 'Base para Laptop',
    description: 'Base ajustable y ventilada para laptop',
    price: 28000,
    stock: 19,
    imageUrl: '/images/products/base-laptop.jpg',
    active: true,
    category: 'Accesorios'
  }
];

products: ProductModel[] = this.loadProducts();

private loadProducts(): ProductModel[] {
  const savedProducts = localStorage.getItem('products');

  if (!savedProducts) {
    return this.defaultProducts;
  }

  return JSON.parse(savedProducts);
}

  getProducts(): ProductModel[] {
    return this.products;
  }

  getProductById(id: number): ProductModel | undefined {
    return this.products.find(
      product => product.id === id
    );
  }


  updateStock(productId: number, quantity: number): void {
  const product = this.products.find(
    product => product.id === productId
  );

  if (!product) {
    return;
  }

  product.stock -= quantity;

  localStorage.setItem(
    'products',
    JSON.stringify(this.products)
  );
}


}
