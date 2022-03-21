import { Component, OnInit } from '@angular/core';
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
