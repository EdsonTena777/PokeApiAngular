import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllPoke } from '../Components/get-all-poke/get-all-poke';
import { Observable } from 'rxjs';
import { result } from '../Interfaces/result-model';
import { Pokemon } from '../Interfaces/pokemon-model';
import { UsuarioAddDTO } from '../Interfaces/usuarioAdd-model';
import { HttpInterceptorFn } from '@angular/common/http';
import { Usuario } from '../Interfaces/usuario-model';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  private urlServicio = 'http://192.167.0.227:8080/pokemon';

  private urlLogin = 'http://192.167.0.227:8080/auth';

  private urlDesc = 'https://pokeapi.co/api/v2/pokemon-species';


  private token = localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(private http: HttpClient) { }

  // Cache para almacenar los pokemones obtenidos SIN necesidad de volver a hacer la petición
  private cacheFavoritos: Pokemon[] = [];

  setFavoritos(favoritos: Pokemon[]) {
    this.cacheFavoritos = favoritos;
  }

  getFavoritos() {
    return this.cacheFavoritos;
  }
  private cachePokemones: Pokemon[] = [];

  setPokemones(data: Pokemon[]) {
    this.cachePokemones = data;
  }

  getPokemones() {
    return this.cachePokemones;
  }
  //

  GetAllPoke(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&offset=${offset}`);
  }

  GetById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.url + id);
  }

  addFavorito(pokemon: Pokemon, idUsuario: number): Observable<any> {
    return this.http.post(this.urlServicio + '/favorito?identificador=' + idUsuario, pokemon, { headers: this.headers });
  }

  removeFavorito(idUsuario: number, identificadorPokemon: number): Observable<any> {
    return this.http.delete(this.urlServicio + '?identificador=' + idUsuario + '&identificadorPokemon=' + identificadorPokemon, { headers: this.headers });
  }


  getFavById(id: number): Observable<result<Pokemon>> {
    console.log('Token en getFavById:', this.token);
    return this.http.get<result<Pokemon>>(this.urlServicio + '/getFav?identificador=' + id, { headers: this.headers });
  }


  addUsuario(usuario: UsuarioAddDTO): Observable<any> {
    return this.http.post(this.urlServicio, usuario);
  }

  login(loginDTO: any): Observable<any> {
    return this.http.post(this.urlLogin + '/login', loginDTO);
  }

  getDescPokemon(id: number) {
    return this.http.get(`${this.urlDesc}/${id}`);
  }

  enviarRecuperarContra(correo: string): Observable<result<any>> {
    return this.http.post<result<any>>(this.urlLogin + '/recuperarContra?correo=' + correo, null);
  }

  reenviarVerificacion(correo: string) {
    return this.http.post(this.urlServicio + '/reenviar-verificacion', {
      correo: correo
    });
  }

  cambiarContra(token: string, contraNueva: string): Observable<result<any>> {
    return this.http.post<result<any>>(this.urlLogin + '/cambiarContra?token=' + token + '&contraNueva=' + contraNueva, null);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  verificarEstado(correo: string) {
    return this.http.get<boolean>(
      `${this.urlServicio}/verificar-estado?correo=${correo}`
    );
  }

  getAllUsers(): Observable<result<Usuario[]>> {
    return this.http.get<result<Usuario[]>>(this.urlServicio + '/getAll', { headers: this.headers });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.urlServicio + '/deleteUser?identificador=' + id, { headers: this.headers });
  }

  updateUser(usuario: Usuario): Observable<any> {
    return this.http.patch(this.urlServicio, usuario, { headers: this.headers });
  }

}