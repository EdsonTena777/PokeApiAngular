import { Component, inject, model, signal, Signal } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core'
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../spinner/spinner';
import Swal from 'sweetalert2';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PokemonLoginComponent } from '../login-poke/login-poke';



@Component({
  selector: 'app-get-all-poke',
  imports: [TitleCasePipe, CommonModule, Spinner, FormsModule],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {

  constructor(private cdr: ChangeDetectorRef) { }
  public login = inject(PokemonLoginComponent);

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
  public pokemonesFavoritos: Pokemon[] = [];

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

  idUsuario: number = parseInt(localStorage.getItem('userId') || '0');
  limit: number = 1025;
  limitfuera: number = 20;
  offset: number = 0;
  estacargando: boolean = true;
  get totalPaginas(): number {
    return Math.ceil(this.pokemonesFiltrados.length / this.limitfuera) || 1;
  }

  get paginaActual(): number {
    return Math.floor(this.offset / this.limitfuera) + 1;
  }

  getDetalles() {
    this.pokemonService.GetAllPoke(this.limit, this.offset).pipe(
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
        this.pokemonService.getFavById(this.idUsuario).subscribe({
          next: (data: any) => {
            console.log("data:", data);
            this.pokemonesFavoritos = data.map((objeto: any) => ({
              idPokemon: objeto.idPokemon,
            }));
            this.cdr.detectChanges();
            console.log("pokemonesFavoritos:", this.pokemonesFavoritos);
          },
          error: (err) => {
            console.error('Error al obtener Pokémon favorito:', err);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al obtener Pokémon favorito"
            });
          }
        })
        console.log('Datos del PokémonE:', data);
        data.forEach((objeto: any, index: number) => {
          this.pokemones[index].hp = objeto.stats[0].base_stat;
          this.pokemones[index].attack = objeto.stats[1].base_stat;
          this.pokemones[index].defense = objeto.stats[2].base_stat;
          this.pokemones[index].specialAttack = objeto.stats[3].base_stat;
          this.pokemones[index].specialDefense = objeto.stats[4].base_stat;
          this.pokemones[index].speed = objeto.stats[5].base_stat;
          this.pokemones[index].types = objeto.types;
          this.pokemones[index].sonido = objeto.cries.latest;
          this.pokemones[index].imagen = objeto.sprites.front_default;
          this.pokemones[index].shiny = objeto.sprites.front_shiny;
          this.pokemones[index].gift = objeto.sprites.other['showdown'].front_default;
          this.pokemones[index].artWork = objeto.sprites.other['official-artwork'].front_default;
          this.pokemones[index].imgHome = objeto.sprites.other['home'].front_default;
          this.pokemones[index].imgDream = objeto.sprites.other['dream_world'].front_default;

          this.pokemonService.getDescPokemon(objeto.id).subscribe({
            next: (descData: any) => {
              const descEsp = descData.flavor_text_entries.find(
                (x: any) => x.language.name === 'es'
              );
              this.pokemones[index].descripcion = descEsp?.flavor_text
                ?.replace(/\f/g, ' ')
                ?.replace(/\n/g, ' ');
              this.cdr.detectChanges();
            }
          });
        })
        this.cachePokemon.push(...this.pokemones);
        this.pokemonesFiltrados = [...this.cachePokemon];
        this.cdr.detectChanges();
        console.log("cache pokemones:", this.cachePokemon);
        console.log("pokemones filtrados:", this.pokemonesFiltrados);
        console.log('lista pokemones:', this.pokemones);
      },
      complete: () => {
        this.estacargando = false;
        this.cdr.detectChanges();
        console.log('Carga de Pokémon completada');
      }
    })

  }

  get pokemonesAMostrar() {
    return this.pokemonesFiltrados.slice(this.offset, this.offset + this.limitfuera);
  }

  siguientePagina() {
    if ((this.offset + this.limitfuera) < this.pokemonesFiltrados.length) {
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
    this.pokemonService.addFavorito(pokemon, this.idUsuario).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.pokemonesFavoritos = [...this.pokemonesFavoritos, pokemon];
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pokemon agregado a favoritos",
          showConfirmButton: false,
          timer: 1500
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al agregar a favoritos:', err);
        alert(`Error al agregar ${pokemon.name} a favoritos.`);
      }
    });
  }

  aplicarFiltros() {
    this.offset = 0;
    this.pokemonesFiltrados = this.cachePokemon.filter(pokemon => {
      const coincideBusqueda = pokemon.name.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideTipo = this.tipoSeleccionados.length === 0 ||
        this.tipoSeleccionados.every(tipoSeleccionado => pokemon.types.some(types => types.type.name === tipoSeleccionado));

      return coincideBusqueda && coincideTipo;
    })
  }

  filtrarPorTipo(tipo: string) {
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

  filtrarPokemones() {
    this.aplicarFiltros();
  }

  reproducirSonido(pokemon: Pokemon) {
    if (!pokemon.sonido) return;

    const audio = new Audio(pokemon.sonido);
    audio.volume = 0.5;
    audio.play();
  }

  public imagenActual: string = '';
  public imagenGuardada: string = '';

  cambiarImagen(pokemon: Pokemon, event: Event) {
    event.stopPropagation();

    if (pokemon.mostrarGift === undefined) {
      pokemon.mostrarGift = true;
    }

    pokemon.mostrarGift = !pokemon.mostrarGift;

    if (pokemon.mostrarGift) {
      pokemon.imgTemporal = pokemon.gift;
    } else {
      pokemon.imgTemporal = pokemon.artWork;
    }
  }

  cambiarShiny(pokemon: Pokemon) {
    if (!pokemon.shiny) return;
    pokemon.imgTemporal = pokemon.shiny;
  }

  removeFavorito(event: Event, pokemon: Pokemon) {
    console.log('Removiendo de favoritos:', pokemon);
    this.pokemonService.removeFavorito(this.idUsuario, pokemon.idPokemon).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.pokemonesFavoritos = this.pokemonesFavoritos.filter(fav => fav.idPokemon !== pokemon.idPokemon);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pokemon removido de favoritos",
          showConfirmButton: false,
          timer: 1500
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al remover de favoritos:', err);
        alert(`Error al remover ${pokemon.name} de favoritos.`);
      }
    });
  }

  ///
  // Tipo de gráfica: radar
  public radarChartType: ChartType = 'radar';

  // Datos numéricos a mostrar (6 lados = 6 valores)
  public radarChartData: ChartData<'radar'> = {
    labels: ['Habilidad 1', 'Habilidad 2', 'Habilidad 3', 'Habilidad 4', 'Habilidad 5', 'Habilidad 6'],
    datasets: [
      { data: [65, 59, 90, 81, 56, 75], label: 'Serie A' },
    ]
  };

  // Opciones de configuración
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };
  ///

}