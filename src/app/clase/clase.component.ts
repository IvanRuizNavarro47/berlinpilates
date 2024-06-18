// clase.component.ts

import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule, DatePipe } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { ClaseService } from "../service/clase.service";
import { FormsModule } from "@angular/forms";
import { Clase, TipoClase } from "../modelos/Clase";

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule],
  providers: [ClaseService, DatePipe]
})
export class ClaseComponent implements OnInit {
  clases: Clase[] = [];

  constructor(private claseService: ClaseService) { }

  ngOnInit(): void {
    this.claseService.getAllClases().subscribe(
      (data) => {
        this.clases = data;
        console.log(this.clases); // Verifica en la consola que se han cargado las clases correctamente
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
        // Aquí puedes manejar el error como prefieras (mostrar un mensaje al usuario, etc.)
      }
    );
  }

  getTipoClaseAsString(tipoClase: TipoClase): string {
    switch (tipoClase) {
      case TipoClase.PILATES_SUELO:
        return 'PILATES_SUELO';
      case TipoClase.PILATES_MAQUINA:
        return 'PILATES_MAQUINA';
      default:
        return 'Desconocido';
    }
  }
}