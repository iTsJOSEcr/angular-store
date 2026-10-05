import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {

  save<T>(key: string, value: T): void {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }

  get<T>(key: string): T | null {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      return null;
    }

    return JSON.parse(savedValue) as T;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}


