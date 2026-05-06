import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
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

  pokemonService = inject(PokemonService);
  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      //aqui incluye una peticion al servicio para verificar que existan las credenciales
      this.pokemonService.getFavById


      this.router.navigate(['/pokedex']); 
    } else {
      Swal.fire({
              title: "Todos los campos son obligatorios",
              icon: "warning",
              draggable: true
            });
    }
  }
  add(){
    this.router.navigate(['/addUsuario'])
  }
}