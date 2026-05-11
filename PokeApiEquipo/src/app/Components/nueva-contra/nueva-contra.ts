import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PokemonService } from '../../Services/pokemon-service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nueva-contra',
  imports: [FormsModule],
  templateUrl: './nueva-contra.html',
  styleUrl: './nueva-contra.css',
})
export class NuevaContra {

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }
  
  private pokemonService = inject(PokemonService);

  token = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  newPassword: string = '';
  confirmPassword: string = '';

  cambiarContra(event: Event) {

    if ((this.newPassword && this.confirmPassword) && (this.newPassword.length >= 8 && this.confirmPassword.length >= 8)) {
      if (this.newPassword === this.confirmPassword) {
        
        this.pokemonService.cambiarContra(this.token, this.newPassword).subscribe({
          next: (data: any) => {
            console.log('Respuesta del servidor:', data);
            Swal.fire('Contraseña cambiada exitosamente', '', 'success');
          },

        });

      } else {
        Swal.fire('Las contraseñas no coinciden', '', 'error');
      }

    } else {
      Swal.fire('La contraseña debe tener al menos 8 caracteres', '', 'warning');
    }

  }
}