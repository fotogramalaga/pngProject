import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, query, orderBy } from '@angular/fire/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ICategoria } from '../interfaces/categoria.interface';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private firestore: Firestore) {}

  getCategorias(): Observable<ICategoria[]> {
    const categorias = collection(this.firestore, 'categorias');
    const ordenados = query(categorias, orderBy('descripcion', 'desc'));
    return collectionData(ordenados, { idField: 'id' }) as Observable<ICategoria[]>;
  }

  getProductos(idCategoria?: string): Observable<IProducto[]> {
    const productos = collection(this.firestore, 'productos');
    const productosDeCategoria = query(productos, where('idCategoria', '==', idCategoria));
    return collectionData(productosDeCategoria, { idField: 'id' }) as Observable<IProducto[]>;
  }

  addProducto(producto: IProducto) {
    const productos = collection(this.firestore, 'productos');
    return addDoc(productos, producto);
  }
}
