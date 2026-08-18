import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product: Product = {
    id: 1,
    name: 'Laptop ASUS',
    description: 'Laptop para trabajo y estudio',
    price: 450000,
    stock: 10,
    imageUrl: '/images/products/laptop-asus.jpg',
    active: true
  };
}