import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private firestore: Firestore) {}

  getUsuarios(): Observable<IUsuario[]> {
    const usuarios = collection(this.firestore, 'usuarios');
    return collectionData(usuarios, {
      idField: 'id',
    }) as Observable<IUsuario[]>;
  }

  addUsuario(usuario: IUsuario) {
    const usuarios = collection(this.firestore, 'usuarios');
    return addDoc(usuarios, usuario);
  }

  updateUsuario(usuario: IUsuario) {
    const usuarioActualizar = doc(this.firestore, `usuarios/${usuario.id}`);
    return setDoc(usuarioActualizar, usuario);
  }
}
