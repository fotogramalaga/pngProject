export interface IImagen {
  id: string;
  titulo: string;
  categoria: string;
  fecha: any;
  descripcion: string;
  contadorLikes: number;
  rutaImagen: string;
  emailPropietario: string | null;
  nombrePropietario: string | null;
  avatarUsuario: string | null;
  favorito: boolean;
  listaLikes: string[];
  listaFavs: string[];
}
