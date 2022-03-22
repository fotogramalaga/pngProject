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
import { ProductosService } from '../services/productos.service';
import { ICategoria } from '../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  idCategoria: string = '';
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
  nuevoProducto: IProducto = {
    descripcion: '',
    imagenURL: '',
    idCategoria: ''
    /* rutaImagen: '../../assets/img/18/nederotico.png', */
  };
  imagen: any;
  categorias: ICategoria[] = [];
  productos: IProducto[] = [];
  usuario!: User;
  constructor(
    private fireAuth: Auth,
    private router: Router,
    private productosService: ProductosService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuario = this.fireAuth.currentUser!;
    if (!this.usuario) {
      this.router.navigateByUrl('login');
    }
    this.getCategorias();
  }

  getCategorias() {
    this.productosService.getCategorias().subscribe((categorias: ICategoria[]) => {
      this.categorias = categorias;
      this.getProductos(this.categorias[0]);
    });
  }

  getProductos(categoria: ICategoria) {
    this.idCategoria = categoria.id;
    this.productosService.getProductos(this.idCategoria).subscribe((productos: IProducto[]) => {
      this.productos = productos;
    });
  }

  elegidaImagen(event: any) {
    this.imagen = event.target.files[0];
    console.log(this.imagen);
  }

  async addProducto() {
    const storage = getStorage();
    const storageRef = ref(storage, 'productos/' + this.imagen.name);
    const infoUpload = await uploadBytes(storageRef, this.imagen);
    this.nuevoProducto.imagenURL = await getDownloadURL(infoUpload.ref);
    this.nuevoProducto.idCategoria = this.idCategoria;
    await this.productosService.addProducto(this.nuevoProducto);
    this.confirmationService.confirm({
      message: 'Producto creado correctamente',
      header: 'OK',
      icon: 'pi pi-check'
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
