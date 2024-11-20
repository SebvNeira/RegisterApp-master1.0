import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'user';
  private isAuthenticatedkey = 'isAuthenticated';

  constructor() {}

  saveUser(user: { username: string; email: string; password: string }) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    localStorage.setItem(this.isAuthenticatedkey, 'true');
  }

  getUsername(): string {
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return storedUser.username || '';
  }

  logout() {
    localStorage.setItem(this.isAuthenticatedkey, 'false');
  }

  validateCredentials(username: string, password: string): boolean {
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    if (storedUser.username === username && storedUser.password === password){
      localStorage.setItem(this.isAuthenticatedkey, 'true');
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.isAuthenticatedkey) !== null;
  }
}
