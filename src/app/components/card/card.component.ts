import { Component, Input, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ICategoria } from 'src/app/interfaces/categoria.interface';
import { IImagen } from 'src/app/interfaces/imagen.interface';
import { ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() imagenes: IImagen[] = [];
  @Input() favoritos: boolean = false;

  usuarioG!: User;
  categorias: ICategoria[] = [
    { id: '1', nombre: 'Arte', selected: true },
    { id: '2', nombre: 'Paisaje', selected: false },
    { id: '3', nombre: 'Animales', selected: false },
    { id: '4', nombre: 'Deportes', selected: false },
    { id: '5', nombre: 'Mas18', selected: false },
  ];

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

  constructor(
    private ImagenesService: ImagenesService,
    private fireAuth: Auth
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;

    console.log(this.fireAuth.currentUser!);
  }

  getLike(imagen: IImagen) {
    let imagenConLike = false;
    if (imagen.listaLikes != undefined)
      imagenConLike = imagen.listaLikes.includes(this.usuarioG.uid);
    return imagenConLike;
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
    this.modificarImagenFirebase(imagen);
  }

  paginaFav(imagen: IImagen) {
    let imagenFav = true;
    if (this.favoritos) {
      imagenFav = this.getFav(imagen);
    }
    return imagenFav;
  }

  getFav(imagen: IImagen) {
    if (imagen.listaFavs != undefined)
      return imagen.listaFavs.includes(this.usuarioG.uid);
    return false;
  }

  setFav(imagen: IImagen) {
    if (!this.getFav(imagen)) {
      imagen.listaFavs.push(this.usuarioG.uid);
    } else {
      const index = imagen.listaFavs.indexOf(this.usuarioG.uid);
      imagen.listaFavs.splice(index, 1);
    }
    this.modificarImagenFirebase(imagen);
  }

  getCategoria(imagen: IImagen) {
    return this.categorias[parseInt(imagen.categoria) - 1].nombre;
  }

  async eliminarImagenFirebase(imagen: IImagen) {
    await this.ImagenesService.deleteImagen(imagen);
  }
  async modificarImagenFirebase(imagen: IImagen) {
    await this.ImagenesService.updateImagen(imagen);
  }
}
