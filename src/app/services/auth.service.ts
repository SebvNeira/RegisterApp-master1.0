import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string | null = null;

  constructor() {}

  setUsername(username: string) {
    this.username = username;
    localStorage.setItem('user', username); // Puedes almacenarlo en localStorage
  }

  getUsername(): string {
    return this.username || localStorage.getItem('user') || '';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Verifica si el usuario ha iniciado sesión
  }

  logout() {
    localStorage.removeItem('user'); // Eliminar datos de sesión
    this.username = null;
  }
}
