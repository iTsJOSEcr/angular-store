import { CartItem } from '../models/cart-item.model';

export class CartUtils {

  static calculateTotalItems(
    items: CartItem[]
  ): number {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  static calculateCartTotal(
    items: CartItem[]
  ): number {
    return items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );
  }

  static findCartItem(
    items: CartItem[],
    productId: number
  ): CartItem | undefined {
    return items.find(
      item => item.product.id === productId
    );
  }
}

