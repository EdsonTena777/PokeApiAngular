import { Component, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PokemonService } from '../../Services/pokemon-service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login-poke',
  imports: [FormsModule],
  templateUrl: './login-poke.html',
  styleUrl: './login-poke.css',
})
@Injectable({
  providedIn: 'root'
})
export class PokemonLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  private pokemonService = inject(PokemonService);

  login() {

    const loginDTO = {
      username: this.username,
      password: this.password
    };

    this.pokemonService.login(loginDTO).subscribe({
      next: (response) => {
        console.log('Login response:', response.object.id);
        console.log('Login response:', response.object.key);
        localStorage.setItem('token', response.object.key);
        localStorage.setItem('userId', response.object.id.toString());

        console.log('idusuario es: ', localStorage.getItem('userId'));

        this.router.navigate(['/layout/pokedex']);
      },
      error: (error) => {
        if (error.status === 403) {
          console.log('Login response:', loginDTO);

          Swal.fire({
            title: "Debes verificar tu correo primero",
            icon: "warning",
            draggable: true
          });
        } else {
          console.log('Login response:', loginDTO);

          Swal.fire({
            title: "Usuario o contraseña incorrectos",
            icon: "error",
            draggable: true
          });
        }
      }
    });
  }
  add() {
    this.router.navigate(['/addUsuario'])
  }
  reenviarVerificacion() {
    this.router.navigate(['/activarCuenta'])
  }

  reenviarRecuperarContra() {
    this.router.navigate(['/recuperarContra'])
  }

  // Método para obtener el rol decodificado
  getRolFromToken(): string | null {
    const token = localStorage.getItem('token'); 
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log("Token decodificado:", decoded);
      return decoded.rol;
    } catch (error) {
      console.error("Error decodificando el token", error);
      return null;
    }
  }

  hasRole(roleName: string): boolean {
    const currentRole = this.getRolFromToken();
    console.log("Rol actual:", currentRole);
    return currentRole === roleName;
  }

}