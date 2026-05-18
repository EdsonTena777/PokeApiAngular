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
  sonido: string,
  shiny : string,
  gift : string,
  artWork : string,
  imgHome : string,
  imgDream : string,
  imgTemporal: string,
  mostrarGift?: boolean,
  generation: string
}

export interface TypeElement {
  slot: number,
  type: TypeInfo
}

export interface TypeInfo {
  name: string,
  url: string
}