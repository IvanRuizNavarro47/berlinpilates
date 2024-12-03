import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monitor } from '../modelos/Monitor';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private apiUrl = 'http://localhost:8080/cliente';  // URL del backend para crear un monitor

  constructor(private http: HttpClient) { }

  // Método para obtener todos los monitores
  getMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(`${this.apiUrl}/monitores`);
  }

  // Método para registrar un monitor
  registrarMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(this.apiUrl, monitor);  // Se manda el objeto monitor (que incluye usuarioDTO)
  }
}
