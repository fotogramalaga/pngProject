
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import "node_modules/sweetalert2/src/sweetalert2";
import { Component, EventEmitter, OnInit, Output,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IProducto } from '../interfaces/producto.interface';
import { ImagenesService } from '../services/productos.service';
import { ICategoria } from '../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from '../interfaces/imagen.interface';
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('confirmarEliminar') deleteSwal!: SwalComponent;
  @ViewChild('mensaje') mensajeSwal!: SwalComponent
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

  login() {
    this.router.navigateByUrl('login');
  }

  me() {
    Swal.fire({ text: 'Logeate para poder usar la aplicaión'});
  }
  me2() {
    Swal.fire({ text: 'Mandanos un mail fotogram.malaga@gmail.com'});
  }


}
