// modelos/Clase.ts

export enum TipoClase {
  PILATES_SUELO = 'PILATES_SUELO',
  PILATES_MAQUINA = 'PILATES_MAQUINA'
}

export interface Clase {
  id?: number;
  tipoClase?: TipoClase;  // Actualizado para coincidir con el backend
  descripcion?: string;
  capacidadMaxima?: number;  // Actualizado para coincidir con el backend
  fecha?: Date;
  clientes?: any[];  // Si necesitas manejar los clientes también
}
