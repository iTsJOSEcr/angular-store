import { Component } from '@angular/core';
import { ProductCard,  } from './components/product-card/product-card';
import { Product } from './models/product.model';
import { CartItem } from './models/cart-item.model';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [ProductCard, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  products: Product[] = [
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

  cart: CartItem[] = [];


 handleAddToCart(product: Product): void {
  const existingItem = this.cart.find(
    item => item.product.id === product.id
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.cart.push({
      product,
      quantity: 1
    });
  }

  console.log(this.cart);
}

getTotalItems(): number {
  return this.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

increaseQuantity(item: CartItem): void {
  item.quantity++;
}

decreaseQuantity(item: CartItem): void {
  if (item.quantity > 1) {
    item.quantity--;
  }
}


removeFromCart(item: CartItem): void {
  this.cart = this.cart.filter(
    cartItem => cartItem.product.id !== item.product.id
  );
}

getCartTotal(): number {
  return this.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}

}



