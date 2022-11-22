import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correo-cliente',
  templateUrl: './correo-cliente.component.html',
  styleUrls: ['./correo-cliente.component.css']
})
export class CorreoClienteComponent implements OnInit {

  public id = '';

  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => { this.id = params['id']; }
    );
  }

}
