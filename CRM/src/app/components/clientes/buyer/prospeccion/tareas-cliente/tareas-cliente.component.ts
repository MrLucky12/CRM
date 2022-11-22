import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tareas-cliente',
  templateUrl: './tareas-cliente.component.html',
  styleUrls: ['./tareas-cliente.component.css']
})
export class TareasClienteComponent implements OnInit {
  
  public id = '';

  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => { this.id = params['id']; }
    );
  }

}
