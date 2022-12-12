import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-llamadas-cliente',
  templateUrl: './llamadas-cliente.component.html',
  styleUrls: ['./llamadas-cliente.component.css']
})
export class LlamadasClienteComponent implements OnInit {

  public id = '';
  public call:any = { result: '', };
  public btn_load = false;
  public token = localStorage.getItem('token');
  public callList: Array<any> = [];

  // PAGINATION
  public page = 1;
  public pageSize = 5;
  // PAGINATION

  // PRE LOADER
  public load_data = true;
  public data = false;
  // PRE LOADER

  public status: Array<any> = ['Ocupado','Conectado','Dejo mensaje', 'Sin respuesta', 'N° Incorrecto', 'Prox. llamada', 'Venta cerrada'];

  constructor(private _route:ActivatedRoute, private _clienteService:ClienteService, 
    private calendar: NgbCalendar, private dateConfig: NgbDatepickerConfig) { }

  ngOnInit(): void {
    this._route.params.subscribe( params => { 
      this.id = params['id'];
      this._clienteService.obtener_datos_cliente_admin(this.id, this.token).subscribe(
        response => { 
          if (response.data != undefined) {
            this.data = true;
            this.load_data = false;
            this.init_data();
          } else {
            this.data = false;
            this.load_data = false;
          }
        } );
    } );
  }

  // SHOW CALL LOG
  init_data() {
    this._clienteService.listar_llamadas_prospeccion_admin(this.id, this.token).subscribe( response => { this.callList = response.data; } );
  }
  // SHOW CALL LOG


  // CREATE NEW CALL
  registrar() {
    this.call.time = this.time.hour+':'+(this.time.minute>9? this.time.minute:'0'+this.time.minute);
    this.call.date = this.model?.day+'-'+this.model?.month+'-'+this.model?.year;
    if(!this.call.date) { this.showToastMessage('Ingresar correctamente la fecha', 'warning', 'Cuidado!'); }
    else if(!this.call.result){ this.showToastMessage('Ingresar correctamente el resultado', 'warning', 'Cuidado!'); }
    else if(!this.call.time){ this.showToastMessage('Ingresar correctamente la hora', 'warning', 'Cuidado!'); }
    else {
      this.btn_load = true;
      this.call.cliente = this.id;
      this.call.asesor = localStorage.getItem('_id');
      this._clienteService.crear_llamada_prospeccion_admin(this.call, this.token).subscribe(
        response => {
          $('#modalCall').modal('hide');
          this.btn_load = false;
          this.init_data();
          this.call = { result: '', };
          this.showToastMessage('Llamada registrada correctamente', 'success', 'Registro Completo');
        }
      );
    }
  }
  // CREATE NEW CALL

  // TIME PICKER
  public spinners = false;
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

  // DATE PICKER
  public model: NgbDateStruct | undefined;
	public date = { year: 2022, month: 10 };
  // public maxDate = {year: 1, month: 1, day: 1};
  selectToday() {
    this.model = this.calendar.getToday();
	}
  // DATE PICKER

}
