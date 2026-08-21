import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Order as OrderService } from '../../services/order';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

  orderService = inject(OrderService);

  orders = this.orderService.orders;
}
