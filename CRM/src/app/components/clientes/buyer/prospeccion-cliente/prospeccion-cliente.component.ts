import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prospeccion-cliente',
  templateUrl: './prospeccion-cliente.component.html',
  styleUrls: ['./prospeccion-cliente.component.css']
})
export class ProspeccionClienteComponent implements OnInit {

  public id= "";

  constructor(private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => { this.id = params['id']; }
    );
  }

}
