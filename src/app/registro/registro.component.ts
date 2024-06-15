import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {RegistroCliente, UsuarioDTO} from "../modelos/RegistroCliente";
import {addIcons} from "ionicons";
import {idCardOutline, keyOutline, person, personCircleOutline, personOutline} from "ionicons/icons";
import {Router} from "@angular/router";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
  providers: [LoginService]
})
export class RegistroComponent implements OnInit {

  registroCliente: RegistroCliente = new RegistroCliente();
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  dni: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  rol: string = 'USUARIO';

  constructor(private service: LoginService, private router: Router) {
    addIcons({
      personOutline,
      keyOutline,
      idCardOutline,
      person,
      personCircleOutline
    })
  }

  ngOnInit() {
    // No es necesario rellenar datos aquí
  }

  completarRegistro() {
    this.rellenarDatos();
    this.service.registrarCliente(this.registroCliente).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['/login']),
    });
  }

  rellenarDatos() {
    this.registroCliente.nombre = this.nombre;
    this.registroCliente.apellido1 = this.apellido1;
    this.registroCliente.apellido2 = this.apellido2;
    this.registroCliente.dni = this.dni;
    this.registroCliente.email = this.email;
    this.registroCliente.usuarioDTO.username = this.username;
    this.registroCliente.usuarioDTO.password = this.password;
    this.registroCliente.usuarioDTO.rol = this.rol;
  }
}