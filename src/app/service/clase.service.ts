import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clase} from "../modelos/Clase";
import {LoginService} from "./login.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private apiUrl = environment.apiUrl; // Asegúrate de tener esto configurado en environment.ts

  constructor(private http: HttpClient, private loginService:LoginService) {}

  obtenerPorFecha(fecha:string): Observable<Clase[]> {

    const options = this.loginService.autorizarPeticion();

    return this.http.get<Clase[]>(`${this.apiUrl}`+ '/fecha?fecha=' +fecha, options);
  }

  getAllClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

  asitir(idClase:number): Observable<any>{
    const options = this.loginService.autorizarPeticion();

    return this.http.post(this.apiUrl+ "/join/" + idClase , [], options);

  }


  

  borrarse(idClase:number): Observable<any>{
    const options = this.loginService.autorizarPeticion();

    return this.http.post(this.apiUrl+ "/abandon/" + idClase , [], options);

  }




}