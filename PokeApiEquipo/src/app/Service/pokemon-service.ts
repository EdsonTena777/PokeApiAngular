import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllPoke } from '../Components/get-all-poke/get-all-poke';
import { Observable } from 'rxjs';
import { result } from '../Interfaces/result-model';
import { Pokemon } from '../Interfaces/pokemon-model';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  GetAllPoke(): Observable<any> {
    return this.http.get(this.url);
  }

  getImagen(): Observable<any> {
    return this.http.get(this.url);
  }





}

