export interface Pokemon {
  name: string,
  url: string,
  idPokemon: number,
  imagen: string,
  flipped?: boolean,
  hp: string,
  attack: string,
  defense: string,
  specialAttack: string,
  specialDefense: string,
  speed: string,
  types: TypeElement[],
  descripcion: string,
  sonido: string
}

export interface TypeElement {
  slot: number,
  type: TypeInfo
}

export interface TypeInfo {
  name: string,
  url: string
}