import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../../Services/pokemon-service';

@Component({
  selector: 'app-login-poke',
  imports: [FormsModule],
  templateUrl: './login-poke.html',
  styleUrl: './login-poke.css',
})
export class PokemonLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  private pokemonService = inject(PokemonService);

  login() {

    const loginDTO = {
      username: this.username,
      password: this.password
    };

    this.pokemonService.login(loginDTO).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.Token);

        this.router.navigate(['/pokedex']);
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Debes verificar tu correo primero');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      }
    });
  }
  add(){
    this.router.navigate(['/addUsuario'])
  }
}