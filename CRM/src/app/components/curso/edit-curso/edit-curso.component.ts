import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {

  public id = '';
  public token = localStorage.getItem('token');
  public btn_load = false;
  
  public banner:File | any = undefined;
  public Course:any = {};

  constructor(private curso:CursoService, private _route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void { 
    this._route.params.subscribe( params => { this.id = params['id']; });
    this.init_data();
  }

  init_data() { 
    this.curso.obtener_datos_curso_admin(this.id, this.token).subscribe(
      response => { 
        this.Course = response.data;
        this.Course.banner = undefined;
      }); 
  }

  actualizar() {
    if (!this.Course.title) { this.showToastMessage('Campo vacio !', 'warning', 'Debe colocar el titulo del curso'); }
    else if (!this.Course.description) { this.showToastMessage('Campo vacio !', 'warning', 'Debe colocar una descripcion al curso'); }
    else {
      this.btn_load = true;
      this.curso.editar_curso_base_admin(this.id, this.Course, this.token).subscribe(
        response => {
          this.btn_load = false;
          this.showToastMessage('Actualizacion exitoso !', 'success', 'El curso se ha actualizado exitosamente'); 
          this.router.navigate(['/curso']);
        }
      );
    }
  }

  fileEventChange(event:any):void{
    var file:any;

    if (event.target.files && event.target.files[0]) {
        file = <File>event.target.files[0];
      //  MAX FILE SIZE [5MB]
      if (file.size <= 3500000) { 
        if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg') {
          this.banner = file;
          this.Course.banner = this.banner;
        }
        else {
          this.showToastMessage('Formato invalido', 'danger', 'Solo se aceptan formato de imagenes'); 
          this.banner = undefined;
        }
      }
      else{ 
        this.showToastMessage('Archivo muy pesado', 'danger', 'La imagen no debe superar los 5MB');
        this.banner = undefined;
      }
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
    this.message2 = message;
    this.message = message2;
    this.show = true;
    setTimeout( ()=> {this.show = false;}, 2000);
  }
  // TOAST MESSAGE


}
