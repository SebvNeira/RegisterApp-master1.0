import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  clases: any[] = [

    { nombre: 'ARQUITECTURA', seccion: 'ASY4131-012D', profesor: 'EMILIO GONZALO SOTO ROJAS' },
    { nombre: 'CALIDAD DE SOFTWARE', seccion: 'CSY4111-011D', profesor: 'PATRICIO ANDRES SOTO SERDIO' },
    { nombre: 'ESTADÍSTICA DESCRIPTIVA', seccion: 'MAT4140-012D', profesor: 'KATHERINE DEL CARMEN ENCINA ALARCON' },
    { nombre: 'INGLÉS INTERMEDIO', seccion: 'INI5111-019D', profesor: 'GUSTAVO ALEJANDRO ARIAS BECERRA' },
    { nombre: 'PROCESO DE PORTAFOLIO FINAL', seccion: 'PY41447-005D', profesor: 'PATRICIO ANDRES SOTO SERDIO' },
    { nombre: 'PROGRAMACIÓN DE APLICACIONES MÓVILES', seccion: 'PGY4121-012D', profesor: 'CARLOS FERNANDO MARTINEZ SANCHEZ' },
    { nombre: 'ÉTICA PARA EL TRABAJO', seccion: 'EAY4450-300D', profesor: 'ESTEBAN SALVATIERRA ROMAN' },

  ];

  nombreUsuario: string = '';
  result: string = ''

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit() {
    this.nombreUsuario = this.authService.getUsername(); 
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
  openWeatherApi() {
    window.location.href = 'assets/app_clima/clima.html';
  }
  /*
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
  }*/
  
  
}

