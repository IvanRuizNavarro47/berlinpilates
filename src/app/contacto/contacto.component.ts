import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonApp,
  IonMenu,
  IonList, IonItem, IonRouterOutlet, IonMenuButton, IonImg, IonGrid,IonRow, IonCol, IonLabel,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  standalone:true,
  imports: [IonApp,IonMenu,IonHeader, IonList,IonItem,
    IonRouterOutlet,IonMenuButton,IonToolbar, IonTitle,
    IonContent, IonButtons, IonButton, IonIcon, IonImg,
    IonGrid, IonRow, IonCol, IonLabel, HeaderComponent, FooterComponent],
})
export class ContactoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
