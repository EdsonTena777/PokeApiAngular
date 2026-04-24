import { Component, inject, model } from '@angular/core';
import { PokemonService } from '../../Service/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';


@Component({
  selector: 'app-get-all-poke',
  imports: [],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {
  public pokemones: Pokemon[] = [];

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    console.log('Component initialized');
    this.GetAllPoke();
  };

  GetAllPoke() {
    this.pokemonService.GetAllPoke().subscribe(
      data => {
        console.log(data);
        this.pokemones = data.results.map((p: any) => ({
          name: p.name,
          url: p.url,
          idPokemon: parseInt(p.url.split('/').filter(Boolean).pop() || '0'),
        }));
      });
  }




}
