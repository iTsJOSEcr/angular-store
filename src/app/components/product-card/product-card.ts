import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
 imports: [DecimalPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})


export class ProductCard {
    product = input.required<Product>();

    addToCart = output<Product>();
    quantityInCart = input<number>(0);
}