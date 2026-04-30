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

  private urlServicio = 'http://localhost:8080/pokemon';

  constructor(private http: HttpClient) { }

  GetAllPoke(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&offset=${offset}`);
  }

    GetById(id: number): Observable<Pokemon>{
      return this.http.get<Pokemon>(this.url + id);
  }

  addFavorito(pokemon: Pokemon): Observable<any> {
    return this.http.post(this.urlServicio + '/favorito?identificador=1', pokemon);
  }




}