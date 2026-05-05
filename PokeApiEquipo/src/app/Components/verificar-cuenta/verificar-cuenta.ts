import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verificar-cuenta',
  imports: [CommonModule],
  templateUrl: './verificar-cuenta.html',
  styleUrl: './verificar-cuenta.css',
})
export class VerificarCuenta {

  token = '';
  mensaje = '';
  verificado = false;

  constructor(private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(){
    this.token = this.route.snapshot.queryParamMap.get('token')|| '';
  }

  verificarCuenta() {
    this.http.get(`http://localhost:8080/pokemon/verificar?token=${this.token}`)
      .subscribe({
        next: (res: any) => {
          this.verificado = true;
          this.mensaje = 'Cuenta verificada correctamente';
        },
        error: () => {
          this.mensaje = 'Token inválido o expirado';
        }
      });
  }
}
