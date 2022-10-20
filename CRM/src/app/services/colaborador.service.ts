import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  public url = GLOBAL.url;

  constructor(private _http:HttpClient) { 
    console.log(this.url);
  }

  // METODO PARA COMUNICAR EL LOGIN FRONT CON EL END
  login_admin(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+'login_admin', data, {headers:headers});
  }

}
