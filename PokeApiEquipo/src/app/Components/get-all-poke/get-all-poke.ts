import { Component, inject, model } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-get-all-poke',
  imports: [TitleCasePipe],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {

  constructor(private cdr: ChangeDetectorRef) {}

  voltea: boolean = false;

  presionaCarta(){
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
    this.cargarPokemones();
  };

  limit: number = 20;
  offset: number = 0;
  paginaActual: number = 1;
  totalPaginas: number = 0;

  cargarPokemones() {
    this.pokemonService.GetAllPoke(this.limit, this.offset).subscribe({
      next: (data: any) => {
        if (data && data.results) {
          console.log('Datos recibidos:', data); 
          this.pokemones = data.results.map((p: any) => ({
            name: p.name,
            url: p.url,
            idPokemon: parseInt(p.url.split('/').filter(Boolean).pop() || '0'),
            flipped: false
          }));

          this.totalPaginas = Math.ceil(data.count / this.limit);
          this.paginaActual = Math.floor(this.offset / this.limit) + 1;

          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  siguientePagina() {
    if (this.paginaActual < this.totalPaginas) {
      this.offset += this.limit;
      this.cargarPokemones();
    }
  }

  anteriorPagina() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.cargarPokemones();
    }
  }


}