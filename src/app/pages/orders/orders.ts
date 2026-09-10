import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Order as OrderService } from '../../services/order';
import { Auth as AuthService } from '../../services/auth';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {

  orderService = inject(OrderService);
  authService = inject(AuthService);

  orders = computed(() => {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return [];
    }

    return this.orderService.orders().filter(
      order => order.userId === currentUser.id
    );
  });
}