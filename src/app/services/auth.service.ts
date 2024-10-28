import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'user';

  constructor() {}

  // Guardar usuario en localStorage
  saveUser(user: { username: string; email: string; password: string }) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  // Obtener solo el nombre de usuario
  getUsername(): string {
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return storedUser.username || '';
  }

  // Cerrar sesión eliminando usuario de localStorage
  logout() {
    localStorage.removeItem(this.storageKey);
  }

  // Verificar credenciales al iniciar sesión
  validateCredentials(username: string, password: string): boolean {
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return storedUser.username === username && storedUser.password === password;
  }
}
