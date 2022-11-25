import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $:any;

@Component({
  selector: 'app-correo-cliente',
  templateUrl: './correo-cliente.component.html',
  styleUrls: ['./correo-cliente.component.css']
})
export class CorreoClienteComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');

  public email: any = {};
  public btn_enviar = false;
  public emailList: Array<any> = [];

  // PRE LOADER
  public load_data = true;
  public data = false;
  // PRE LOADER

  // PAGINATION
  public page = 1;
  public pageSize = 5;
  // PAGINATION

constructor(private _route:ActivatedRoute, private _clienteService:ClienteService) { }

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
    }
    );
  }

  init_data() {  this._clienteService.listar_correos_prospeccion_admin(this.id, this.token).subscribe( response => { this.emailList = response.data; } ); }

  enviarCorreo() {
    console.log(this.email);
    if(!this.email.subject){ this.showToastMessage('Ingresar el asunto', 'warning', 'Campo vacio !'); }
    else if(!this.email.body){ this.showToastMessage('Ingresar contenido', 'warning', 'Campo vacio !'); }
    else {
      this.btn_enviar = true;
      this.email.cliente = this.id;
      this.email.asesor = localStorage.getItem('_id');
      this._clienteService.crear_correo_prospeccion_admin(this.email, this.token).subscribe(
        response => {
          $('#modalCorreo').modal('hide');
          this.btn_enviar = false;
          this.init_data();
          this.showToastMessage('Se envio el correo al cliente', 'success', 'Correo enviado !');
          // window.location.reload();
        }
      );
    }
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
  showToastMessage(message: string, type1: string, message2: string) {
    this.typeToast = type1;
    this.message2 = message2;
    this.message = message;
    this.show = true;
    setTimeout( ()=> {this.show = false;}, 2000);
  }
  // TOAST MESSAGE


}
