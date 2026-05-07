import { Component, inject, model } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core'
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-all-poke',
  imports: [TitleCasePipe, CommonModule, FormsModule],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {

  constructor(private cdr: ChangeDetectorRef) { }

  public idTemporal: undefined | number;
  voltea: boolean = false;
  descripcion: string = '';

  presionaCarta() {
    this.voltea = !this.voltea;
  }

  toggleFlip(pokemon: any, event: Event) {
    event.stopPropagation();
    pokemon.flipped = !pokemon.flipped;
  }

  public pokemones: Pokemon[] = [];
  public cachePokemon: Pokemon[] = [];
  public pokemonesFiltrados: Pokemon[] = [];
  
  public textoBusqueda: string = '';
  public cargando: boolean = false;

  public busqueda: string = '';
  public tipoSeleccionados: string[] = []; 

  tiposPokemon: string[] = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water'
  ];

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    console.log('Component initialized');
    this.getDetalles();
  };

  limit: number = 1025;
  limitfuera : number = 20;
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
          this.pokemones[index].types= objeto.types;

          this.pokemonService.getDescPokemon(objeto.id).subscribe({
            next: (descData: any) => {
              const descEsp = descData.flavor_text_entries.find(
                (x: any) => x.language.name === 'es'
              );
              this.pokemones[index].descripcion = descEsp?.flavor_text
                ?.replace(/\f/g, ' ')
                ?.replace(/\n/g, ' ');
            }
          });
        })
        this.cachePokemon.push(...this.pokemones);
        this.pokemonesFiltrados = [...this.cachePokemon];
        this.cdr.detectChanges();
        console.log("pokemones con stats:", this.cachePokemon);
      }
    })

  }

  // siguientePagina() {
  //   if (this.paginaActual < this.totalPaginas) {
  //     this.offset += this.limit;
  //     this.paginaActual++;
  //   }
  // }

  // anteriorPagina() {
  //   if (this.offset >= this.limit) {
  //     this.offset -= this.limit;
  //     this.paginaActual
  //   }
  // }

  get pokemonesAMostrar() {
    return this.pokemonesFiltrados.slice(this.offset, this.offset + this.limitfuera);
  }

  siguientePagina() {
    if ((this.offset + this.limitfuera) < this.cachePokemon.length) {
      this.offset += this.limitfuera;
    }
  }

  anteriorPagina() {
    if (this.offset > 0) {
      this.offset -= this.limitfuera;
    }
  }
  addFavorito(event: Event, pokemon: Pokemon) {
    console.log('Agregando a favoritos:', pokemon);
    this.pokemonService.addFavorito(pokemon).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        alert(`${pokemon.name} ha sido agregado a favoritos.`);
      },
      error: (err) => {
        console.error('Error al agregar a favoritos:', err);
        alert(`Error al agregar ${pokemon.name} a favoritos.`);
      }
    });
  }

  aplicarFiltros(){
    this.pokemonesFiltrados = this.cachePokemon.filter(pokemon => {
      const coincideBusqueda = pokemon.name.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideTipo = this.tipoSeleccionados.length === 0 || 
        this.tipoSeleccionados.every(tipoSeleccionado => pokemon.types.some(types => types.type.name === tipoSeleccionado));

      return coincideBusqueda && coincideTipo;
    })
  }

  filtrarPorTipo(tipo: string){
    this.aplicarFiltros();
  }

  dosTipos(tipo: string) {
    const existe = this.tipoSeleccionados.includes(tipo);

    if (existe) {
      this.tipoSeleccionados = this.tipoSeleccionados.filter(t => t !== tipo);
    } else {
      if (this.tipoSeleccionados.length < 2) {
        this.tipoSeleccionados = [...this.tipoSeleccionados, tipo];
      } else {
        console.warn("Solo puedes seleccionar un máximo de 2 tipos");
        return;
      }
    }
    this.aplicarFiltros();
  }

  filtrarPokemones(){
    this.aplicarFiltros();
  }
}