import { Order } from '../models/order.model';

export class OrderUtils {

  static calculateNextId(
    orders: Order[]
  ): number {
    if (orders.length === 0) {
      return 1;
    }

    return Math.max(
      ...orders.map(order => order.id)
    ) + 1;
  }

  static calculateNextOrderNumber(
    orders: Order[],
    userId: number
  ): number {
    const userOrders = orders.filter(
      order => order.userId === userId
    );

    if (userOrders.length === 0) {
      return 1;
    }

    return Math.max(
      ...userOrders.map(
        order => order.orderNumber ?? 0
      )
    ) + 1;
  }
}

