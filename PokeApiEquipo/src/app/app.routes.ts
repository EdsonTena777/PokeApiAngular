import { Routes } from '@angular/router';
import { GetAllPoke } from './Components/get-all-poke/get-all-poke';
import { PokemonLoginComponent } from './Components/login-poke/login-poke';
import { AddUsuario } from './Components/add-usuario/add-usuario';
import { VerificarCuenta } from './Components/verificar-cuenta/verificar-cuenta';
import { Layout } from './Components/layout/layout';
import { authGuard } from './guards/auth-guards';
import { RecuperarContra } from './Components/recuperar-contra/recuperar-contra';
import { NuevaContra } from './Components/nueva-contra/nueva-contra';
import { ActivarCuenta } from './Components/activar-cuenta/activar-cuenta';
import { Favoritos } from './Components/favoritos/favoritos';

export const routes: Routes = [
  { path: 'login', component: PokemonLoginComponent },
  { path: 'addUsuario', component: AddUsuario },
  { path: 'verificar-cuenta', component: VerificarCuenta },
  { path: 'activarCuenta', component: ActivarCuenta},
  {path: 'recuperarContra', component: RecuperarContra},
  {path: 'nuevaContra', component: NuevaContra},

  {
    path: 'layout',
    component: Layout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'pokedex', component: GetAllPoke },
      { path: 'favoritos', component: Favoritos },
      { path: '', redirectTo: 'pokedex', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login'  },
  { path: 'recuperar-contra', component: RecuperarContra},
  { path: 'nueva-contra', component: NuevaContra }
];