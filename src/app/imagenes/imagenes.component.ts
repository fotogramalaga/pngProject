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
  };
}
 */

/* TYPESCRIPT JUAN LUIS */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ImagenesService } from '../services/productos.service';
import { UsuariosService } from '../services/usuario.service';
import { ICategoria } from '../interfaces/categoria.interface';
import { IUsuario } from '../interfaces/usuario.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from '../interfaces/imagen.interface';
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  faCoffee = faCoffee;
  idCategoria: string = '';
  pagImagenes = 'imagenes';
  usuario: IUsuario = {
    id: '',
    nombre: '',
    email: '',
    favoritas: [],
    likes: [],
    subidas: [],
  };

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
  usuarios: IUsuario[] = [];
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
    private UsuariosService: UsuariosService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;
    if (!this.usuarioG) {
      this.router.navigateByUrl('imagenes');
    }
    this.getImagenes(this.categorias[0]);
    //this.getUsuario();
  }

  getUsuario() {
    let usuarioRegistrado = false;
    this.UsuariosService.getUsuarios().subscribe((usuarios: IUsuario[]) => {
      this.usuarios = usuarios;
    });
    console.log(this.usuarios);
    this.usuarios.forEach((usuario) => {
      console.log(usuario);
      if (usuario.email == this.usuarioG.email) usuarioRegistrado = true;
    });
    if (!usuarioRegistrado) {
      this.usuario.email = this.usuarioG.email;
      this.usuario.nombre = this.usuarioG.displayName;
      this.addUsuario();
    }
  }

  async addUsuario() {
    await this.UsuariosService.addUsuario(this.usuario);
  }

  getImagenes(categoria?: ICategoria) {
    this.nombreCategoria = categoria?.nombre || '';
    this.ImagenesService.getImagenes(categoria?.id).subscribe(
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
  }

  async eliminarImagenFirebase(imagen: IImagen) {
    await this.ImagenesService.deleteImagen(imagen);
    /* this.mensajeSwal.text = this.cliente.nombre + ' ha sido eliminado';
    this.mensajeSwal.fire();
    // Al eliminar, ponemos en blanco el formulario
    this.agregarCliente(); */
  }
  async modificarImagenFirebase(imagen: IImagen) {
    await this.ImagenesService.updateImagen(imagen);
    /* this.mensajeSwal.text = this.cliente.nombre + ' ha sido modificado';
    this.mensajeSwal.fire(); */
  }

  eligeCategoria(categoria: ICategoria) {
    this.categorias.forEach((x) => (x.selected = false));
    categoria.selected = true;
    this.categoriaSeleccionada = categoria.id;
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
      this.imagen.emailPropietario = this.usuarioG.email;
      this.imagen.avatarUsuario = this.usuarioG.photoURL;
      this.imagen.categoria = estaCategoria;
      this.imagen.nombrePropietario = this.usuarioG.displayName;
      // Título y descripción añadidos por ngModel
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

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }

  async modificarUsuarioFirebase() {
    await this.UsuariosService.updateUsuario(this.usuario);
  }
}

/* public saveCode(e): void {
  let find = this.codeList.find(x => x?.name === e.target.value);
  console.log(find?.id);
} */
