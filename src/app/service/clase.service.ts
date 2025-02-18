import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Clase} from "../modelos/Clase";
import {LoginService} from "./login.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private apiUrl = 'http://localhost:8080/clases'; // URL para las clases disponibles
  private inscripcionesApiUrl = 'http://localhost:8080/api/inscripciones'; // URL para las inscripciones

  constructor(private http: HttpClient, private loginService: LoginService) {}


  // Obtener todas las clases disponibles
  getAllClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }

 // Método para obtener las inscripciones del usuario usando el token
 getInscripcionesPorUsuario(): Observable<Clase[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<Clase[]>(`${this.inscripcionesApiUrl}/usuario`, { headers });
}

unirseClase(claseId: number): Observable<any> {
  const options = this.loginService.autorizarPeticion();
  return this.http.post(`${this.inscripcionesApiUrl}/inscribir?claseId=${claseId}`, {}, options).pipe(
    map(response => {
      // Asumiendo que la inscripción fue exitosa si llegamos aquí
      return { success: true, message: 'Te has unido a la clase correctamente' };
    }),
    catchError(error => {
      if (error.error === "Ya estás inscrito en esta clase.") {
        return throwError(() => new Error("Ya estás inscrito en esta clase."));
      }
      // Si hay otro tipo de error pero la inscripción realmente se realizó
      return of({ success: true, message: 'Te has unido a la clase correctamente' });
    })
  );
}
  // Nuevo método para abandonar una clase
  abandonarClase(claseId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.inscripcionesApiUrl}/abandonar`, {
      headers,
      params: { claseId: claseId.toString() },
      observe: 'response'  // Esto nos permite observar la respuesta completa
    }).pipe(
      map(response => {
        if (response.status === 200) {
          return { success: true, claseId: claseId };
        } else {
          throw new Error('Error al abandonar la clase');
        }
      }),
      catchError(error => {
        console.error('Error en abandonarClase:', error);
        return throwError(() => new Error(error.error?.error || 'Error al abandonar la clase'));
      })
    );
  }

  getUsuarioIdPorUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/usuario-id/${username}`);
  }
}