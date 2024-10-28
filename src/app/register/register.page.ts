import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async registrarUsuario() {
    if(this.username && this.email && this.password){
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      this.authService.saveUser(user); 
      await this.mostrarMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
      this.router.navigate(['/home']);

      this.username = '';
      this.email = '';
      this.password = '';
    } else {
      await this.mostrarMensaje('Por favor completa todos los campos.');
    }
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
