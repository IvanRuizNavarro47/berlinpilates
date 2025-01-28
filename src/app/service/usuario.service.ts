// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private baseUrl = 'http://localhost:8080/cliente';
  
    constructor(private http: HttpClient) {}
  
    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
    }
  }