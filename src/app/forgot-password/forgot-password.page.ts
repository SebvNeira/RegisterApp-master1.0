import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ResendEmailService } from '../services/resend-email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  username: string = '';
  email: string = '';
  randomPass: number = 0;
  vMin = 100;
  vMax = 999;
  

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {
  }

  async recuperarContrasena() {
    if (!this.email) {
      await this.mostrarMensaje('Por favor ingresa tu correo electrónico.');
    
    } else if (!this.validarEmail(this.email)) {
      await this.mostrarMensaje('Por favor ingresa un correo electrónico válido.');
    
    } else {
    
      this.randomPass = Math.random() * (this.vMax - this.vMin);
      console.log(this.randomPass);

      const user = {
        username: this.username,
        email: this.email,
        password: this.randomPass.toString(),
      };

      
      
      /*

      this.authService.saveUser(user); 

      this.ResendEmailService.sendEmail().subscribe(
        response => {
          console.log('Correo enviado con éxito', response);
        },
        error => {
          console.error('Error al enviar correo', error);
        }
      );

      */
      
      await this.mostrarMensaje('Se ha enviado un enlace de recuperación a ' + this.email);
      this.router.navigate(['/login']);
    }
    

    this.email = '';
  }


  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Recuperación de Contraseña',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
