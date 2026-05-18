import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PokemonService } from '../../Services/pokemon-service';
import { Usuario } from '../../Interfaces/usuario-model';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-get-all-user',
  imports: [FormsModule],
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
  //public usuarioActual: any = number (localStorage.getItem("userId"));



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
            Status: objeto.Status,
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

  deleteUser(id: number) {
    this.pokemonService.deleteUser(id).subscribe({
      next: () => {
        console.log('Usuario eliminado con ID:', id);

        this.usuarios = this.usuarios.filter(usuario => usuario.IdUsuario !== id);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }

  updateUser(user: Usuario){
    console.log(user);
    this.pokemonService.updateUser(user).subscribe({
      next: () =>{
        console.log("usuario actualizado con exito");
      },
      error: (error) =>{
        console.log("hubo un error en la actualizacion");
      }
    })
  }

  @ViewChild('miModal') modalElement!: ElementRef;
  usuarioSeleccionado: any = null;

  abrirModal(usuario: any) {
    this.usuarioSeleccionado = usuario; 

    const bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    bootstrapModal.show();
  }



}
