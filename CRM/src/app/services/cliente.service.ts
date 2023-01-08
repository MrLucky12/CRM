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
  
  // ------------------- CUSTOMER ------------------
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

  cambiar_tipo_cliente_admin(data: any, token: any):Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'cambiar_tipo_cliente_admin/', data, {headers:headers});
  }

  listar_clientes_modal_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_clientes_modal_admin/', {headers:headers});
  }
  // ------------------- CUSTOMER ------------------


  // ------------------- CALL ------------------
  crear_llamada_prospeccion_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'crear_llamada_prospeccion_admin', data, {headers:headers});
  }

  listar_llamadas_prospeccion_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_llamadas_prospeccion_admin/'+id, {headers:headers});
  }
  // ------------------- CALL ------------------


  // ------------------- EMAIL ------------------
  crear_correo_prospeccion_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'crear_correo_prospeccion_admin', data, {headers:headers});
  }

  listar_correos_prospeccion_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_correos_prospeccion_admin/'+id, {headers:headers});
  }
  // ------------------- EMAIL ------------------

  
  // ------------------- TASK ------------------
  crear_tarea_prospeccion_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'crear_tarea_prospeccion_admin', data, {headers:headers});
  }

  listar_tareas_prospeccion_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_tareas_prospeccion_admin/'+id, {headers:headers});
  }

  marcar_tarea_prospeccion_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'marcar_tarea_prospeccion_admin/'+id, {}, {headers:headers});
  }
  // ------------------- TASK ------------------
  
  // ------------------- ACTIVITY ------------------
  listar_actividades_prospeccion_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_actividades_prospeccion_admin/'+id, {headers:headers});
  }
  // ------------------- ACTIVITY ------------------


}
