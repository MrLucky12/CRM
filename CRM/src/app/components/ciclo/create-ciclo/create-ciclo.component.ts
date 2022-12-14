import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $:any;

@Component({
  selector: 'app-create-ciclo',
  templateUrl: './create-ciclo.component.html',
  styleUrls: ['./create-ciclo.component.css'],
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
export class CreateCicloComponent implements OnInit {

  // DEFAULT DATA
  public id = '';
  public token = localStorage.getItem('token');
  // DEFAULT DATA
  
  // PRE LOADER
  public btn_load = false;
  public load_data = true;
  public data = false;
  // PRE LOADER

  public levelList: Array<any> = [];
  public cicle:any = {
    level: '',
    location: '',
  };

  public room:any = { room: '', };
  public days:Array<any> = [];
  public rooms:Array<any> = [];

  public today = GLOBAL.TODAY;

  constructor(private dateConfig :NgbDatepickerConfig, private curso:CursoService, private _route:ActivatedRoute, private routerTo:Router) 
  { 
    this.dateConfig.minDate = GLOBAL.TODAY;
    this.currentTime();
    // this.cicleTest();
  }

  ngOnInit(): void {
    this._route.params.subscribe( 
      params => { 
        this.id = params['id']; 
        this.curso.listar_nivel_curso_admin(this.id, this.token).subscribe( response => { this.levelList = response.data; } ); 
        this.curso.obtener_datos_curso_admin(this.id, this.token).subscribe(
          response => 
          { 
            if (response.data != undefined) 
            {
              this.data = true;
              this.load_data = false;
            }
            else 
            {
              this.data = false;
              this.load_data = false;
            }
          }
        );
      }
    );
  }

  registrar()
  {
    // CURSO DATA
    this.cicle.course = this.id;
    this.cicle.room = this.rooms
    // DATE FORMAT
    // let day1 = (this.fromDate?.day == undefined ? 1:this.fromDate?.day)< 10? '0'+this.fromDate?.day:2;
    this.cicle.start_course = this.fromDate?.year+'-'+this.fromDate?.month+'-'+this.fromDate?.day;
    this.cicle.end_course = this.toDate?.year+'-'+this.toDate?.month+'-'+this.toDate?.day;
    // DATE FORMAT

    // CURSO DATA

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

      this.curso.crear_ciclo_admin(this.cicle, this.token).subscribe( response => { 
        this.showToastMessage('Los ciclos se han registrado correctamente', 'success', 'Regsitrado !'); 
        this.routerTo.navigate(['/curso/'+this.id+'/ciclo']);
      } );
    }
    
  }

  newCicle() {
    this.room.days = this.days;
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
      this.cicle.days = this.days;
      this.rooms.push(this.room);
      this.cicle.room =  this.rooms;
      // CICLO DATA
      this.room = { room: '', };
      this.days = [];
      $('.form-check-input').prop('checked', false);
      console.log(this.rooms);
    }
    
  }

  deleteCicle(idx:any) { this.rooms.splice(idx,1); }

  cicleTest() {
    this.room.room = 'Salon 1';
    this.room.total_capacity = 35;;
    this.room.start_time = '13:00';
    this.room.end_time = '15:00';
    this.room.days = ['Lunes', 'Miercoles'];
    this.rooms.push(this.room);
  }

  select_day(event:any) {
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
  currentTime()
  {
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
