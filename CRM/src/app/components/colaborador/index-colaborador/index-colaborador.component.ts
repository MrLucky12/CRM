import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/colaborador.service';
declare var $: any;

@Component({
  selector: 'app-index-colaborador',
  templateUrl: './index-colaborador.component.html',
  styleUrls: ['./index-colaborador.component.css']
})
export class IndexColaboradorComponent implements OnInit {

  public token = localStorage.getItem('token');
  public colaboradores: Array<any> = [];
  public colaboradores_const: Array<any> = [];

  // PAGINATION
  public filtro = '';
  public page = 1;
  public pageSize = 10;
  // PAGINATION

  public load_state = false;

  constructor(private _colaboradorService: ColaboradorService) { }

  ngOnInit(): void { this.init_data(); }

  init_data() { 
    this._colaboradorService.listar_colaboradores_admin(this.token).subscribe( 
      response => {
          this.colaboradores = response.data;
          this.colaboradores_const = this.colaboradores;
          console.log(this.colaboradores);
      } ); 
  }
  
  filtrar() {
    if (this.filtro) {
      var term = new RegExp(this.filtro, 'i');
      this.colaboradores = this.colaboradores_const
      .filter(item => term.test(item.name) || term.test(item.lastName) || term.test(item.email) || term.test(item.n_doc));
    } 
    else { this.colaboradores = this.colaboradores_const; }
  }


  // AGREGAR BOTON PARA RESTABLECER LA TABLA ORIGINAL (CLICK)="ELIMINAR BUSQUEDA | REESTABLECER"

  set_state(id: any, state: any) {
    // console.log(id);
    // console.log(state);
    this.load_state = true;
    this._colaboradorService.cambiar_estado_colaborador_admin(id, {state: state}, this.token).subscribe(
      response => {
        this.load_state = false;
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').remove();
        this.init_data(); 
      }
    );

  }


  }

