import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { interval, switchMap } from 'rxjs';
import { PokemonService } from '../../Services/pokemon-service';

@Component({
  selector: 'app-verificar-pendiente',
  imports: [],
  templateUrl: './verificar-pendiente.html',
  styleUrl: './verificar-pendiente.css',
})
export class VerificarPendiente implements OnInit {

  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  correo: string = localStorage.getItem('correoPendiente') || '';

  ngOnInit(): void {

    if (!this.correo) {
      this.router.navigate(['/login']);
      return;
    }

    interval(5000)
      .pipe(
        switchMap(() =>
          this.pokemonService.verificarEstado(this.correo)
        )
      )
      .subscribe({
        next: (response: any) => {

          if (response.correct) {

            localStorage.removeItem('correoPendiente');

            localStorage.setItem('token', response.object.key);
            localStorage.setItem('userId', response.object.id);

            this.router.navigate(['/layout/pokedex']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}