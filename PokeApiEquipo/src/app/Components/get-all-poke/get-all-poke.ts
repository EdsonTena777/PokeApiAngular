import { Component, inject, model } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { TitleCasePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-get-all-poke',
  imports: [TitleCasePipe],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {
  public idTemporal: undefined | number;
  voltea: boolean = false;

  presionaCarta() {
    this.voltea = !this.voltea;
  }

  public pokemones: Pokemon[] = [];

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.getDetalles();
  };

  GetById(id: number): void {
    this.pokemonService.GetById(id).subscribe({
      next: (data) => {
        console.log('Datos del Pokémon:', data);
      }
    })
  }

  getDetalles() {
    this.pokemonService.GetAllPoke().pipe(
      switchMap(data => {

        this.pokemones = data.results.map((p: any) => ({
          name: p.name,
          url: p.url,
          idPokemon: parseInt(p.url.split('/').filter(Boolean).pop() || '0'),
          flipped: false
        }));

        const requests = this.pokemones.map(pokemon =>
          this.pokemonService.GetById(pokemon.idPokemon)
        );

        return forkJoin(requests);
      })
    ).subscribe({
      next: (data: any) => {
        console.log('Datos del PokémonE:', data);
        data.forEach((objeto: any, index: number) => {
          this.pokemones[index].hp = objeto.stats[0].base_stat;
          this.pokemones[index].attack = objeto.stats[1].base_stat;
          this.pokemones[index].defense = objeto.stats[2].base_stat;
          this.pokemones[index].specialAttack = objeto.stats[3].base_stat;
          this.pokemones[index].specialDefense = objeto.stats[4].base_stat;
          this.pokemones[index].speed = objeto.stats[5].base_stat;

        })
      }
    })

  }


  GetAllPoke() {
    this.pokemonService.GetAllPoke().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data); 
        if (data && data.results) {
          this.pokemones = data.results.map((p: any) => ({
            name: p.name,
            url: p.url,
            idPokemon: parseInt(p.url.split('/').filter(Boolean).pop() || '0'),
            flipped: false
          }));
          console.log('Pokemones procesados:', this.pokemones);
        }
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

}