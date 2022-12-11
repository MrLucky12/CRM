import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
declare var $:any;

@Component({
  selector: 'app-create-curso',
  templateUrl: './create-curso.component.html',
  styleUrls: ['./create-curso.component.css']
})
export class CreateCursoComponent implements OnInit {

  public id = '';
  public newCourse:any = {};
  public banner:File | any = undefined;

  public btn_load = false;
  public token = localStorage.getItem('token');

  constructor(private curso:CursoService, private _router:Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  registro() {
    if (!this.newCourse.title) { this.showToastMessage('Campo vacio !', 'warning', 'Debe colocar el titulo del curso'); }
    else if (!this.newCourse.description) { this.showToastMessage('Campo vacio !', 'warning', 'Debe colocar una descripcion al curso'); }
    else if (this.banner == undefined) { this.showToastMessage('Campo vacio !', 'warning', 'Debe colocar una portada al curso'); }
    else {
      this.btn_load = true;
      this.curso.registro_curso_base_admin(this.newCourse, this.token).subscribe(
        response => {
          this.btn_load = false;
          this.showToastMessage('Registro exitoso !', 'success', 'El curso se ha registrado exitosamente'); 
          this._router.navigate(['/curso']);
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
          this.newCourse.banner = this.banner;
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
