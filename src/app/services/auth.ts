import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {

 private users: User[] = [
  {
    id: 1,
    name: 'Jose',
    email: 'jose@gmail.com',
    password: '1234'
  },
  {
    id: 2,
    name: 'Maria',
    email: 'maria@gmail.com',
    password: '5678'
  }
];

  currentUser = signal<User | null>(
    this.loadCurrentUser()
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

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );

    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  private loadCurrentUser(): User | null {
    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  }
}