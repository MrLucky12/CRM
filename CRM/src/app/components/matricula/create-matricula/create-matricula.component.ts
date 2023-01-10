import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-create-matricula',
  templateUrl: './create-matricula.component.html',
  styleUrls: ['./create-matricula.component.css']
})
export class CreateMatriculaComponent implements OnInit {

  // DEFAULT DATA
  public id = '';
  public token = localStorage.getItem('token');
  public data = false;
  // DEFAULT DATA

  // LEAD
  public loadLead = true;
  public leadFilter = '';
  public leadListCosnt: Array<any> = [];
  // LEAD
  
  // CICLE
  public loadCicle = false;
  public cicleFilter = 'Todos';
  public cicleList: Array<any> = [];
  public cicleListConst: Array<any> = [];
  public url = GLOBAL.url+'get_imagen_curso/';
  // CICLE

  // CICLE PAGINATOR
  public filtroCicle = '';
  public pageCicle = 1;
  public pageCicleSize = 5;
  public levelList: Array<any> = [];
  // CICLE PAGINATOR

  // MATRICULA
  public leadList: Array<any> = [];
  public matricula:any = {source: 'Interno', scholarship: 0, channel: '',};
  public price = 0;
  public discount = 0;
  public courseList: Array<any> = [];
  // MATRICULA

  constructor(private _route:ActivatedRoute, private cliente:ClienteService, private curso:CursoService) {}

  ngOnInit(): void 
  {
    this._route.params.subscribe( params => { this.id = params['id']; });
    this.init_customer();
    this.init_course();
    setTimeout(() => { $('.selectpicker').selectpicker(); }, 150);
  }

  leadSearch() 
  {
    if (this.leadFilter) 
    {
      var term = new RegExp(this.leadFilter, 'i');
      this.leadList = this.leadListCosnt
      .filter(item => term.test(item.name) || term.test(item.lastName) || term.test(item.email) || term.test(item.n_doc));
    } 
    else { this.leadList = this.leadListCosnt; }
  }

  leadSelect(item:any) 
  {
    this.matricula.cliente = item._id;
    $('#inputLead').val(item.fullname);
  }

  init_customer() 
  {
    this.loadLead = false;
    this.cliente.listar_clientes_modal_admin(this.token)
    .subscribe(response => 
      { 
        this.leadList = response.data; 
        this.leadListCosnt = this.leadList;
        this.loadLead = true;
      }
      );
  }

  init_course() 
  { 
    this.curso.listar_cursos_modal_admin(this.token)
    .subscribe( response => 
      { 
        this.courseList = response.data; 
        setTimeout(() => { $('.selectpicker').selectpicker('refresh'); }, 150);
      } 
    ); 
  }

  selectCourse(event:any) 
  {
    let idCurso = event.target.value;
    this.loadCicle = true;
    this.curso.listar_ciclos_admin(idCurso, this.token)
    .subscribe(
      response => 
      {
        this.cicleList = [];
        response.data.forEach((element:any) => { if (element.cicle.state) {this.cicleList.push(element); } } );
        this.cicleListConst = this.cicleList;
        this.loadCicle = false;
      }
    );
    this.curso.listar_nivel_curso_admin(idCurso, this.token).subscribe( response => { this.levelList = response.data; } ); 
  }

  cicleSearch() 
  {
    if (this.cicleFilter == 'Todos') {  this.cicleList = this.cicleListConst; }
    else { this.cicleList = this.cicleListConst.filter(item => item.cicle.level == this.cicleFilter); }
  }

  cicleSelect(item:any)
  {
    // this.matricula.cicle = item._id;
    $('#inputCicle').val(item.level);
  }

  // TOAST MESSAGE
  private show: boolean = false;
  private message: string = '';
  private message2: string = '';
  private typeToast: string = '';
  // BOOLEAN GETTERS
  get alertOn(): boolean { return this.show; }
  get typeToastMessage(): string { return this.typeToast; }
  // STRING GETTERS
  toastMessage1(): string { return this.message; }
  toastMessage2(): string { return this.message2; }
  // SHOW TOAST
  showToastMessage(message: string, type1: string, message2: string) 
  {
    this.typeToast = type1;
    this.message2 = message2;
    this.message = message;
    this.show = true;
    setTimeout( ()=> {this.show = false;}, 2000);
  }
  // TOAST MESSAGE
}
