import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  username: string='';
  password: string='';

  constructor(private router: Router, private alertCotroller: AlertController) { }

  async iniciarSesion() {
    const adminCredentials = { username: 'admin', password: 'admin123' };
    const userCredentials = { username: 'usuario', password: 'user123' };
  
    if(this.username === adminCredentials.username && this.password === adminCredentials.password){
      localStorage.setItem('user', JSON.stringify(adminCredentials)); // Guardar estado de sesión
      await this.mostrarMensaje('Bienvenido, Admin');
      this.router.navigate(['/inicio']); // Redirigir a inicio
  
    } else if (this.username === userCredentials.username && this.password === userCredentials.password){
      localStorage.setItem('user', JSON.stringify(userCredentials)); // Guardar estado de sesión
      await this.mostrarMensaje('Bienvenido, Usuario');
      this.router.navigate(['/inicio']); // Redirigir a inicio
  
    } else {
      await this.mostrarMensaje('Credenciales incorrectas, intente nuevamente.');
    }
  
    this.username = '';
    this.password = '';
  }
  

  async mostrarMensaje(mensaje: string){
    const alert = await this.alertCotroller.create({
      header: 'Inicio de Sesión',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
