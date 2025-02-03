import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ClaseService } from '../service/clase.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { Clase } from '../modelos/Clase';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-misclases',
  templateUrl: './misclases.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule, FooterComponent],
  styleUrls: ['./misclases.component.scss'],
})
export class MisClasesComponent implements OnInit {
  clases: Clase[] = [];
  error: string = '';
  loading: boolean = false;

  constructor(private claseService: ClaseService, private alertController: AlertController) {}

  ngOnInit(): void {
    this.cargarClasesInscritas();
  }

  cargarClasesInscritas(): void {
    this.claseService.getInscripcionesPorUsuario().subscribe({
      next: (clases) => {
        this.clases = clases;
      },
      error: (error) => {
        console.error('Error al obtener las clases:', error);
        this.error = 'Error al cargar las clases. Por favor, intente nuevamente.';
      }
    });
  }

  async abandonarClase(claseId: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas abandonar esta clase?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Abandono de clase cancelado');
          }
        },
        {
          text: 'Abandonar',
          cssClass: 'danger',  // Cambia el color a rojo para indicar eliminación
          handler: () => {
            this.loading = true;
            this.error = '';

            this.claseService.abandonarClase(claseId).subscribe({
              next: (result) => {
                if (result.success) {
                  // Remover la clase de la lista local
                  this.clases = this.clases.filter(clase => clase.id !== claseId);
                  this.error = '';
                }
                this.loading = false;
              },
              error: (error) => {
                console.error('Error al abandonar la clase:', error);
                this.error = error.message || 'Error al abandonar la clase.';
                // Recargar las clases para asegurar la sincronización
                this.cargarClasesInscritas();
                this.loading = false;
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}