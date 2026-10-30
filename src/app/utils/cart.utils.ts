
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

  static updateQuantity(
    items: CartItem[],
    productId: number,
    quantity: number
  ): CartItem[] {
    return items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
  }

  static removeCartItem(
    items: CartItem[],
    productId: number
  ): CartItem[] {
    return items.filter(
      item => item.product.id !== productId
    );
  }
}

