import { Component, inject, model } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core'
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-get-all-poke',
  imports: [TitleCasePipe],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {

  constructor(private cdr: ChangeDetectorRef) { }

  public idTemporal: undefined | number;
  voltea: boolean = false;

  presionaCarta() {
    this.voltea = !this.voltea;
  }

  toggleFlip(pokemon: any, event: Event) {
    event.stopPropagation();
    pokemon.flipped = !pokemon.flipped;
  }

  public pokemones: Pokemon[] = [];

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    console.log('Component initialized');
    this.getDetalles();
  };


  limit: number = 20;
  offset: number = 0;
  paginaActual: number = 1;
  totalPaginas: number = 0;

  getDetalles() {
    this.pokemonService.GetAllPoke(this.limit, this.offset).pipe(
      switchMap(data => {

        this.pokemones = data.results.map((p: any) => ({
          name: p.name,
          url: p.url,
          idPokemon: parseInt(p.url.split('/').filter(Boolean).pop() || '0'),
          flipped: false
        }));

        this.totalPaginas = Math.ceil(data.count / this.limit);
        this.paginaActual = Math.floor(this.offset / this.limit) + 1;

        this.cdr.detectChanges();

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


  // cargarPokemones() {
  //   this.pokemonService.GetAllPoke(this.limit, this.offset).subscribe({
  //     next: (data: any) => {
  //       console.log('Datos recibidos:', data);
  //       if (data && data.results) {
  //         console.log('Datos recibidos:', data);
  //         this.pokemones = data.results.map((p: any) => ({
  //           name: p.name,
  //           url: p.url,
  //           idPokemon: parseInt(p.url.split('/').filter(Boolean).pop() || '0'),
  //           flipped: false
  //         }));

  //         this.totalPaginas = Math.ceil(data.count / this.limit);
  //         this.paginaActual = Math.floor(this.offset / this.limit) + 1;

  //         this.cdr.detectChanges();
  //       }
  //     },
  //     error: (err) => console.error('Error al cargar:', err)
  //   });
  // }

  siguientePagina() {
    if (this.paginaActual < this.totalPaginas) {
      this.offset += this.limit;
      this.getDetalles();
    }
  }

  anteriorPagina() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getDetalles();
    }
  }


}