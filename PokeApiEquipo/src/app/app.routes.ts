import { Routes } from '@angular/router';
import { GetAllPoke } from './Components/get-all-poke/get-all-poke';
import { PokemonLoginComponent } from './Components/login-poke/login-poke';
import { AddUsuario } from './Components/add-usuario/add-usuario';
import { VerificarCuenta } from './Components/verificar-cuenta/verificar-cuenta';

export const routes: Routes = [
  { path: 'login', component: PokemonLoginComponent },
  { path: 'addUsuario', component: AddUsuario},
  { path: 'pokedex', component: GetAllPoke },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'verificar-cuenta', component: VerificarCuenta}
];