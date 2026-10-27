
import { Injectable, inject, signal, effect } from '@angular/core';

import { Auth } from './auth';
import { Storage as StorageService } from './storage';
import { FavoriteUtils } from '../utils/favorite.utils';

@Injectable({
  providedIn: 'root',
})
export class Favorite {

  private authService = inject(Auth);
  private storageService = inject(StorageService);

  favoriteIds = signal<number[]>([]);

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();

      if (!user) {
        this.favoriteIds.set([]);
        return;
      }

      const favorites = this.loadFavorites(user.id);

      this.favoriteIds.set(favorites);
    });
  }

  private getStorageKey(userId: number): string {
    return `favorites_${userId}`;
  }

  private loadFavorites(userId: number): number[] {
    const key = this.getStorageKey(userId);

    return this.storageService.get<number[]>(key) ?? [];
  }

  addFavorite(productId: number): void {
    const user = this.authService.currentUser();

    if (!user) {
      return;
    }

    const currentFavorites = this.loadFavorites(user.id);

    const updatedFavorites = FavoriteUtils.addFavorite(
      currentFavorites,
      productId
    );

    const key = this.getStorageKey(user.id);

    this.storageService.save(key, updatedFavorites);

    this.favoriteIds.set(updatedFavorites);
  }

  removeFavorite(productId: number): void {
    const user = this.authService.currentUser();

    if (!user) {
      return;
    }

    const currentFavorites = this.loadFavorites(user.id);

    const updatedFavorites = FavoriteUtils.removeFavorite(
      currentFavorites,
      productId
    );

    const key = this.getStorageKey(user.id);

    this.storageService.save(key, updatedFavorites);

    this.favoriteIds.set(updatedFavorites);
  }

}

