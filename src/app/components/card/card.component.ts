import { Component, Input, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
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
  constructor(
    private ImagenesService: ImagenesService,
    private fireAuth: Auth
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;
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
    if (this.favoritos) {
      return imagen.listaFavs.includes(this.usuarioG.uid);
    } else {
      return true;
    }
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
