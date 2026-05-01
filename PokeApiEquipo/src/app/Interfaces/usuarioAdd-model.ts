export interface UsuarioAddDTO {
  UserName: string;
  Correo: string;
  Password: string;
  Rol: {
    IdRol: number;
  };
}