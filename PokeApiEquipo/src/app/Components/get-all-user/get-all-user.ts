import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Usuario } from '../../Interfaces/usuario-model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-get-all-user',
  imports: [],
  templateUrl: './get-all-user.html',
  styleUrl: './get-all-user.css',
})
export class GetAllUser {

  ngOnInit(): void {
    this.getAll();
  }
  location = inject(Location);

  private cdr = inject(ChangeDetectorRef);
  private pokemonService = inject(PokemonService);
  public usuarios: Usuario[] = [];

  getAll() {
    this.pokemonService.getAllUsers().subscribe(
      (data: any) => {
        console.log('Usuarios obtenidos:', data);

        data.forEach((objeto: any, index: number) => {
          this.usuarios[index] = {
            IdUsuario: objeto.IdUsuario,
            UserName: objeto.UserName,
            Correo: objeto.Correo,
            Password: objeto.Password,
            Rol: {
              IdRol: objeto.Rol.IdRol,
              NombreRol: objeto.Rol.NombreRol
            }
          }
        })
        this.cdr.detectChanges();

        console.log('Usuarios mapeados:', this.usuarios);
      }, error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );


  }

  regresar() {
    this.location.back(); // Retrocede en el historial sin recargar
  }

}
