import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  clases: any[] = [

    { nombre: 'ARQUITECTURA', seccion: 'ASY4131-012D', sala: 'L3',profesor: 'EMILIO GONZALO SOTO ROJAS', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'CALIDAD DE SOFTWARE', seccion: 'CSY4111-011D' , sala: 'L5', profesor: 'PATRICIO ANDRES SOTO SERDIO', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'ESTADÍSTICA DESCRIPTIVA', seccion: 'MAT4140-012D', sala: 'L3', profesor: 'KATHERINE DEL CARMEN ENCINA ALARCON', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'INGLÉS INTERMEDIO', seccion: 'INI5111-019D' , sala: '607', profesor: 'GUSTAVO ALEJANDRO ARIAS BECERRA', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'PROCESO DE PORTAFOLIO FINAL', seccion: 'PY41447-005D' , sala: '806', profesor: 'PATRICIO ANDRES SOTO SERDIO', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'PROGRAMACIÓN DE APLICACIONES MÓVILES', seccion: 'PGY4121-012D' , sala: 'L9', profesor: 'CARLOS FERNANDO MARTINEZ SANCHEZ', mostrarAsistencia: false, asistencias: [] },
    { nombre: 'ÉTICA PARA EL TRABAJO', seccion: 'EAY4450-300D' , sala: '503', profesor: 'ESTEBAN SALVATIERRA ROMAN', mostrarAsistencia: false, asistencias: [] },

  ];

  nombreUsuario: string = '';
  result: string = ''
  asistenciaData: any[] = [];

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit() {
    this.nombreUsuario = this.authService.getUsername(); 
    this.cargarAsistencias();
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  guardarAsistencia(asistencia: any) {
    const asistenciaRecords = this.getAttendance();
    asistenciaRecords.push(asistencia);
    localStorage.setItem('attendance', JSON.stringify(asistenciaRecords));
  }

  getAttendance(): any[] {
    return JSON.parse(localStorage.getItem('attendance') || '[]');
  }

  cargarAsistencias() {
    const storedAsistencias = this.getAttendance();
    if (storedAsistencias.length > 0) {
      this.clases.forEach((clase) => {
        const asistenciasPorClase = storedAsistencias.filter(
          (asistencia) => asistencia.claseInfo === clase.nombre
        );
        clase.asistencias = asistenciasPorClase || [];
      });
    }
  }

  openWeatherApi() {
    window.location.href = 'assets/app_clima/clima.html';
  }
  
  async scan(clase: any): Promise<void> {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      });
      this.result = result.ScanResult;
  
      if (this.result) {
        const qrData = this.result.split('|'); // Divide los datos del QR
        if (qrData.length >= 3) { // Exige al menos 3 elementos
          const [asignatura, seccion, sala] = qrData;
  
          // Validar que los datos del QR coincidan con la clase seleccionada
          if (asignatura === clase.nombre && seccion === clase.seccion) {
            const fechaActual = new Date().toLocaleString('es-CL', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
  
            const asistencia = {
              asignatura,
              seccion,
              sala,
              fecha: fechaActual,
              claseInfo: clase.nombre,
            };
  
            // Agregar asistencia a la clase y guardar en localStorage
            clase.asistencias.push(asistencia);
            this.guardarAsistencia(asistencia);
  
            alert(`Asistencia registrada para: ${asignatura} - Sección: ${seccion}, Fecha: ${fechaActual}`);
          } else {
            // Mensaje de error si los datos no coinciden
            alert(`El QR escaneado no corresponde a la clase seleccionada (${clase.nombre}, sección ${clase.seccion}).`);
          }
        } else {
          alert('Formato de QR inválido.');
        }
      }
    } catch (error) {
      console.error('Error al escanear QR', error);
      alert('Hubo un error al escanear el código QR.');
    }
  }
  
  
  toggleClase(clase: any) {
    clase.mostrarAsistencia = !clase.mostrarAsistencia;
  }
}
