import { Component, signal } from '@angular/core';
import { ProductCard } from './components/product-card/product-card';

@Component({
  selector: 'app-root',
  imports: [ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-store');
}

