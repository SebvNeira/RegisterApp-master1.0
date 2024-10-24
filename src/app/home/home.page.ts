import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // servicio de autenticación que tienes

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username: string= '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsername(); // obtener el nombre del usuario
  }
}
