import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CursoService } from 'src/app/services/curso.service';
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
  // DEFAULT DATA

  // SEARCHER
  public leadFilter = '';
  public leadListCosnt: Array<any> = [];
  // SEARCHER

  public leadList: Array<any> = [];
  public matricula:any = {
    source: 'Interno',
    scholarship: 0,
    channel: '',
  };
  public price = 0;
  public discount = 0;
  public courseList: Array<any> = [];

  // PRE LOADER
  public loadLead = true;
  public data = false;
  // PRE LOADER

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
    this.cliente.listar_clientes_modal_admin(this.token)
    .subscribe(response => 
      { 
        this.leadList = response.data; 
        this.leadListCosnt = this.leadList;
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

  // SELECTPICKER

  // SELECTPICKER

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
