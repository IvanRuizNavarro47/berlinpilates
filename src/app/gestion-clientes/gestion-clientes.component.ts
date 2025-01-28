import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.scss'],
  standalone: true,
  imports: [ CommonModule,  HeaderComponent, FooterComponent]
})
export class GestionClientesComponent implements OnInit {

  usuarios: string[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        console.log('Datos completos recibidos:', data);

        // Aquí accedemos a usuarioDTO.username para cada usuario
        this.usuarios = data.map((usuario: any) => usuario.usuarioDTO?.username).filter(Boolean);

        console.log('Usernames procesados:', this.usuarios);
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }
}