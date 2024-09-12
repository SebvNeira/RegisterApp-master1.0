import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  constructor(private router: Router) { }

  recuperarContrasena() {
    alert('Recuperación en proceso');
    this.router.navigate(['/login']);
  }
}

  