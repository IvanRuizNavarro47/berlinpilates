import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Monitor} from "../modelos/Monitor";
import {LoginService} from "./login.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private apiUrl = environment.apiUrl + '/monitores';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  obtenerDatos(): Observable<Monitor[]> {
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Monitor[]>(`${this.apiUrl}`, options);
  }

  solitarEntrenadorPersonal(): Observable<Monitor>{
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Monitor>(`${this.apiUrl}`+"/personal", options);
  }

  getEntrenadorPersonal(): Observable<Monitor>{
    const options = this.loginService.autorizarPeticion();
    return this.http.get<Monitor>(`${this.apiUrl}`+"/personal/get", options);
  }

}