import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';
import { ICategoria } from '../interfaces/categoria.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() getCategoria: EventEmitter<ICategoria> = new EventEmitter();
  categorias: ICategoria[] = [
    { id: '1', nombre: 'Arte', selected: true },
    { id: '2', nombre: 'Paisaje', selected: false },
    { id: '3', nombre: 'Animales', selected: false },
    { id: '4', nombre: 'Deportes', selected: false },
    { id: '5', nombre: 'Mas18', selected: false },
  ];
  constructor(
    private fireAuth: Auth,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }
  addNewImage() {
    const dialogRef = this.dialog.open(FormularioComponent);
  }

  getImagenes(categoria: ICategoria) {
    this.getCategoria.emit(categoria);
  }
}
