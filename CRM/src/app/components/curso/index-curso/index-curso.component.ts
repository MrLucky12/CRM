import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $: any;

@Component({
  selector: 'app-index-curso',
  templateUrl: './index-curso.component.html',
  styleUrls: ['./index-curso.component.css']
})
export class IndexCursoComponent implements OnInit {

  public token = localStorage.getItem('token');
  public courseList: Array<any> = [];
  public url = GLOBAL.url+'get_imagen_curso/';

  // PAGINATION
  public page = 1;
  public pageSize = 4;
  // PAGINATION

  constructor(private curso:CursoService) { }

  ngOnInit(): void { this.init_data(); }

  init_data() { this.curso.listar_cursos_admin(this.token).subscribe( response => { this.courseList = response.data; } ); }

  // ACTIVATE | DESACTIVATE METHOD
  public load_state = false;

  set_state(id: any, state: any) 
  {
    // console.log(id);
    // console.log(state);
    this.load_state = true;
    this.curso.cambiar_estado_curso_admin(id, {state: state}, this.token).subscribe(
      response => {
        this.load_state = false;
        $('#state-'+id).modal('hide');
        $('.modal-backdrop').remove();
        this.init_data(); 
      }
    );
  }
  // ACTIVATE | DESACTIVATE METHOD

}
