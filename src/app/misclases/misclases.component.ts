import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ClaseService } from '../service/clase.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { Clase } from '../modelos/Clase';


@Component({
  selector: 'app-misclases',
  templateUrl: './misclases.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule],
  styleUrls: ['./misclases.component.scss'],
})
export class MisClasesComponent implements OnInit {
  clases: Clase[] = [];

  constructor(
    private inscripcionesService: ClaseService
  ) {}

  ngOnInit(): void {
    this.getInscripcionesPorUsuario();  // Llamada al método para obtener las clases
  }

  getInscripcionesPorUsuario(): void {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar el token para obtener el username
      const decodedToken: any = jwtDecode(token);
      const username = decodedToken.tokenDataDTO?.username;  // Asegúrate de que el username esté en decodedToken

      if (username) {
        // Obtener las inscripciones del usuario usando el usuarioId
        this.inscripcionesService.getInscripcionesPorUsuario(username).subscribe(
          (clases) => {
            this.clases = clases;
          },
          (error) => {
            console.error('Error al obtener las clases:', error);
          }
        );
      }
    }
  }
}