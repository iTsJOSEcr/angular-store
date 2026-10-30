
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order-item.model';
import { Product } from '../models/product.model';

interface LegacyCartItem {
  product: Product;
  quantity: number;
}

type StoredOrderItem = OrderItem | LegacyCartItem;

type StoredOrder = Omit<Order, 'items'> & {
  items: StoredOrderItem[];
};

export class OrderMigrationUtils {

  static migrateOrders(orders: StoredOrder[]): Order[] {
    return orders.map(order => ({
      ...order,
      items: order.items.map(item =>
        OrderMigrationUtils.migrateOrderItem(item)
      )
    }));
  }

  private static migrateOrderItem(
    item: StoredOrderItem
  ): OrderItem {
    if ('productId' in item) {
      return { ...item };
    }

    return {
      productId: item.product.id,
      productName: item.product.name,
      unitPrice: item.product.price,
      quantity: item.quantity
    };
  }
}
