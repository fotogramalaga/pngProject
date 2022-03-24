export interface IImagen {
  id?: string;
  titulo: string;
  categoria: string;
  fecha: Date;
  descripcion: string;
  contadorLikes: number;
  rutaImagen: string;
  like: boolean;
  favorito: boolean;
}
