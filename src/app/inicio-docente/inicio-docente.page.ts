import { Component } from '@angular/core';
import QRCode from 'qrcode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-docente',
  templateUrl: './inicio-docente.page.html',
  styleUrls: ['./inicio-docente.page.scss'],
})
export class InicioDocentePage {

  clases: any[] = [
    { nombre: 'ARQUITECTURA', seccion: 'ASY4131-012D', sala: 'L3', profesor: 'EMILIO GONZALO SOTO ROJAS', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'CALIDAD DE SOFTWARE', seccion: 'CSY4111-011D', sala: 'L5', profesor: 'PATRICIO ANDRES SOTO SERDIO', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'ESTADÍSTICA DESCRIPTIVA', seccion: 'MAT4140-012D', sala: 'L3', profesor: 'KATHERINE DEL CARMEN ENCINA ALARCON', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'INGLÉS INTERMEDIO', seccion: 'INI5111-019D', sala: '607', profesor: 'GUSTAVO ALEJANDRO ARIAS BECERRA', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'PROCESO DE PORTAFOLIO FINAL', seccion: 'PY41447-005D', sala: '806', profesor: 'PATRICIO ANDRES SOTO SERDIO', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'PROGRAMACIÓN DE APLICACIONES MÓVILES', seccion: 'PGY4121-012D', sala: 'L9', profesor: 'CARLOS FERNANDO MARTINEZ SANCHEZ', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'ÉTICA PARA EL TRABAJO', seccion: 'EAY4450-300D', sala: '503', profesor: 'ESTEBAN SALVATIERRA ROMAN', mostrarAsistencia: false, asistencias: [] },
  ];

  selectedClass: any = null;
  generatedQR: string | null = null;

  constructor(private authService: AuthService, private router: Router, private menuCtrl: MenuController,) { }

  // Método para actualizar los datos del QR cuando se selecciona una clase
  updateQRData() {
    if (this.selectedClass) {
      this.generateQR();
    }
  }

  // Método para generar el código QR
  generateQR() {
    if (!this.selectedClass) {
      alert('Por favor, selecciona una clase para generar el código QR.');
      return;
    }

    // Formato del texto para el QR: <ASIGNATURA>|<SECCION>|<SALA>
    const qrText = `${this.selectedClass.nombre}|${this.selectedClass.seccion}|${this.selectedClass.sala}`;

    QRCode.toDataURL(qrText, { width: 300 })
      .then((url: string) => {
        this.generatedQR = url;
      })
      .catch((err: any) => {
        console.error('Error al generar el QR: ', err);
      });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

}
