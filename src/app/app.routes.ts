import { Routes } from '@angular/router';
import { Store } from './pages/store/store';
import { Cart } from './components/cart/cart';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Checkout } from './pages/checkout/checkout';
import { Orders } from './pages/orders/orders';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Store,
    canActivate: [authGuard]
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard]
  },

  {
    path: 'product/:id',
    component: ProductDetail,
    canActivate: [authGuard]
  },

  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard]
  },

  {
    path: 'orders',
    component: Orders,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '' }
];