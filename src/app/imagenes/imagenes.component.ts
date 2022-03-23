/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  imagenes: any[] = [
    {
      titulo: '',
      categoria: '',
      fecha: null,
      contadorLikes: 0,
      contadorDislikes: 0,
      rutaImagen: '../../assets/img/18/nederotico.png',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigateByUrl('home');
  }
}
 */

/* TYPESCRIPT JUAN LUIS */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IProducto } from '../interfaces/producto.interface';
import { ImagenesService } from '../services/productos.service';
import { ICategoria } from '../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from './imagen.interface';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  idCategoria: string = '';
  imagenPngPoject: IImagen = {
    titulo: '',
    categoria: '',
    fecha: new Date(),
    contadorLikes: 0,
    contadorDislikes: 0,
    rutaImagen: '../../assets/img/18/nederotico.png',
  };
  imagenes: IImagen[] = [];

  nuevoProducto: IProducto = {
    descripcion: '',
    imagenURL: '',
    idCategoria: '',
  };
  imagenParaSubir: any;
  categorias: ICategoria[] = [
    {
      nombre: '',
    },
  ];
  usuario!: User;
  constructor(
    private fireAuth: Auth,
    private router: Router,
    private ImagenesService: ImagenesService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuario = this.fireAuth.currentUser!;
    if (!this.usuario) {
      this.router.navigateByUrl('login');
    }
    this.getImagenes();
  }

  getImagenes() {
    this.ImagenesService.getImagenes().subscribe((imagenes: IImagen[]) => {
      this.imagenes = imagenes;
      console.log(imagenes);
      //this.getProductos(this.categorias[0]);
    });
  }

  /* getProductos(categoria: ICategoria) {
    this.idCategoria = categoria.id;
    this.ImagenesService
      .getImagenes(this.idCategoria)
      .subscribe((productos: IProducto[]) => {
        this.productos = productos;
      });
  } */

  elegidaImagen(event: any) {
    this.imagenParaSubir = event.target.files[0];
    console.log(this.imagenParaSubir);
  }

  async addImagen() {
    const storage = getStorage();
    const storageRef = ref(storage, 'imagenes/' + this.imagenParaSubir.name);
    const infoUpload = await uploadBytes(storageRef, this.imagenParaSubir);
    this.imagenPngPoject.rutaImagen = await getDownloadURL(infoUpload.ref);
    this.imagenPngPoject.categoria = this.idCategoria;
    await this.ImagenesService.addImagen(this.imagenPngPoject);
    this.confirmationService.confirm({
      message: 'Producto creado correctamente',
      header: 'OK',
      icon: 'pi pi-check',
    });
    // Resetear el producto
    this.nuevoProducto.descripcion = '';
    this.nuevoProducto.imagenURL = '';
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
