import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { IImagen } from '../imagenes/imagen.interface';
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
    /* const productosDeCategoria = query(
      productos,
      where('idCategoria', '==', idCategoria)
    ); */
    return collectionData(imagenes, {
      idField: 'id',
    }) as Observable<IImagen[]>;
  }

  addImagen(producto: IImagen) {
    const productos = collection(this.firestore, 'imagenes');
    return addDoc(productos, producto);
  }
}
