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
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  faCoffee = faCoffee;
  idCategoria: string = '';
  imagen: IImagen = {
    titulo: '',
    categoria: '',
    descripcion: '',
    fecha: new Date(),
    contadorLikes: 0,
    rutaImagen: '../../assets/img/18/nederotico.png',
  };
  imagenes: IImagen[] = [];
  nombreCategoria: string = '';
  nuevoProducto: IProducto = {
    descripcion: '',
    imagenURL: '',
    idCategoria: '',
  };
  imagenParaSubir: any;
  categorias: ICategoria[] = [
    { id: '1', nombre: 'Arte', selected: true },
    { id: '2', nombre: 'Paisaje', selected: false },
    { id: '3', nombre: 'Animales', selected: false },
    { id: '4', nombre: 'Deportes', selected: false },
    { id: '5', nombre: 'Mas18', selected: false },
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
    this.getImagenes(this.categorias[0]);
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

  eligeCategoria(categoria: ICategoria) {
    this.categorias.forEach((x) => (x.selected = false));
    categoria.selected = true;
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
    let estaCategoria: string = '';
    this.categorias.forEach(function (x) {
      if (x.selected == true) estaCategoria = x.id;
    });
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
    this.nuevoProducto.descripcion = '';
    this.nuevoProducto.imagenURL = '';
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  myFunction2(x: any) {
    x.classList.toggle('fa-thumbs-down');
  }
}

/* public saveCode(e): void {
  let find = this.codeList.find(x => x?.name === e.target.value);
  console.log(find?.id);
} */
