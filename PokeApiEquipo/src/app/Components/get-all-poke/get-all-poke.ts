import { Component, inject, model } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Pokemon } from '../../Interfaces/pokemon-model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-get-all-poke',
  imports: [TitleCasePipe],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {

  voltea: boolean = false;

  presionaCarta(){
    this.voltea = !this.voltea;   
  }

  public pokemones: Pokemon[] = [];

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    console.log('Component initialized');
    this.GetAllPoke();
  };

  GetAllPoke() {
    this.pokemonService.GetAllPoke().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data); // Mira esto en la consola F12
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