import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-contra',
  imports: [FormsModule],
  templateUrl: './recuperar-contra.html',
  styleUrl: './recuperar-contra.css',
})
export class RecuperarContra {

  correo: string = '';

  enviarRecuperarContra(event: Event, correo: string) {
    if (correo) {

      Swal.fire({
        title: "Correo enviado",
        text: "Se ha enviado un correo de recuperación a " + correo,
        icon: "success"
      });

    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un correo válido.",
        icon: "error"
      });
    }

  }

}



