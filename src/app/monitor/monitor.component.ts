import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { MonitorService } from "../service/monitor.service"; // Importa tu servicio para monitores
import { FormsModule } from "@angular/forms";
import { Cliente } from "../modelos/Cliente"; // Asegúrate de tener el modelo Cliente
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule, FooterComponent],
  providers: [MonitorService]
})
export class MonitorComponent implements OnInit {
  monitores: Cliente[] = []; // Aquí almacenas la lista de monitores

  constructor(private monitorService: MonitorService) {}

  ngOnInit(): void {
    this.monitorService.getMonitores().subscribe(
      (data) => {
        this.monitores = data; // Almacena los monitores en la variable
      },
      (error) => {
        console.error('Error al cargar los monitores:', error);
      }
    );
  }

  // Puedes añadir métodos adicionales aquí si es necesario
}
