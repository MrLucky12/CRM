import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-llamadas-cliente',
  templateUrl: './llamadas-cliente.component.html',
  styleUrls: ['./llamadas-cliente.component.css']
})
export class LlamadasClienteComponent implements OnInit {

  public id = '';
  public call:any = {
    result: '',
  };
  public time = { hour: 0, minute: 0 };
  public btn_load = false;
  public token = localStorage.getItem('token');
  // TOAST MESSAGE
  private show: boolean = false;
  private message: string = '';

  constructor(private _route:ActivatedRoute, private _clienteService:ClienteService) { }

  ngOnInit(): void {
    this._route.params.subscribe( params => { this.id = params['id']; } );
  }
  
  registrar() {
    // console.log(this.time);
    this.call.time = this.time.hour+':'+(this.time.minute>9? this.time.minute:'0'+this.time.minute);
    this.call.date = new Date().toLocaleDateString();
    if(!this.call.date) { this.toastMessage('Ingresar correctamente la fecha'); }
    else if(!this.call.result){ this.toastMessage('Ingresar correctamente el resultado'); }
    else if(!this.call.time){ this.toastMessage('Ingresar correctamente la hora'); }
    else {
      this.btn_load = true;
      this._clienteService.crear_llamada_prospeccion_admin(this.call, this.token).subscribe(
        response => {
          console.log(response);
          this.btn_load = false;
        }
      );
    }
  }

  // GET CURRENTTIME EVERY NEW CALL
  currentTime() {
    let current = new Date();
    this.time = {hour: current.getHours(), minute: current.getMinutes()};
  }
  // CONDITION TO SHOW TOAST MESSAGE
  get alertOn(): boolean { return this.show; }
  showMessage(): string { return this.message; }  
  toastMessage(message: string) {
    this.message = message;
    this.show = true;
    setTimeout( ()=> {this.show = false;}, 2000);
  }
  // ACTUAL DATE ON MODAL NEW CALL
  // THIS METHOS IS NOT RECOGNIZE BUT SET CURRENT DATE
  currentDate() {
    $(document).ready( function() {
      var now = new Date();
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      var today = now.getFullYear()+"-"+(month)+"-"+(day);
      $('#datePicker').val(today);
  });
  }

}
