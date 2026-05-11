import { Routes } from '@angular/router';
import { GetAllPoke } from './Components/get-all-poke/get-all-poke';
import { PokemonLoginComponent } from './Components/login-poke/login-poke';
import { AddUsuario } from './Components/add-usuario/add-usuario';
import { VerificarCuenta } from './Components/verificar-cuenta/verificar-cuenta';
import { Layout } from './Components/layout/layout';
import { RecuperarContra } from './Components/recuperar-contra/recuperar-contra';
import { NuevaContra } from './Components/nueva-contra/nueva-contra';

export const routes: Routes = [
  { path: 'login', component: PokemonLoginComponent },
  { path: 'addUsuario', component: AddUsuario },
  {
    path: 'layout', component: Layout, children: [
      { path: 'pokedex', component: GetAllPoke },
    ]
  },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'verificar-cuenta', component: VerificarCuenta },
  { path: 'recuperar-contra', component: RecuperarContra},
  { path: 'nueva-contra', component: NuevaContra }
];