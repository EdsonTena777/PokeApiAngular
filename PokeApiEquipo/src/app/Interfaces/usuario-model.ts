import { Rol } from './rol-model';

export interface Usuario {
  IdUsuario: number;
  UserName: string;
  Email: string;
  Password: string; 
  Roles: Rol;       
}