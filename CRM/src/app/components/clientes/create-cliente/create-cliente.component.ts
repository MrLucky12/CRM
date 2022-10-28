import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = {
    gender: '',
    role: '',
    country: ''
  };
  
  public btn_registrar = false;
  public token: any = localStorage.getItem('token');

  constructor( private _clienteService: ClienteService, private _router: Router) { }

  ngOnInit(): void {
  }

  registrar(registroForm: any) {
    console.log(registroForm);
    // VALIDACION DE FORMULARI | CORREO EXISTENTE | ETC?
    if (!registroForm.value.name) {
      $.notify('El campo nombre esta incompleto', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: { from: 'top',  align: 'right' },
        delay: 1000,
        animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
        });
    } else if (!registroForm.value.lastName) {
      $.notify('El campo apellido esta incompleto', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: { from: 'top',  align: 'right' },
        delay: 1000,
        animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
        });
    } else if (!registroForm.value.email) {
      $.notify('El campo email esta incompleto', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: { from: 'top',  align: 'right' },
        delay: 1000,
        animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
        });
    } else if (!registroForm.value.gender) {
      $.notify('El campo genero esta incompleto', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: { from: 'top',  align: 'right' },
        delay: 1000,
        animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
        });
    } else if (!registroForm.value.phone) {
      $.notify('El campo telefono esta incompleto', { 
        type: 'danger',
        spacing: 10,                    
        timer: 2000,
        placement: { from: 'top',  align: 'right' },
        delay: 1000,
        animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
        });
    } else {
      this.btn_registrar = true;
      this.cliente.asesor = localStorage.getItem('_id');
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
          response=>{ 
            if (response.data == undefined) {
              $.notify(response.message, { 
                type: 'danger',
                spacing: 10,                    
                timer: 2000,
                placement: { from: 'top',  align: 'right' },
                delay: 1000,
                animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
                });
                this.btn_registrar = false;
            } else {  
              this.btn_registrar = false;
              $.notify('Cliente agregado exitosamente !', { 
                type: 'success',
                spacing: 10,                    
                timer: 2000,
                placement: { from: 'top',  align: 'right' },
                delay: 1000,
                animate: { enter: 'animated ' + 'bounce', exit: 'animated ' + 'bounce' }
                });
                this._router.navigate(['/cliente']);
            }
          }); 
    }
  }


}
