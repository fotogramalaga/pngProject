import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
