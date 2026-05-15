import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { PokemonService } from '../../Services/pokemon-service';
import { PokemonLoginComponent } from '../login-poke/login-poke';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  location = inject(Location);

  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  public login = inject(PokemonLoginComponent);

  onLogout() {
    this.pokemonService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isFavoritos() {
    this.router.navigate(['/layout/favoritos']);
  }

  getAllUser() {
    this.router.navigate(['/layout/getAllUser']);
  }

  regresar() {
    this.location.back(); // Retrocede en el historial sin recargar
  }

}