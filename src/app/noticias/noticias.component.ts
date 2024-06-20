import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule, DatePipe } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule, FooterComponent],
})
export class NoticiasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
