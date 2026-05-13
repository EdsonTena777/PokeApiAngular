import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../Services/pokemon-service';
import { TitleCasePipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  imports: [TitleCasePipe, CommonModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {

  pokemonesFavoritos: any[] = [];

  constructor(private cdr: ChangeDetectorRef) { }
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  idUsuario: number = 0;

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.idUsuario = Number(userId);
    this.getFavById(this.idUsuario);
  }

  getFavById(id: number) {
    this.pokemonService.getFavById(id).subscribe({
      next: (data: any) => {

        const requests = data.map((fav: any) =>
          this.pokemonService.GetById(fav.idPokemon)
        );

        forkJoin(requests).subscribe({
          next: (pokemonesData: any) => {

            this.pokemonesFavoritos = pokemonesData.map((objeto: any) => ({
              idPokemon: objeto.id,
              name: objeto.name,
              hp: objeto.stats[0].base_stat,
              attack: objeto.stats[1].base_stat,
              defense: objeto.stats[2].base_stat,
              specialAttack: objeto.stats[3].base_stat,
              specialDefense: objeto.stats[4].base_stat,
              speed: objeto.stats[5].base_stat,
              types: objeto.types,
              sonido: objeto.cries.latest,
              flipped: false
            }));

            this.pokemonesFavoritos.forEach((pokemon, index) => {
              this.pokemonService.getDescPokemon(pokemon.idPokemon).subscribe({
                next: (descData: any) => {
                  const descEsp = descData.flavor_text_entries.find(
                    (x: any) => x.language.name === 'es'
                  );

                  this.pokemonesFavoritos[index].descripcion = descEsp?.flavor_text
                    ?.replace(/\f/g, ' ')
                    ?.replace(/\n/g, ' ');

                  this.cdr.detectChanges();
                }
              });
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener favoritos:', err);
      }
    });
  }

  toggleFlip(pokemon: any, event: Event) {
    event.stopPropagation();
    pokemon.flipped = !pokemon.flipped;
  }

  reproducirSonido(pokemon: Pokemon){
    if(!pokemon.sonido) return;

    const audio = new Audio(pokemon.sonido);
    audio.volume = 0.5;
    audio.play();
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
}