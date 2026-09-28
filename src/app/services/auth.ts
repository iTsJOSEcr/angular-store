import {
  Injectable,
  signal,
  inject
} from '@angular/core';

import { User } from '../models/user.model';
import { Storage as StorageService } from './storage';
import { DEFAULT_USERS } from '../data/user.data';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private storageService = inject(StorageService);

  private users: User[] = DEFAULT_USERS;

  currentUser = signal<User | null>(
    this.storageService.get<User>('currentUser')
  );

  login(email: string, password: string): boolean {
    const user = this.users.find(
      user =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      return false;
    }

    this.currentUser.set(user);

    this.storageService.save(
      'currentUser',
      user
    );

    return true;
  }

  logout(): void {
    this.currentUser.set(null);

    this.storageService.remove('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}