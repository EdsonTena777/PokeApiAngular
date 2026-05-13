import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { PokemonService } from '../../Services/pokemon-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activar-cuenta',
  imports: [FormsModule],
  templateUrl: './activar-cuenta.html',
  styleUrl: './activar-cuenta.css',
})
export class ActivarCuenta {
  correo: string = '';
  constructor(private router: Router, private http: HttpClient){}
  private pokemonService = inject(PokemonService);

  reenviarVerificion(event: Event, correo: string){
    if(correo){
      this.pokemonService.reenviarVerificacion(correo).subscribe({
        next: (data: any) => {
          console.log(data);
          Swal.fire({
            title: "Correo enviado",
            text: "Se ha enviado un correo de recuperación a " + correo,
            icon: "success"
          });
        },
        error: () => {
          Swal.fire({
            title: "Error",
            text: "No se pudo enviar el correo",
            icon: "error"
          })
        },
        complete: () => {
          this.router.navigate(['/login']);
        }
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
