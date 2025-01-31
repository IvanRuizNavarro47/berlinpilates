export class Monitor {
  id: number = 0; // Agregar el campo id
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  dni: string = '';
  email: string = '';
  usuarioDTO: UsuarioDTO = new UsuarioDTO();

  constructor() {
    this.usuarioDTO.rol = 'MONITOR'; // Asignar un valor por defecto al rol
  }
}


export class UsuarioDTO {
  username: string = '';
  password: string = '';
  rol: string = '';
}
