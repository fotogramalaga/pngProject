export interface IUsuario {
  id?: string;
  nombre: string | null;
  email: string | null;
  favoritas: string[];
  likes: string[];
  subidas: string[];
}
