import { Component } from '@angular/core';


@Component({
  selector: 'app-get-all-poke',
  imports: [],
  templateUrl: './get-all-poke.html',
  styleUrl: './get-all-poke.css',
})
export class GetAllPoke {

  voltea: boolean = false;

  presionaCarta(){
    this.voltea = !this.voltea;   
  }
}
