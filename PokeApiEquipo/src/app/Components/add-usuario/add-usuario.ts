import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../Interfaces/usuario-model';

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
    Email: '',
    Password: '',
    Roles: { IdRol: 0, NombreRol: '' } 
  };

  agregarUsuario() {
    if (this.usuario.UserName && this.usuario.Email && this.usuario.Password) {
      alert(`¡Entrenador ${this.usuario.UserName} agregado a la Pokédex!`);
      // back para agregar usaurio
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
