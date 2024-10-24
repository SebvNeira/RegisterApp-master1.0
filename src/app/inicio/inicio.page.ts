import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreUsuario: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.nombreUsuario = this.authService.getUsername(); // Obtener el nombre de usuario
  }

  cerrarSesion() {
    this.authService.logout(); // Llamada al método de cerrar sesión
    this.router.navigate(['/login']); // Redirigir al login
  }
}

