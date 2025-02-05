import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, catchError, tap, throwError} from "rxjs";
import {Login} from "../modelos/Login";
import {RegistroCliente} from "../modelos/RegistroCliente";
import {Router} from "@angular/router";

import { Cliente } from '../modelos/Cliente';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private Localhost= "http://localhost:8080/"

  private apiLoginUrl = 'auth/login';
  private apiRegistroUrl = 'auth/register';

  constructor(private http: HttpClient, private router: Router) {}


 


  login(login: Login): Observable<any> {
    return this.http.post(`${this.Localhost}${this.apiLoginUrl}`, login).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logueado(): boolean {
    let token = localStorage.getItem('token');
    return !!(token && token != '');
  }



  
  // Nuevo método para obtener el ID del usuario del token
  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.tokenDataDTO?.id || null;
    }
    return null;
  }

  // Nuevo método para obtener el username del token
  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.tokenDataDTO?.username || null;
    }
    return null;
  }

    // Método para obtener el token
    getToken(): string | null {
      return localStorage.getItem('token');
    }

   // Método para obtener el rol decodificando el token

   getUserRole(): string | null {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
    if (token) {
      const decoded: any = jwtDecode(token);  // Decodificar el token
      console.log('Decoded JWT:', decoded);    // Imprimir el contenido del token decodificado en la consola
      return decoded.tokenDataDTO?.rol || null;  // Retorna el rol del usuario dentro de tokenDataDTO
    }
    return null;
  }

  // Método para verificar si el usuario es administrador

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN';  // Comparar con 'ADMIN'
  }

  // Método para verificar si el usuario es cliente
  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'USUARIO';  // Comparar con 'USUARIO'
  }
  
  isMonitor(): boolean {
    const role = this.getUserRole();
    return role === 'MONITOR';  // Comparar con 'MONITOR'
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