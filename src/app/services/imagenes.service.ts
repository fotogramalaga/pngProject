import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { IImagen } from '../interfaces/imagen.interface';
import { ICategoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  constructor(private firestore: Firestore) {}

  getCategorias(): Observable<ICategoria[]> {
    const categorias = collection(this.firestore, 'categorias');
    const ordenados = query(categorias, orderBy('categorias', 'desc'));
    return collectionData(ordenados, { idField: 'id' }) as Observable<
      ICategoria[]
    >;
  }

  getImagenes(idCategoria?: string): Observable<IImagen[]> {
    const imagenes = collection(this.firestore, 'imagenes');
    const imagenesDeCategoria = query(
      imagenes,
      where('categoria', '==', idCategoria)
    );
    return collectionData(imagenesDeCategoria, {
      idField: 'id',
    }) as Observable<IImagen[]>;
  }

  getFavoritos(id: string): Observable<IImagen[]> {
    const imagenes = collection(this.firestore, 'imagenes');
    const imagenesFavoritas = query(
      imagenes,
      where('listaFavs', 'array-contains', id)
    );
    return collectionData(imagenesFavoritas, {
      idField: 'id',
    }) as Observable<IImagen[]>;
  }

  addImagen(producto: IImagen) {
    const productos = collection(this.firestore, 'imagenes');
    return addDoc(productos, producto);
  }

  updateImagen(imagen: IImagen) {
    const imagenActualizar = doc(this.firestore, `imagenes/${imagen.id}`);
    return setDoc(imagenActualizar, imagen);
  }

  deleteImagen(imagen: IImagen) {
    const imagenEliminar = doc(this.firestore, `imagenes/${imagen.id}`);
    return deleteDoc(imagenEliminar);
  }
}
