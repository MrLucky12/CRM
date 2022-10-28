import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente: any = {
    gender: '',
    role: '',
    country: ''
  };
  
  public btn_actualizar = false;
  public token: any = localStorage.getItem('token');
  public id = '';
  public load_data = true;
  public data = false;

  constructor(private _route: ActivatedRoute, private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        // console.log(params);
        this.id = params['id'];
        // console.log(this.id);
        this.load_data = true;
        this._clienteService.obtener_datos_cliente_admin(this.id, this.token).subscribe(
          response => { 
            if (response.data != undefined) {
              this.cliente = response.data;
              this.data = true;
              this.load_data = false;
            } else {
              this.data = false;
              this.load_data = false;
            }
          } );
      } );
  }

  actualizar(actualizarForm: any) {
    
  }

}
