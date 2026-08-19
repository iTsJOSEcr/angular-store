import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})


export class ProductCard {
    product = input.required<Product>();
    
    addToCart = output<Product>();
}