import { Component, OnInit, ViewChild } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ImagenesService } from '../../services/productos.service';
import { ICategoria } from '../../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from '../../interfaces/imagen.interface';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import 'node_modules/sweetalert2/src/sweetalert2';
import { Auth, User } from '@angular/fire/auth';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  @ViewChild('confirmarEliminar') deleteSwal!: SwalComponent;
  @ViewChild('mensaje') mensajeSwal!: SwalComponent;
  //@ViewChild('modalFormulario') modalFormulario!: NgbModal;
  idCategoria: string = '';
  usuarioG!: User;
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
    { id: '2', nombre: 'Naturaleza', selected: false },
    { id: '3', nombre: 'Animales', selected: false },
    { id: '4', nombre: 'Deportes', selected: false },
    { id: '5', nombre: 'Mayor 18', selected: false },
  ];
  /* usuario!: User; */
  categoriaSeleccionada = '0';
  constructor(
    private fireAuth: Auth,
    private ImagenesService: ImagenesService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;
    /*
    this.usuario = this.fireAuth.currentUser!;
    if (!this.usuario) {
      this.router.navigateByUrl('imagenes');
    }
    this.getImagenes(this.categorias[0]); */
  }
  /*
  getImagenes(categoria?: ICategoria) {
    this.nombreCategoria = categoria?.nombre || '';
    this.ImagenesService.getImagenes(categoria?.id).subscribe(
      (imagenes: IImagen[]) => {
        this.imagenes = imagenes;
        //this.getProductos(this.categorias[0]);
      }
    );
  } */

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
    console.log(this.imagenParaSubir);
  }

  //  async addImagen() {
  //    let estaCategoria: string = '';
  //    this.categorias.forEach(function (x) {
  //      if (x.selected == true) estaCategoria = x.id;
  //    });
  //    console.log(estaCategoria);
  //    if (this.categoriaSeleccionada == '0') {
  //      alert('Tienes que elegir una categoría.');
  //    } else {
  //      const storage = getStorage();
  //      const storageRef = ref(storage, 'imagenes/' + this.imagenParaSubir.name);
  //      const infoUpload = await uploadBytes(storageRef, this.imagenParaSubir);
  //     this.imagen.rutaImagen = await getDownloadURL(infoUpload.ref);
  //     this.imagen.categoria = estaCategoria;
  //      await this.ImagenesService.addImagen(this.imagen);
  //      this.confirmationService.confirm({
  //        message: 'Imagen añadida correctamente',
  //        header: 'OK',
  //        icon: 'pi pi-check',
  //     });

  async addImagen() {
    let estaCategoria: string = '';
    this.categorias.forEach(function (x) {
      if (x.selected == true) estaCategoria = x.id;
    });
    console.log(estaCategoria);
    if (this.categoriaSeleccionada == '0') {
      Swal.fire({ text: 'Tienes que elegir una categoría.' });
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, 'imagenes/' + this.imagenParaSubir.name);
      const infoUpload = await uploadBytes(storageRef, this.imagenParaSubir);
      this.imagen.rutaImagen = await getDownloadURL(infoUpload.ref);
      this.imagen.categoria = estaCategoria;
      this.imagen.avatarUsuario = this.usuarioG.photoURL;
      await this.ImagenesService.addImagen(this.imagen);
      Swal.fire({ text: 'Imagen añadida correctamente' });
      //this.confirmationService.confirm({
      // message: 'Imagen añadida correctamente',
      //  header: 'OK',
      //  icon: 'pi pi-check',
      // });

      // Resetear el producto
      this.imagen.titulo = '';
      this.imagen.descripcion = '';
      this.categoriaSeleccionada = '0';
    }
  }
}
