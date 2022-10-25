import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public token = localStorage.getItem('token');
  public clientes: Array<any> = [];
  public clientes_const: Array<any> = [];

  public filtro = '';
  public page = 1;
  public pageSize = 10;

  public load_state = false;

  constructor(private _clienteService: ClienteService, private _router: Router) { }

  ngOnInit(): void {
  }

  init_data() {
    if (this.filtro) {
      this._router.navigate(['/cliente'], {queryParams: {filter: this.filtro}});
    } else {
      
    }
  }

  filtrar() {
    if (this.filtro) {
      this._clienteService.listar_clientes_admin(this.filtro, this.token).subscribe(
        response => {
          this.clientes = response.data;
        }
      );
    }
  }

  set_state(id: any, state: any) {}

}
