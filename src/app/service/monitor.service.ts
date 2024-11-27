import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/Cliente'; // Asegúrate de tener el modelo Cliente

@Injectable({
  providedIn: 'root'
})
export class MonitorService {


  private apiUrl = 'http://localhost:8080/cliente'; // Asegúrate de tener esto configurado en environment.ts

  constructor(private http: HttpClient) {}

  getMonitores(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/monitores`); // Llama a tu nuevo endpoint
  }

  createMonitor(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateMonitor(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteMonitor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}