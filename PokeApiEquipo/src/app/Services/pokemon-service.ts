import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllPoke } from '../Components/get-all-poke/get-all-poke';
import { Observable } from 'rxjs';
import { result } from '../Interfaces/result-model';
import { Pokemon } from '../Interfaces/pokemon-model';
import { UsuarioAddDTO } from '../Interfaces/usuarioAdd-model';
import { HttpInterceptorFn } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  private urlServicio = 'http://localhost:8080/pokemon';

  private urlLogin = 'http://localhost:8080/auth/login';

  private urlDesc = 'https://pokeapi.co/api/v2/pokemon-species';
  

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) { }

  GetAllPoke(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&offset=${offset}`);
  }

  GetById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.url + id);
  }

  addFavorito(pokemon: Pokemon): Observable<any> {
    return this.http.post(this.urlServicio + '/favorito?identificador=21', pokemon);
  }



getFavById(id: number): Observable < result < Pokemon >> {
  return this.http.get<result<Pokemon>>(this.urlServicio + '/getFav?identificador=' + id, { headers: this.headers });
}


addUsuario(usuario: UsuarioAddDTO): Observable < any > {
  return this.http.post(this.urlServicio, usuario);
}

login(loginDTO: any): Observable < any > {
  return this.http.post(this.urlLogin, loginDTO);
}

  getDescPokemon(id: number){
    return this.http.get(`${this.urlDesc}/${id}`);
  }
}