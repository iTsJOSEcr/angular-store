import { CartItem } from '../models/cart-item.model';

export function calculateTotalItems(
  items: CartItem[]
): number {
  return items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function calculateCartTotal(
  items: CartItem[]
): number {
  return items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );
}

export function findCartItem(
  items: CartItem[],
  productId: number
): CartItem | undefined {
  return items.find(
    item => item.product.id === productId
  );
}

