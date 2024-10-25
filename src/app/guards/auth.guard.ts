import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {  // Verifica si el usuario está autenticado
      return true;
    } else {
      this.router.navigate(['/home']);  // Si no, redirige al login
      return false;
    }
  }
}
