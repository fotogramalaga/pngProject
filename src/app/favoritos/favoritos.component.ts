/* TYPESCRIPT JUAN LUIS */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ImagenesService } from '../services/imagenes.service';
import { ICategoria } from '../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from '../interfaces/imagen.interface';
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  faCoffee = faCoffee;
  idCategoria: string = '';
  imagen: IImagen = {
    id: '',
    titulo: '',
    categoria: '',
    descripcion: '',
    fecha: new Date(),
    contadorLikes: 0,
    rutaImagen: '',
    emailPropietario: '',
    nombrePropietario: '',
    avatarUsuario: '',
    favorito: false,
    listaLikes: [],
    listaFavs: [],
  };
  imagenes: IImagen[] = [];
  nombreCategoria: string = '';
  imagenParaSubir: any;
  categorias: ICategoria[] = [
    { id: '1', nombre: 'Arte', selected: true },
    { id: '2', nombre: 'Paisaje', selected: false },
    { id: '3', nombre: 'Animales', selected: false },
    { id: '4', nombre: 'Deportes', selected: false },
    { id: '5', nombre: 'Mas18', selected: false },
  ];
  usuarioG!: User;
  categoriaSeleccionada = '0';
  constructor(
    private fireAuth: Auth,
    private router: Router,
    private ImagenesService: ImagenesService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;
    if (!this.usuarioG) {
      this.router.navigateByUrl('favoritos');
    }
    //this.getImagenes(this.categorias[0]);
    this.getTodasImagenes();
    console.log(this.imagenes);
  }

  getImagenes(categoria?: ICategoria) {
    this.nombreCategoria = categoria?.nombre || '';
    this.ImagenesService.getImagenes(categoria?.id).subscribe(
      (imagenes: IImagen[]) => {
        this.imagenes = imagenes;
        //this.getProductos(this.categorias[0]);
      }
    );
  }

  getTodasImagenes() {
    this.ImagenesService.getFavoritos(this.usuarioG.uid).subscribe(
      (imagenes: IImagen[]) => {
        this.imagenes = imagenes;
      }
    );
  }

  getLike(imagen: IImagen) {
    return imagen.listaLikes.includes(this.usuarioG.uid);
  }

  setLike(imagen: IImagen) {
    if (!this.getLike(imagen)) {
      imagen.contadorLikes++;
      imagen.listaLikes.push(this.usuarioG.uid);
    } else {
      const index = imagen.listaLikes.indexOf(this.usuarioG.uid);
      imagen.listaLikes.splice(index, 1);
      imagen.contadorLikes--;
    }
    console.log(imagen.listaLikes);
    this.modificarImagenFirebase(imagen);
    //this.modificarUsuarioFirebase();
  }

  getFav(imagen: IImagen) {
    console.log(imagen);
    return imagen.listaFavs.includes(this.usuarioG.uid);
  }

  setFav(imagen: IImagen) {
    if (!this.getFav(imagen)) {
      imagen.listaFavs.push(this.usuarioG.uid);
    } else {
      const index = imagen.listaFavs.indexOf(this.usuarioG.uid);
      imagen.listaFavs.splice(index, 1);
    }
    this.modificarImagenFirebase(imagen);
    console.log(imagen);
  }

  async eliminarImagenFirebase(imagen: IImagen) {
    await this.ImagenesService.deleteImagen(imagen);
  }
  async modificarImagenFirebase(imagen: IImagen) {
    await this.ImagenesService.updateImagen(imagen);
  }

  eligeCategoria(categoria: ICategoria) {
    this.categorias.forEach((x) => (x.selected = false));
    categoria.selected = true;
    this.categoriaSeleccionada = categoria.id;
  }

  elegidaImagen(event: any) {
    this.imagenParaSubir = event.target.files[0];
    console.log(this.imagenParaSubir);
  }

  async addImagen() {
    let estaCategoria: string = '';
    this.categorias.forEach(function (x) {
      if (x.selected == true) estaCategoria = x.id;
    });
    console.log(estaCategoria);
    if (this.categoriaSeleccionada == '0') {
      alert('Tienes que elegir una categoría.');
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, 'imagenes/' + this.imagenParaSubir.name);
      const infoUpload = await uploadBytes(storageRef, this.imagenParaSubir);
      this.imagen.rutaImagen = await getDownloadURL(infoUpload.ref);
      this.imagen.categoria = estaCategoria;
      await this.ImagenesService.addImagen(this.imagen);
      this.confirmationService.confirm({
        message: 'Imagen añadida correctamente',
        header: 'OK',
        icon: 'pi pi-check',
      });
      // Resetear el producto
      this.categoriaSeleccionada = '0';
    }
  }
  getCategoria(imagen: IImagen) {
    return this.categorias[parseInt(imagen.categoria) - 1].nombre;
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  setFavorito(imagen: IImagen) {
    imagen.favorito = !imagen.favorito;
  }
}

/* public saveCode(e): void {
  let find = this.codeList.find(x => x?.name === e.target.value);
  console.log(find?.id);
} */
