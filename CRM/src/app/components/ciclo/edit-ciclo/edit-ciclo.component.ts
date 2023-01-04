import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ColaboradorService } from 'src/app/services/colaborador.service';
declare var $:any;

@Component({
  selector: 'app-edit-ciclo',
  templateUrl: './edit-ciclo.component.html',
  styleUrls: ['./edit-ciclo.component.css'],
    // CALENDAR
    styles: [
      `
        .custom-day {
          text-align: center;
          padding: 0.185rem 0.25rem;
          display: inline-block;
          height: 2rem;
          width: 2rem;
        }
        .custom-day.focused {
          background-color: #e6e6e6;
        }
        .custom-day.range,
        .custom-day:hover {
          background-color: rgb(2, 117, 216);
          color: white;
        }
        .custom-day.faded {
          background-color: rgba(2, 117, 216, 0.5);
        }
      `,
    ],
    // CALENDAR
})
export class EditCicloComponent implements OnInit {
  
  // DEFAULT DATA
  public id = '';
  public idciclo = '';
  public token = localStorage.getItem('token');
  // DEFAULT DATA
  
  // PRE LOADER
  public btn_load = false;
  public load_data = true;
  public data = false;
  // PRE LOADER

  public levelList: Array<any> = [];
  public teacherList: Array<any> = [];
  public cicle:any = { level: '', location: '' };

  // SEARCHER
  public teacherFilter = '';
  public teacherListCosnt: Array<any> = [];
  // SEARCHER

  public room:any = { room: '' };
  public days:Array<any> = [];
  public rooms:Array<any> = [];
  public teacherRoom:any = { ciclo_salon: '' };
  public teachersRooms:Array<any> = [];

  public today = GLOBAL.TODAY;
  public load_delete = false;

  constructor(private dateConfig :NgbDatepickerConfig, private curso:CursoService, private _route:ActivatedRoute, private routerTo:Router,
    calendar: NgbCalendar, private colaborador:ColaboradorService)
  { 
    // LA EDICION DE UN CURSO PUEDE REALIZAR EN FECHA POSTERIOR A LA ACTUAL
    // this.dateConfig.minDate = GLOBAL.TODAY;
  }

  ngOnInit(): void 
  {
    this._route.params.subscribe( 
      params => { 
        this.id = params['id']; 
        this.idciclo = params['idciclo']; 
        this.curso.listar_nivel_curso_admin(this.id, this.token).subscribe( response => { this.levelList = response.data; } ); 
        this.curso.obtener_datos_curso_ciclo_admin(this.id, this.idciclo, this.token).subscribe(
          response => { 
            console.log(response);
            if (response.data != undefined) {
              this.data = true;
              this.cicle = response.cicle;
              this.rooms = response.rooms;
              this.init_teachers();
              this.init_teacherRoom();
              // GET FROM & TO DATE
              let s = new Date(response.cicle.start_course);
              this.fromDate = new NgbDate(s.getFullYear(),s.getMonth()+1,s.getDate()+1);
              console.log(s+' | '+this.fromDate.day);
              let e = new Date(response.cicle.end_course);
              this.toDate = new NgbDate(e.getFullYear(),e.getMonth()+1,e.getDate()+1);
              console.log(e+' | '+this.toDate.day);
              // GET FROM & TO DATE
              this.load_data = false;
            } else {
              this.data = false;
              this.load_data = false;
            }
          } );
    });
  }

