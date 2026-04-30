import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-poke',
  imports: [FormsModule],
  templateUrl: './login-poke.html',
  styleUrl: './login-poke.css',
})
export class PokemonLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.router.navigate(['/pokedex']); 
    } else {
      alert('Por favor ingresa tu nombre y contraseña.');
    }
  }
  add(){
    this.router.navigate(['/addUsuario'])
  }
}