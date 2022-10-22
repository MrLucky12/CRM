import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-index-colaborador',
  templateUrl: './index-colaborador.component.html',
  styleUrls: ['./index-colaborador.component.css']
})
export class IndexColaboradorComponent implements OnInit {

  public token = localStorage.getItem('token');
  public colaboradores: Array<any> = [];

  constructor(
    private _colaboradorService: ColaboradorService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._colaboradorService.listar_colaboradores_admin(this.token).subscribe(
        // response => {console.log(response);}        
         response => {this.colaboradores = response.data; }
        );

      }
    
  }

