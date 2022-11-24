import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public user: any = {};
    
  constructor(private _router: Router) { 
    let str_user: any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
    console.log(this.user);
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    // setTimeout( ()=> {localStorage.clear();}, 500);
    // setTimeout( ()=> {this._router.navigate(['/']);}, 500);
    window.location.reload();
    this._router.navigate(['/']);
    // this._router.navigate(['/']);
    // setTimeout( ()=> {window.location.reload();}, 500);
  }

}
