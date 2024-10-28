import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'user';

  constructor() {}

  saveUser(user: { username: string; email: string; password: string }) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUsername(): string {
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return storedUser.username || '';
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  validateCredentials(username: string, password: string): boolean {
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return storedUser.username === username && storedUser.password === password;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }
}
