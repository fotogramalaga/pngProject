import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export interface IImagen {
  id?: string;
  titulo: string;
  categoria: string;
  fecha: Date;
  contadorLikes: number;
  contadorDislikes: number;
  rutaImagen: string;
}
