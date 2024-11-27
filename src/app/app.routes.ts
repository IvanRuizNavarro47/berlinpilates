import { Routes } from '@angular/router';
import {HomePage} from "./home/home.page";
import {MonitorComponent} from "./monitor/monitor.component";
import {ClaseComponent} from "./clase/clase.component";
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";
import {ErrorComponent} from "./error/error.component";
import { MisclasesComponent } from './misclases/misclases.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { GestionClaseComponent } from './gestion-clase/gestion-clase.component';
import { GestionClienteComponent } from './gestion-cliente/gestion-cliente.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { GestionMonitoresComponent } from './gestion-monitores/gestion-monitores.component';

export const routes: Routes = [
  {path: 'home',component:HomePage,},
  {path: '',component:HomePage},
  {path: 'monitor',component:MonitorComponent},
  {path: 'clase',component:ClaseComponent},
  {path: 'login',component:LoginComponent},
  {path: 'registro',component:RegistroComponent},
  {path: 'misclases',component:MisclasesComponent},
  {path: 'error',component:ErrorComponent},
  {path: 'instalaciones',component:InstalacionesComponent},
  {path: 'noticias',component:NoticiasComponent},
  {path: 'gestionClase', component: GestionClaseComponent },
  {path: 'gestionCliente', component: GestionClienteComponent },
  {path: 'maquinas',component:MaquinasComponent},
  {path: 'contacto',component:ContactoComponent},
  {path: 'gestionMonitores', component:GestionMonitoresComponent}




];