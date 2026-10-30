
import {
  Injectable,
  signal,
  effect,
  inject
} from '@angular/core';

import { Order as OrderModel } from '../models/order.model';
import { Storage as StorageService } from './storage';

import { OrderUtils } from '../utils/order.utils';
import { OrderMigrationUtils } from '../utils/order-migration.utils';

@Injectable({
  providedIn: 'root',
})
export class Order {

  private readonly storageService = inject(StorageService);

  private readonly ordersState = signal<OrderModel[]>(
    OrderMigrationUtils.migrateOrders(
      this.storageService.get<
        Parameters<typeof OrderMigrationUtils.migrateOrders>[0]
      >('orders') ?? []
    )
  );

  readonly orders = this.ordersState.asReadonly();

  constructor() {
    effect(() => {
      this.storageService.save(
        'orders',
        this.orders()
      );
    });
  }

  addOrder(order: OrderModel): void {
    this.ordersState.update(orders => [
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

