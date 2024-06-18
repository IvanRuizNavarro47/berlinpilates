import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-misclases',
  templateUrl: './misclases.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule],
  styleUrls: ['./misclases.component.scss'],
})
export class MisclasesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
