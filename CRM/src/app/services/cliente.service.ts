import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url = GLOBAL.url;

  constructor(private _http:HttpClient) { 
    console.log(this.url);
  }
  
  registro_cliente_admin(data: any, token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_cliente_admin', data, {headers:headers});
  }

  validar_correo_verificacion(token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'validar_correo_verificacion/'+token, {headers:headers});
  }

  listar_clientes_admin(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_clientes_admin/'+filtro, {headers:headers});
  }

  obtener_datos_cliente_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_datos_cliente_admin/'+id, {headers:headers});
  }

  editar_cliente_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'editar_cliente_admin/'+id, data, {headers:headers});
  }

}