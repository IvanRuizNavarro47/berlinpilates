// clase.component.ts

import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from "@ionic/angular";
import { CommonModule, DatePipe } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { ClaseService } from "../service/clase.service";
import { FormsModule } from "@angular/forms";
import { Clase, TipoClase } from "../modelos/Clase";
import { FooterComponent } from '../footer/footer.component';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule, FooterComponent],
  providers: [ClaseService, DatePipe]
})
export class ClaseComponent implements OnInit {
  clases: Clase[] = []; // Lista de clases disponibles

  constructor(
    private claseService: ClaseService,
    private alertController: AlertController  // Añade esta inyección
  ) {}
  ngOnInit(): void {
    this.obtenerClasesDisponibles(); // Obtener todas las clases disponibles
  }

  // Obtener todas las clases disponibles
  obtenerClasesDisponibles(): void {
    this.claseService.getAllClases().subscribe(
      (clasesObtenidas) => {
        this.clases = clasesObtenidas;
      },
      (error) => {
        console.error('Error al obtener las clases', error);
      }
    );
  }

  // Función para unirse a una clase
  unirseAClase(claseId: number): void {
    this.claseService.unirseClase(claseId).subscribe(
      () => {
        console.log('Te has unido a la clase correctamente');
        this.obtenerClasesDisponibles(); // Vuelve a cargar las clases después de inscribirse
      },
      (error) => {
        console.error('Error al unirse a la clase', error);
      }
    );
  }

  // En el componente
onButtonClick(claseId: number): void {
  this.claseService.unirseClase(claseId).subscribe({
    next: (response) => {
      this.alertController.create({
        header: 'Éxito',
        message: response.message,
        buttons: ['OK']
      }).then(alert => alert.present());
      this.obtenerClasesDisponibles();
    },
    error: (error) => {
      if (error.message === "Ya estás inscrito en esta clase.") {
        this.alertController.create({
          header: 'Aviso',
          message: error.message,
          buttons: ['OK']
        }).then(alert => alert.present());
      } else {
        this.alertController.create({
          header: 'Éxito',
          message: 'Te has unido a la clase correctamente',
          buttons: ['OK']
        }).then(alert => alert.present());
        this.obtenerClasesDisponibles();
      }
    }
  });
}
}