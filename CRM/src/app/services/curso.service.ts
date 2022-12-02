import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  public url = GLOBAL.url;

  constructor(private _http:HttpClient) { }

  registro_curso_base_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    let  fd = new FormData();
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('banner', data.banner);
    return this._http.post(this.url+'registro_curso_base_admin/', fd, {headers: headers});
  }

  listar_cursos_admin(token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_cursos_admin', {headers:headers});
  }
  
}
