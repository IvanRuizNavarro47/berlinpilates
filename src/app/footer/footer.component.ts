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

  constructor(private service: LoginService, private router: Router) {
    addIcons({ personOutline });
  }

  ngOnInit(): void {
    this.logueado = this.service.logueado();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
