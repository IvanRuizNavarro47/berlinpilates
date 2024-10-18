import {Component, OnInit} from '@angular/core';
import {IonicModule, MenuController, ModalController} from "@ionic/angular";
import {IonApp} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {personOutline} from "ionicons/icons";
import {LoginComponent} from "../login/login.component";
import {CommonModule} from "@angular/common";
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  exportAs: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [IonApp, IonicModule, LoginComponent, CommonModule],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit {

  logueado: boolean = false;
  userRole: string | null = null;

  constructor(private service: LoginService, private router: Router) {
    addIcons({personOutline});
  }

  ngOnInit(): void {
    this.logueado = this.service.logueado();
    this.userRole = this.getUserRole(); // Llamamos a getUserRole para asignar el rol cuando el componente se carga
    console.log('Rol del usuario en ngOnInit:', this.userRole); // Para depurar el rol
  }

  logout(): void {
    this.service.logout();
    this.router.navigate(['/login']); // Navegar a la página de login tras logout
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Token decodificado:', decoded);  // Verifica lo que hay dentro del token
  
      // Verificamos si el rol está en el nivel superior del token
      if (decoded.rol) {
        console.log('Rol encontrado en el nivel superior:', decoded.rol);
        return decoded.rol;
      }
  
      // Si no está, verificamos si está dentro de tokenDataDTO
      if (decoded.tokenDataDTO && decoded.tokenDataDTO.rol) {
        console.log('Rol encontrado en tokenDataDTO:', decoded.tokenDataDTO.rol);
        return decoded.tokenDataDTO.rol;
      }
    }
    return null;
  }
  
get isAdmin(): boolean {
  console.log('Comparando rol con ADMIN:', this.userRole === 'ADMIN'); // Depura la comparación
  return this.userRole === 'ADMIN';
}

get isUser(): boolean {
  console.log('Comparando rol con USUARIO:', this.userRole === 'USUARIO'); // Depura la comparación
  return this.userRole === 'USUARIO';
}

get isMonitor(): boolean {
  console.log('Comparando rol con MONITOR:', this.userRole === 'MONITOR'); // Depura la comparación
  return this.userRole === 'MONITOR';
}


}
