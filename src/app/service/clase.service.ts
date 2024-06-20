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

  private apiUrl = 'http://localhost:8080/clases'; // Asegúrate de tener esto configurado en environment.ts

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


  unirseClase(claseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${claseId}/unirse`, {});
  }

  borrarse(idClase:number): Observable<any>{
    const options = this.loginService.autorizarPeticion();

    return this.http.post(this.apiUrl+ "/abandon/" + idClase , [], options);

  }

  createClase(clase: Clase): Observable<Clase> {
    return this.http.post<Clase>(`${this.apiUrl}/crear`, clase);
  }

  deleteClase(claseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${claseId}`);
  }


}