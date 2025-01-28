import { Routes } from '@angular/router';
import {HomePage} from "./home/home.page";
import {MonitorComponent} from "./monitor/monitor.component";
import {ClaseComponent} from "./clase/clase.component";
import {LoginComponent} from "./login/login.component";
import {RegistroComponent} from "./registro/registro.component";
import {ErrorComponent} from "./error/error.component";
import { MisClasesComponent } from './misclases/misclases.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MaquinasComponent } from './maquinas/maquinas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { GestionMonitoresComponent } from './gestion-monitores/gestion-monitores.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { GestionClientesComponent } from './gestion-clientes/gestion-clientes.component';

export const routes: Routes = [
  {path: 'home',component:HomePage,},
  {path: '',component:HomePage},
  {path: 'monitor',component:MonitorComponent},
  {path: 'clase',component:ClaseComponent},
  {path: 'login',component:LoginComponent},
  {path: 'registro',component:RegistroComponent},
  {path: 'misclases',component:MisClasesComponent},
  {path: 'error',component:ErrorComponent},
  {path: 'instalaciones',component:InstalacionesComponent},
  {path: 'noticias',component:NoticiasComponent},
  {path: 'maquinas',component:MaquinasComponent},
  {path: 'contacto',component:ContactoComponent},
  {path: 'gestionCliente',component:GestionClientesComponent},
  {path: 'gestionMonitores', component:GestionMonitoresComponent},
  {path: 'reseñas', component:ComentarioComponent}





];