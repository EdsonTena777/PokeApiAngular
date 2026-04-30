import { Rol } from './rol-model';

export interface Usuario {
  IdUsuario: number;
  UserName: string;
  Correo: string;
  Password: string; 
  Rol: Rol;       
}