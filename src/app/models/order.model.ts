
import { OrderItem } from './order-item.model';

export interface Order {
  id: number;
  orderNumber: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  address: string;
  items: OrderItem[];
  total: number;
  date: string;
}
