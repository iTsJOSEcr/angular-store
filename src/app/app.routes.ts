import { Routes } from '@angular/router';
import { Store } from './pages/store/store';
import { Cart } from './components/cart/cart';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    component: Store
  },
  {
    path: 'cart',
    component: Cart
  },
  {
    path: 'product/:id',
    component: ProductDetail
  },
  {
    path: '**',
    redirectTo: ''
  }
];