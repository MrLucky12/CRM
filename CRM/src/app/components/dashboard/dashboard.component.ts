import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _testService:TestService) {

   }

  ngOnInit(): void {
    this._testService.prueba_test().subscribe(
      response=>{console.log(response);},
        error=>{console.log(error);}
    );
  }

}
