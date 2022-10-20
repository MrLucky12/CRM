import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public user: any = {};
    
  constructor() { 
    let str_user: any =localStorage.getItem('user');
    this.user = JSON.parse(str_user);
    console.log(this.user);
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

}
