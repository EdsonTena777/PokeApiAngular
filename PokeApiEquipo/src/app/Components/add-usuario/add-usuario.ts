import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Interfaces/usuario-model';
import { UsuarioAddDTO } from '../../Interfaces/usuarioAdd-model';
import { PokemonService } from '../../Services/pokemon-service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';


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
    Status: 0,
    Rol: { IdRol: 0, NombreRol: '' }
  };

  private pokemonService = inject(PokemonService);
  private router = inject(Router);

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
          console.log("RESPUESTA ADD:", response);
          localStorage.setItem('correoPendiente', this.usuario.Correo);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${this.usuario.UserName} ha sido registrado exitosamente`,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/verificar-pendiente']);
        },
        error: (error) => {
          if (error) {
            Swal.fire({
              title: "Username o correo ya existen",
              icon: "error",
              draggable: true
            });
          }
          console.log('ERROR COMPLETO:', error);

        }
      });
    } else {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        icon: "error",
        draggable: true
      });
    }
  }
}
