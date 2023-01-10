import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-index-ciclo',
  templateUrl: './index-ciclo.component.html',
  styleUrls: ['./index-ciclo.component.css']
})
export class IndexCicloComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');
  public levelList: Array<any> = [];
  public course: any = {};
  public cicles: Array<any> = [];
  public ciclesFilter: Array<any> = [];
  public filter = 'Todos';
  public url = GLOBAL.url+'get_imagen_curso/';

  // PRE LOADER
  public load_data = true;
  public data = false;
  // PRE LOADER

  constructor(private curso:CursoService, private _route:ActivatedRoute, private routerTo:Router) { }

  ngOnInit(): void {
    this._route.params.subscribe( 
      params => { 
        this.id = params['id'];
        console.log(this.id);        
        this.curso.listar_nivel_curso_admin(this.id, this.token).subscribe( response => { this.levelList = response.data; } ); 
        this.curso.obtener_datos_curso_admin(this.id, this.token)
        .subscribe(
          response => 
          { 
            if (response.data != undefined) 
            {
              this.data = true;
              this.load_data = false;
              this.init_data();
              this.course = response.data;
            }
            else 
            {
              this.data = false;
              this.load_data = false;
            }
          } 
        );
    });
  }

  init_data() 
  {
    this.curso.listar_ciclos_admin(this.id, this.token)
    .subscribe( 
      response => 
      { 
        this.cicles = response.data; 
        // REVISAR CREAR CURSO POR SI HAY ERROR AL GUARDAR EL ID CURSO
        // this.cicles = this.cicles.filter(item => item.cicle.course._id == this.id);
        this.ciclesFilter = this.cicles;
      }
    );
  }

  filtrar() 
  {
    if (this.filter == 'Todos') {  this.cicles = this.ciclesFilter; }
    else { this.cicles = this.ciclesFilter.filter(item => item.cicle.level == this.filter); }
  }

  // ACTIVATE | DESACTIVATE METHOD
  public load_state = false;

  set_state(id: any, state: any) 
  {
    this.load_state = true;
    this.curso.cambiar_estado_ciclo_admin(id, {state: state}, this.token)
    .subscribe(
      response => 
      {
        this.load_state = false;
        // $('#state-'+id).modal('hide');
        $('.modal-backdrop').remove();
        this.init_data(); 
      }
    );
  }
  // ACTIVATE | DESACTIVATE METHOD

}
