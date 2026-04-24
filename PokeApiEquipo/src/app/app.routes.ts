import { Routes } from '@angular/router';
import { GetAllPoke } from './Components/get-all-poke/get-all-poke';

export const routes: Routes = [
  { path: 'pokedex', component: GetAllPoke },
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' } 
];