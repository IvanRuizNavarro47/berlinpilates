import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../service/comentario.service';
import { Comentario } from '../modelos/Comentario'; // Asegúrate de importar el modelo Comentario
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent, FormsModule, FooterComponent],
})
export class ComentarioComponent implements OnInit {
  comentarioTexto: string = ''; // Variable que almacena el texto del comentario
  comentarios: Comentario[] = []; // Lista de comentarios
  comentarioSeleccionado: Comentario | null = null; // Comentario seleccionado para editar

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.obtenerComentarios(); // Obtener los comentarios cuando el componente se inicializa
  }

  // Función para obtener los comentarios desde el backend
  obtenerComentarios(): void {
    this.comentarioService.obtenerComentarios().subscribe(
      (comentariosObtenidos) => {
        this.comentarios = comentariosObtenidos;
      },
      (error) => {
        console.error('Error al obtener los comentarios', error);
      }
    );
  }

  // Función para guardar el comentario (crear o editar)
  guardarComentario(): void {
    if (this.comentarioTexto.trim()) {
      // Si estamos editando un comentario, actualizamos
      if (this.comentarioSeleccionado) {
        const comentarioEditado: Comentario = {
          id: this.comentarioSeleccionado.id,
          contenido: this.comentarioTexto,
          fechaComentario: new Date(),
        };

        this.comentarioService.editarComentario(comentarioEditado).subscribe(
          (comentarioActualizado) => {
            // Reemplazar el comentario editado en la lista
            const index = this.comentarios.findIndex(
              (comentario) => comentario.id === comentarioActualizado.id
            );
            if (index !== -1) {
              this.comentarios[index] = comentarioActualizado;
            }

            this.cancelarComentario(); // Limpiar la selección y el texto
          },
          (error) => {
            console.error('Error al editar el comentario', error);
          }
        );
      } else {
        // Si no estamos editando, es un nuevo comentario
        const nuevoComentario: Comentario = {
          id: 0, // El id será asignado por el backend
          contenido: this.comentarioTexto,
          fechaComentario: new Date(),
        };

        this.comentarioService.crearComentario(nuevoComentario).subscribe(
          (comentarioGuardado) => {
            this.comentarios.unshift(comentarioGuardado); // Insertar el nuevo comentario al principio
            this.comentarioTexto = ''; // Limpiar el campo de texto
          },
          (error) => {
            console.error('Error al guardar el comentario', error);
          }
        );
      }
    } else {
      alert('Por favor, escribe un comentario antes de guardar.');
    }
  }

  // Función para seleccionar un comentario para editar
  seleccionarComentario(comentario: Comentario): void {
    this.comentarioSeleccionado = { ...comentario }; // Hacer una copia para editar
    this.comentarioTexto = comentario.contenido; // Llenar el campo de texto con el contenido actual
  }

  // Función para eliminar un comentario
  eliminarComentario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      this.comentarioService.eliminarComentario(id).subscribe(
        () => {
          // Filtrar el comentario eliminado de la lista
          this.comentarios = this.comentarios.filter(comentario => comentario.id !== id);
        },
        (error) => {
          console.error('Error al eliminar el comentario', error);
        }
      );
    }
  }

  // Función para cancelar la edición o creación del comentario
  cancelarComentario(): void {
    this.comentarioSeleccionado = null; // Limpiar la selección de comentario
    this.comentarioTexto = ''; // Limpiar el campo de texto
  }
}