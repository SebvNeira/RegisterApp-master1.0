import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Aquí importamos la librería resend
import { Resend } from 'resend';

@Injectable({
  providedIn: 'root'
})
export class ResendEmailService {

  private resend: Resend;

  constructor(private http: HttpClient) {
    // Inicializamos la librería resend con tu clave API (ten en cuenta que esta debe estar en el backend, no en el frontend)
    this.resend = new Resend(environment.resendApiKey); // Usar el entorno para evitar la exposición de la clave
  }

  sendEmail(to: string, password: string): Observable<any> {
    return new Observable(observer => {
      // Ejecutamos el método para enviar el correo
      this.resend.emails.send({
        from: 'no-responder@registerapp.cl',
        to: to,
        subject: 'Tu Nueva Contraseña', 
        html: '<p>Tu nueva contraseña es:  </p>' + password
      }).then(response => {
        observer.next(response);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
