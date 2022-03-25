import { Component, OnInit } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IProducto } from '../../interfaces/producto.interface';
import { ImagenesService } from '../../services/productos.service';
import { ICategoria } from '../../interfaces/categoria.interface';
import { ConfirmationService } from 'primeng/api';
import { IImagen } from '../../interfaces/imagen.interface';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  constructor(
    ) {}

  ngOnInit(): void {}


}