import { Routes } from '@angular/router';
import {HomePage} from "./home/home.page";
import {MonitorComponent} from "./monitor/monitor.component";
import {ClaseComponent} from "./clase/clase.component";
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";
import {ErrorComponent} from "./error/error.component";
import {EntrenadorPersonalComponent} from "./entrenador-personal/entrenador-personal.component";
import { MisclasesComponent } from './misclases/misclases.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { NoticiasComponent } from './noticias/noticias.component';

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
  {path: 'noticias',component:NoticiasComponent}


];