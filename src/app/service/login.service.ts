import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, catchError, throwError} from "rxjs";
import {Login} from "../modelos/Login";
import {RegistroCliente} from "../modelos/RegistroCliente";
import {Router} from "@angular/router";
import { Cliente } from '../modelos/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Localhost= "http://localhost:8080/"

  private apiLoginUrl = 'auth/login';
  private apiRegistroUrl = 'auth/register';

  constructor(private http: HttpClient, private router: Router) {}


 


  login(login:Login): Observable<any> {
    return this.http.post(`${this.Localhost}${this.apiLoginUrl}`, login);
  }

  logueado(): boolean {
    let token = localStorage.getItem('token');
    return !!(token && token != '');
  }

  registrarCliente(data:RegistroCliente): Observable<any>{
    return this.http.post(`${this.Localhost}${this.apiRegistroUrl}`, data);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  autorizarPeticion(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return {headers:headers}
  }





}