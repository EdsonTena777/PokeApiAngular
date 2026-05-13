import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { PokemonService } from '../../Services/pokemon-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

private pokemonService = inject(PokemonService);
private router = inject(Router);

  onLogout(){
    this.pokemonService.logout();
    this.router.navigate(['/login'], { replaceUrl: true }); 
  }

  isFavoritos(){
    this.router.navigate(['/layout/favoritos']);
  }

}