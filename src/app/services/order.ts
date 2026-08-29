import { Injectable, signal, effect } from '@angular/core';
import { Order as OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class Order {

  orders = signal<OrderModel[]>(this.loadOrders());

  constructor() {
    effect(() => {
      localStorage.setItem(
        'orders',
        JSON.stringify(this.orders())
      );
    });
  }

  addOrder(order: OrderModel): void {
    this.orders.update(orders => [
      ...orders,
      order
    ]);
  }

  getNextId(): number {
    if (this.orders().length === 0) {
      return 1;
    }

    return Math.max(
      ...this.orders().map(order => order.id)
    ) + 1;
  }

  private loadOrders(): OrderModel[] {
    const savedOrders = localStorage.getItem('orders');

    if (!savedOrders) {
      return [];
    }

    return JSON.parse(savedOrders);
  }
}