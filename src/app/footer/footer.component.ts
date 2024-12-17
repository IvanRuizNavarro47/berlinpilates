import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonApp } from "@ionic/angular/standalone";
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../service/login.service';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonApp, IonicModule, LoginComponent, CommonModule],
  providers: [LoginService],
  standalone: true
})
export class FooterComponent implements OnInit {
  logueado: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isMonitor: boolean = false;

  constructor(private service: LoginService, private router: Router) {
    addIcons({ personOutline });
  }

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    this.logueado = this.service.logueado();

    if (this.logueado) {
      // Asignar roles específicos dependiendo del usuario logueado
      this.isAdmin = this.service.isAdmin();
      this.isUser = this.service.isUser();
      this.isMonitor = this.service.isMonitor();
    }
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
    // Reiniciar roles y logueado al cerrar sesión
    this.logueado = false;
    this.isAdmin = false;
    this.isUser = false;
    this.isMonitor = false;
  }
}
