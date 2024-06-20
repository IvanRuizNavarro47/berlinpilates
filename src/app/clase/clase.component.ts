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

  constructor(private claseService: ClaseService) {}

  ngOnInit(): void {
    this.claseService.getAllClases().subscribe(
      (data) => {
        this.clases = data;
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
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

  unirseAClase(claseId: number): void {
    this.claseService.unirseClase(claseId).subscribe(
      () => {
        console.log('Te has unido a la clase correctamente');
      },
      (error) => {
        console.error('Error al unirse a la clase:', error);
      }
    );
  }

  onButtonClick(claseId: number | undefined): void {
    if (claseId !== undefined) {
      console.log('Botón clicado con ID de clase:', claseId);
      this.unirseAClase(claseId);
    } else {
      console.error('ID de clase indefinido.');
    }
  }
}