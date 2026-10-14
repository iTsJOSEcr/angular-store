import {
  Injectable,
  signal,
  effect,
  inject
} from '@angular/core';

import { Order as OrderModel } from '../models/order.model';
import { Storage as StorageService } from './storage';
import { OrderUtils } from '../utils/order.utils';

@Injectable({
  providedIn: 'root',
})
export class Order {

  private storageService = inject(StorageService);

  orders = signal<OrderModel[]>(
    this.storageService.get<OrderModel[]>('orders') ?? []
  );

  constructor() {
    effect(() => {
      this.storageService.save(
        'orders',
        this.orders()
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
    return OrderUtils.calculateNextId(
      this.orders()
    );
  }

  getNextOrderNumber(userId: number): number {
    return OrderUtils.calculateNextOrderNumber(
      this.orders(),
      userId
    );
  }
}
