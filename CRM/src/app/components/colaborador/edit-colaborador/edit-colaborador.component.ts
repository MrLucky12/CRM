import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

@Component({
  selector: 'app-edit-colaborador',
  templateUrl: './edit-colaborador.component.html',
  styleUrls: ['./edit-colaborador.component.css']
})
export class EditColaboradorComponent implements OnInit {
  
  public id = '';
  public colaborador: any = {
    gender: '',
    role: '',
    country: ''
  };
  
  public btn_registrar = false;
  public token: any = localStorage.getItem('token');
  public load_data = false;
  public data = false;

  constructor(private _colaboradorService: ColaboradorService, private _router: Router, private _route: ActivatedRoute) { }

  

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        // console.log(params);
        this.id = params['id'];
        // console.log(this.id);
        this.load_data = true;
        this._colaboradorService.obtener_datos_colaborador_admin(this.id, this.token).subscribe(
          response => { 
            if (response.data != undefined) {
              this.colaborador = response.data;
              this.data = true;
              this.load_data = false;
            } else {
              this.data = false;
              this.load_data = false;
            }
          }
        );
      }
    );
  }

actualizar(actualizarForm: any) {


}



}
