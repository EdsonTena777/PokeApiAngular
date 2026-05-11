import { Routes } from '@angular/router';
import { GetAllPoke } from './Components/get-all-poke/get-all-poke';
import { PokemonLoginComponent } from './Components/login-poke/login-poke';
import { AddUsuario } from './Components/add-usuario/add-usuario';
import { VerificarCuenta } from './Components/verificar-cuenta/verificar-cuenta';
import { Layout } from './Components/layout/layout';
import { authGuard } from './guards/auth-guards';

export const routes: Routes = [
  { path: 'login', component: PokemonLoginComponent },
  { path: 'addUsuario', component: AddUsuario },
  { path: 'verificar-cuenta', component: VerificarCuenta },

  {
    path: 'layout',
    component: Layout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'pokedex', component: GetAllPoke },
      { path: '', redirectTo: 'pokedex', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];