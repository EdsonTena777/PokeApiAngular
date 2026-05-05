import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Interfaces/usuario-model';
import { UsuarioAddDTO } from '../../Interfaces/usuarioAdd-model';
import { PokemonService } from '../../Services/pokemon-service';

@Component({
  selector: 'app-add-usuario',
  imports: [FormsModule],
  templateUrl: './add-usuario.html',
  styleUrl: './add-usuario.css',
})
export class AddUsuario {
  usuario: Usuario = {
    IdUsuario: 0,
    UserName: '',
    Correo: '',
    Password: '',
    Rol: { IdRol: 0, NombreRol: '' } 
  };

  private pokemonService = inject(PokemonService);

  agregarUsuario() {
    if (this.usuario.UserName && this.usuario.Correo && this.usuario.Password) {
      const dto = {
        IdUsuario: 0,
        Correo: this.usuario.Correo,
        Password: this.usuario.Password,
        UserName: this.usuario.UserName,
        Status: 0,
        Rol: {
          IdRol: this.usuario.Rol.IdRol
        }
      };

    console.log(dto);

      this.pokemonService.addUsuario(dto).subscribe({
        next: (response) => {
          alert(`¡Entrenador ${this.usuario.UserName} agregado a la Pokédex!`);
        },
        error: (error) => {
          console.log('ERROR COMPLETO:', error);
          console.log('ERROR BACKEND:', error.error);
          console.log('MENSAJE:', error.error?.errorMessage);
          alert('Error al crear usuario')
        }
      });
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