  actualizar() 
  {

    // DATE FORMAT
    this.cicle.start_course = this.fromDate?.year+'-'+this.fromDate?.month+'-'+this.fromDate?.day;
    this.cicle.end_course = this.toDate?.year+'-'+this.toDate?.month+'-'+this.toDate?.day;
    // DATE FORMAT

    if(!this.cicle.level) { this.showToastMessage('Ingresar el nivel del curso', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.location) { this.showToastMessage('Ingresar la sede del curso', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.price) { this.showToastMessage('Ingresar el precio del curso', 'warning', 'Campo vacio !'); }
    else if(this.cicle.price <= 0) { this.showToastMessage('Ingresar un precio valido', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.start_course || this.fromDate == undefined) { this.showToastMessage('Ingresar la fecha de inicio', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.end_course || this.toDate == undefined) { this.showToastMessage('Ingresar la fecha de finalizacion', 'warning', 'Campo vacio !'); }
    else{
      this.cicle.start_course = (this.fromDate?.year)
                                +'-'+(this.fromDate?.month<10?'0'+this.fromDate?.month:this.fromDate?.month)
                                +'-'+(this.fromDate?.day<10?'0'+this.fromDate?.day:this.fromDate?.day);

      this.cicle.end_course = (this.toDate?.year)
                                +'-'+(this.toDate?.month<10?'0'+this.toDate?.month:this.toDate?.month)
                                +'-'+(this.toDate?.day<10?'0'+this.toDate?.day:this.toDate?.day);

      this.curso.editar_ciclo_admin(this.idciclo, this.cicle, this.token).subscribe( 
        response => { 
          this.showToastMessage('Los ciclos se han actualizado correctamente', 'success', 'Actualizado !'); 
          this.routerTo.navigate(['/curso/'+this.id+'/ciclo']);
      } );
    }
  }

  newCicle() 
  {
    this.room.ciclo_curso = this.idciclo;
    this.room.days = this.days;
    this.cicle.days = this.days;
    this.cicle.room =  this.rooms;
    if (!this.room.room) { this.showToastMessage('Ingresar el salon', 'warning', 'Campo vacio !'); }
    else if (!this.room.total_capacity) { this.showToastMessage('Ingresar el aforo total', 'warning', 'Campo vacio !'); }
    else if (this.time1 == undefined || this.time1 == null || this.time2 == undefined || this.time2 == null) 
      { this.showToastMessage('Ingresar las horas de inicio y final', 'warning', 'Campo vacio !'); }
    else if (this.time1.hour > this.time2.hour) { this.showToastMessage('La hora de inicio no puede ser mayor que la hora de termino', 'warning', 'Fechas incorrectas !'); }
    else if (this.room.days.length <= 0) { this.showToastMessage('Ingresar los dias', 'warning', 'Campo vacio !'); }
    else {
      // CICLO DATA
      this.room.start_time = this.time1.hour+':'+(this.time1.minute>9? this.time1.minute:'0'+this.time1.minute);
      this.room.end_time = this.time2.hour+':'+(this.time2.minute>9? this.time2.minute:'0'+this.time2.minute);
      this.curso.agregar_salon_ciclo_admin(this.room, this.token).subscribe( response => { console.log(response); } );
      // CICLO DATA
      this.room = { room: '', };
      this.days = [];
      $('.form-check-input').prop('checked', false);
      this.init_rooms();
      console.log(this.rooms);
    }
    
  }

  deleteCicle(idx:any) 
  { 
    this.load_delete = true;
    this.curso.eliminar_salon_ciclo_admin(idx, this.token).subscribe( 
      response => 
      {
        this.showToastMessage('Dato eliminado...', 'success', 'Confirmar accion !');
        console.log(response.data);
        $('.modal-backdrop').remove();
        this.load_delete = false;
        this.init_rooms();
      } 
      ); 
  }

  teacherSearch() 
  {
    if (this.teacherFilter) 
    {
      var term = new RegExp(this.teacherFilter, 'i');
      this.teacherList = this.teacherListCosnt
      .filter(item => term.test(item.name) || term.test(item.lastName) || term.test(item.email) || term.test(item.n_doc));
    } 
    else { this.teacherList = this.teacherListCosnt; }
  }

  teacherSelect(item:any) 
  {
    this.teacherRoom.colaborador = item._id;
    $('#inputTeacher').val(item.fullname);
  }

  asignTeacherRoom() 
  {
    this.teacherRoom.ciclo_curso = this.idciclo;
    if (!this.teacherRoom.colaborador) { this.showToastMessage('Ingresar el Docente', 'warning', 'Campo vacio !'); }
    else if (!this.teacherRoom.ciclo_salon) { this.showToastMessage('Ingresar el salon', 'warning', 'Campo vacio !'); }
    else
    {
      this.curso.agregar_docente_salon_admin(this.teacherRoom, this.token)
      .subscribe( response => { this.showToastMessage('Se asigno el docente correctamente', 'success', 'Asignacion completa !'); } ); 
      this.teacherRoom.colaborador = '';
      this.teacherRoom.ciclo_salon = '';
      $('#inputTeacher').val(''); 
      this.init_teacherRoom();
    }
  }

  init_teacherRoom() { this.curso.listar_docente_salon_admin(this.idciclo, this.token).subscribe(response => { this.teachersRooms = response.data; } ); }

  init_rooms() { this.curso.obtener_salones_ciclo_admin(this.idciclo, this.token).subscribe( response => { this.rooms = response.data; }); }

  init_teachers() 
  { 
    this.colaborador.listar_docentes_admin(this.token)
    .subscribe( response => 
      { 
        this.teacherList = response.data;
        this.teacherListCosnt = this.teacherList;
      } 
    ); 
  }

  select_day(event:any) 
  {
    let status = event.currentTarget.checked;
    let value = event.target.value;
    if (status) { this.days.push(value); } 
    else {
      let indice = 0;
      this.days.forEach((element, index) => { if (element == value) { this.days.splice(index, 1); } });
    }
  }

  // TIME PICKER
  public spinners = true;
  public time1 = { hour: 0, minute: 0 };
  public time2 = { hour: 0, minute: 0 };
  currentTime() {
    this.time1 = {hour: 13, minute: 0};
    this.time2 = this.time1;
  }
  // TIME PICKER

  // DATE PICKER
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) { this.fromDate = date; }
    else if (this.fromDate && !this.toDate && date.after(this.fromDate)) { this.toDate = date; }
    else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  
  isHovered(date: NgbDate) { return ( this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate) ); }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) { return ( date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date) ); }
  // DATE PICKER

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
