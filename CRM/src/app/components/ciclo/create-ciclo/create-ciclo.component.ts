import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

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

  public id = '';
  public token = localStorage.getItem('token');

  public btn_load = false;

  public levelList: Array<any> = [];
  public cicle:any = {
    level : '',
    location: '',
  };

  public today = GLOBAL.TODAY;

  constructor(private dateConfig :NgbDatepickerConfig, private curso:CursoService, private _route:ActivatedRoute) { this.dateConfig.minDate = GLOBAL.TODAY; }

  ngOnInit(): void {
    this._route.params.subscribe( params => { this.id = params['id']; });
    this.curso.listar_nivel_curso_admin(this.id, this.token).subscribe( response => { this.levelList = response.data; } ); 
  }

  registrar() {
    this.cicle.course = this.id;
    this.cicle.start_course = this.fromDate?.day+'-'+this.fromDate?.month+'-'+this.fromDate?.year;
    this.cicle.end_course = this.toDate?.day+'-'+this.toDate?.month+'-'+this.toDate?.year;

    if(!this.cicle.level) { this.showToastMessage('Ingresar el nivel del curso', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.location) { this.showToastMessage('Ingresar la sede del curso', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.price) { this.showToastMessage('Ingresar el precio del curso', 'warning', 'Campo vacio !'); }
    else if(this.cicle.price <= 0) { this.showToastMessage('Ingresar un precio valido', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.start_course || this.fromDate == undefined) { this.showToastMessage('Ingresar la fecha de inicio', 'warning', 'Campo vacio !'); }
    else if(!this.cicle.end_course || this.toDate == undefined) { this.showToastMessage('Ingresar la fecha de finalizacion', 'warning', 'Campo vacio !'); }
    else{
      console.log(this.cicle);
    }
    
  }

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
