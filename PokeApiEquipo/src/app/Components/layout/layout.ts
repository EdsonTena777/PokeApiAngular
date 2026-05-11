import { Component, inject } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { PokemonService } from '../../Services/pokemon-service';

@Component({
  selector: 'app-layout',
  imports: [ RouterOutlet ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

private pokemonService = inject(PokemonService);
private router = inject(Router);

  onLogout(){
    this.pokemonService.logout();
    this.router.navigate(['/login']); 
  }

}