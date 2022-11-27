import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { NgbCalendar, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-tareas-cliente',
  templateUrl: './tareas-cliente.component.html',
  styleUrls: ['./tareas-cliente.component.css']
})
export class TareasClienteComponent implements OnInit {
  
  public id = '';
  public token = localStorage.getItem('token');

  public task: any = { asesor: '', type: '', priority: ''};
  public btn_enviar = false;
  public taskList: Array<any> = [];
  public asesores: Array<any> = [];

  // PRE LOADER
  public load_data = true;
  public data = false;
  // PRE LOADER

  // PAGINATION
  public page = 1;
  public pageSize = 5;
  // PAGINATION

  constructor(private _route:ActivatedRoute, private cliente:ClienteService, 
              private colaborador:ColaboradorService, private calendar: NgbCalendar,
              private dateConfig: NgbDatepickerConfig) 
  {  }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      this.id = params['id'];
      this.cliente.obtener_datos_cliente_admin(this.id, this.token).subscribe(
        response => { 
          if (response.data != undefined) {
            this.data = true;
            this.load_data = false;
            this.init_asesores();
            this.init_data();
          } else {
            this.data = false;
            this.load_data = false;
          }
        } );
    }
    );
  }

  init_asesores() { this.colaborador.listar_asesores_admin(this.token).subscribe( response => { this.asesores = response.data; } ); }

  init_data() {}

  registrar() {
    this.task.time = this.time.hour+':'+(this.time.minute>9? this.time.minute:'0'+this.time.minute);
    this.task.date = this.model?.day+'-'+this.model?.month+'-'+this.model?.year;

    if(!this.task.asesor) { this.showToastMessage('Ingresar el asesor responsable', 'warning', 'Campo vacio !'); }
    else if(!this.task.task) { this.showToastMessage('Ingresar la tarea a realizar', 'warning', 'Campo vacio !'); }
    else if(!this.task.date) { this.showToastMessage('Ingresar fecha', 'warning', 'Campo vacio !'); }
    else if(!this.task.time) { this.showToastMessage('Ingresar hora', 'warning', 'Campo vacio !'); }
    else if(!this.task.type) { this.showToastMessage('Ingresar el tipo de tarea', 'warning', 'Campo vacio !'); }
    else if(!this.task.priority) { this.showToastMessage('Ingresar el nivel de prioridad', 'warning', 'Campo vacio !'); }
    else {
      this.btn_enviar = true;
      this.task.cliente = this.id;
      this.task.asesor = localStorage.getItem('_id');
      this.cliente.crear_tarea_prospeccion_admin(this.task, this.token).subscribe(
        response => {
          $('#modalTask').modal('hide');
          this.btn_enviar = false;
          this.init_data();
          this.task = { asesor: '', type: '', priority: ''};
          this.showToastMessage('Tarea registrada correctamente', 'success', 'Registro Completo');
        }
      );
    }
    
  }
  
  // DATE PICKER
  public model: NgbDateStruct = {year: 0, month: 0, day: 0};
  // public maxDate = {year: 1, month: 1, day: 1};
  selectToday() { 
    this.model = this.calendar.getToday();
  }
  // DATE PICKER  


  // TIME PICKER
  public time = { hour: 0, minute: 0 };
  currentTime() {
    let current = new Date();
    this.time = {hour: current.getHours(), minute: current.getMinutes()};
    this.dateConfig.minDate = GLOBAL.TODAY;
  }
  // TIME PICKER

  
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
    showToastMessage(message: string, type1: string, message2: string) {
      this.typeToast = type1;
      this.message2 = message2;
      this.message = message;
      this.show = true;
      setTimeout( ()=> {this.show = false;}, 2000);
    }
    // TOAST MESSAGE
  

}
