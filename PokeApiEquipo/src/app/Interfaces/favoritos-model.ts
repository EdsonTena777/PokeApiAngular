import { Pokemon } from "./pokemon-model";
import { Usuario } from "./usuario-model";

export interface Favoritos {
  Pokemon: Pokemon;
  Usuario: Usuario;
}