import { CartItem } from './cart-item.model';

export interface Order {
  id: number;
  orderNumber: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
}
