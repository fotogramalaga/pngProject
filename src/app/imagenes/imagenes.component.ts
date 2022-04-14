import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ImagenesService } from '../services/imagenes.service';
import { ICategoria } from '../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from '../interfaces/imagen.interface';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  idCategoria: string = '';

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
    public router: Router,
    private ImagenesService: ImagenesService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;
    this.getImagenes(this.categorias[0]);
  }

  getCategoria(imagen: IImagen) {
    return this.categorias[parseInt(imagen.categoria) - 1].nombre;
  }

  getImagenes(categoria?: ICategoria) {
    this.nombreCategoria = categoria?.nombre || '';
    this.ImagenesService.getImagenes(categoria?.id).subscribe(
      (imagenes: IImagen[]) => {
        this.imagenes = imagenes;
      }
    );
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
