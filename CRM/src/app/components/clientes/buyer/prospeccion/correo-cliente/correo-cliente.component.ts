import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-correo-cliente',
  templateUrl: './correo-cliente.component.html',
  styleUrls: ['./correo-cliente.component.css']
})
export class CorreoClienteComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');

  // PRE LOADER
  public load_data = true;
  public data = false;
  // PRE LOADER

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

  init_data() {

  }

}
