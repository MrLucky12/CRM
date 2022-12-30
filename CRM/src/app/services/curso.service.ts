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

  // COURSE
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
  
  obtener_datos_curso_admin(id: any, token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_datos_curso_admin/'+id, {headers:headers});
  }

  editar_curso_base_admin(id: any, data: any, token: any): Observable<any> {
    if (data.banner != undefined) {
      let headers = new HttpHeaders({'Authorization': token});
      let  fd = new FormData();
      fd.append('title', data.title);
      fd.append('description', data.description);
      fd.append('banner', data.banner);
      return this._http.put(this.url+'editar_curso_base_admin/'+id, fd, {headers: headers});  
    } 
    else {
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'editar_curso_base_admin/'+id, data, {headers:headers});
    }
    
  }

  cambiar_estado_curso_admin(id: any, data :any, token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_estado_curso_admin/'+id, data, {headers:headers});
  }
  // COURSE


  // COURSE LEVEL
  registro_nivel_curso_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_nivel_curso_admin', data, {headers:headers});
  }

  listar_nivel_curso_admin(id: any, token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_nivel_curso_admin/'+id, {headers:headers});
  }

  // COURSE LEVEL

  // CICLE CICLE
  crear_ciclo_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'crear_ciclo_admin', data, {headers: headers}); 
  }

  listar_ciclos_admin(token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_ciclos_admin', {headers:headers});
  }

  listar_ciclos_vencidos_admin(token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_ciclos_vencidos_admin', {headers:headers});
  }

  obtener_datos_curso_ciclo_admin(id: any, idciclo: any, token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_datos_curso_ciclo_admin/'+id+'/'+idciclo, {headers:headers});
  }

  editar_ciclo_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'editar_ciclo_admin/'+id, data, {headers:headers});
  }
  // cicle CICLE


}
