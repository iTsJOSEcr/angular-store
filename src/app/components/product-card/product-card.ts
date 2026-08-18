import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
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
    imageUrl: 'https://via.placeholder.com/300',
    active: true
  };
}