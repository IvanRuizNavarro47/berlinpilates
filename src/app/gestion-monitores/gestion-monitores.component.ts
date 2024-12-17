import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MonitorService } from "../service/monitor.service";
import { Monitor } from '../modelos/Monitor';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-monitores',
  templateUrl: './gestion-monitores.component.html',
  styleUrls: ['./gestion-monitores.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, FooterComponent],
  providers: [MonitorService]
})
export class GestionMonitoresComponent implements OnInit {
  monitores: Monitor[] = []; // Lista de monitores
  monitorEditado: Monitor | null = null;
  nuevoMonitor: Monitor; // Objeto para el nuevo monitor
  modoEdicion: boolean = false; // Variable para controlar el modo de edición


  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  dni: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  rol: string = 'MONITOR'; // Valor predeterminado para rol MONITOR

  constructor(private monitorService: MonitorService, private router: Router) {
    // Inicializar nuevoMonitor con todos sus campos
    this.nuevoMonitor = new Monitor();
  }

  ngOnInit(): void {
    this.obtenerMonitores();
  }

  obtenerMonitores(): void {
    this.monitorService.getMonitores().subscribe(
      (data) => {
        this.monitores = data; // Almacena los monitores en la variable
      },
      (error) => {
        console.error('Error al cargar los monitores:', error);
      }
    );
  }

  CrearMonitor() {
    this.rellenarDatos();
    this.monitorService.registrarMonitor(this.nuevoMonitor).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.obtenerMonitores(); // Volver a obtener la lista de monitores actualizada
        this.router.navigate(['/gestion-monitores']); // Redirigir a la misma página
      }
    });
  }

  rellenarDatos() {
    // Asignar los valores del formulario al objeto nuevoMonitor
    this.nuevoMonitor.nombre = this.nombre;
    this.nuevoMonitor.apellido1 = this.apellido1;
    this.nuevoMonitor.apellido2 = this.apellido2;
    this.nuevoMonitor.dni = this.dni;
    this.nuevoMonitor.email = this.email;
    
    // Aquí asignamos el username y password dentro del objeto usuarioDTO
    this.nuevoMonitor.usuarioDTO = {
      username: this.username, // Asegúrate de que `this.username` no esté vacío
      password: this.password, // Asegúrate de que `this.password` no esté vacío
      rol: this.rol
    };
  }

  

  cargarDatosParaEditar(monitor: Monitor): void {
    // Configurar el modo de edición
    this.modoEdicion = true;
    this.monitorEditado = { ...monitor }; // Clonar el monitor para evitar mutaciones no deseadas
    this.nombre = monitor.nombre;
    this.apellido1 = monitor.apellido1;
    this.apellido2 = monitor.apellido2;
    this.dni = monitor.dni;
    this.email = monitor.email;
    this.username = monitor.usuarioDTO.username;
    this.password = ''; // Deja la contraseña vacía para no mostrarla
  }

  actualizarMonitor(): void {
    if (this.monitorEditado) {
      this.monitorEditado.nombre = this.nombre;
      this.monitorEditado.apellido1 = this.apellido1;
      this.monitorEditado.apellido2 = this.apellido2;
      this.monitorEditado.dni = this.dni;
      this.monitorEditado.email = this.email;
      this.monitorEditado.usuarioDTO.username = this.username;
      this.monitorEditado.usuarioDTO.password = this.password;

      // Llamar al servicio para actualizar el monitor
      this.monitorService.actualizarMonitor(this.monitorEditado).subscribe(() => {
        this.obtenerMonitores();
        this.modoEdicion = false; // Desactivar el modo edición
        this.monitorEditado = null; // Limpiar la variable de monitor editado
      });
    }
  }
}
