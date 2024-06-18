import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {CommonModule, DatePipe} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {ClaseService} from "../service/clase.service";
import {FormsModule} from "@angular/forms";
import {addIcons} from "ionicons";
import {
  accessibilityOutline,
  alarmOutline,
  calendarOutline,
  closeOutline,
  eyeOutline,
  happyOutline,
  hourglassOutline,
  people,
  peopleOutline,
  personCircleOutline,
  sadOutline
} from "ionicons/icons";
import {Clase} from "../modelos/Clase";
import {Monitor} from "../modelos/Monitor";
import {Cliente} from "../modelos/Cliente";
import {Router} from "@angular/router";


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
        console.log(this.clases); // Aquí puedes verificar en la consola que se han cargado las clases correctamente
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
        // Aquí puedes manejar el error como prefieras (mostrar un mensaje al usuario, etc.)
      }
    );
  }

}