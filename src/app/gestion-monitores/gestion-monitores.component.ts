import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MonitorService } from "../service/monitor.service"; // Importa tu servicio para monitores
import { Cliente } from "../modelos/Cliente"; // Asegúrate de tener el modelo Cliente
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component'; // Agrega el header si es necesario

@Component({
  selector: 'app-gestion-monitores',
  templateUrl: './gestion-monitores.component.html',
  styleUrls: ['./gestion-monitores.component.scss'],
  standalone: true,  // Esto indica que el componente es independiente
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, FooterComponent], // Asegúrate de incluir FormsModule aquí
  providers: [MonitorService]
})
export class GestionMonitoresComponent implements OnInit {
  monitores: Cliente[] = []; // Aquí almacenas la lista de monitores
  nuevoMonitor: Cliente = {}; // Objeto vacío para el nuevo monitor

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

  // Método para crear un nuevo monitor
  crearMonitor(): void {
    if (this.nuevoMonitor.nombre && this.nuevoMonitor.dni && this.nuevoMonitor.email) {
      this.monitorService.createMonitor(this.nuevoMonitor).subscribe(
        (data) => {
          console.log('Monitor creado:', data);
          this.monitores.push(data); // Añadir el nuevo monitor a la lista
          this.nuevoMonitor = {}; // Limpiar el formulario después de crear el monitor
        },
        (error) => {
          console.error('Error al crear el monitor:', error);
        }
      );
    } else {
      console.log('Por favor, complete todos los campos');
    }
  }
}
