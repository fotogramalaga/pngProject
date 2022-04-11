import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';
import { ICategoria } from '../interfaces/categoria.interface';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import 'node_modules/sweetalert2/src/sweetalert2';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('confirmarEliminar') deleteSwal!: SwalComponent;
  @ViewChild('mensaje') mensajeSwal!: SwalComponent;
  @Output() getCategoria: EventEmitter<ICategoria> = new EventEmitter();

  usuarioG!: User;

  categorias: ICategoria[] = [
    { id: '1', nombre: 'Arte', selected: true },
    { id: '2', nombre: 'Naturaleza', selected: false },
    { id: '3', nombre: 'Animales', selected: false },
    { id: '4', nombre: 'Deportes', selected: false },
    { id: '5', nombre: 'Mayor 18', selected: false },
  ];
  constructor(
    private scroller: ViewportScroller,
    private fireAuth: Auth,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usuarioG = this.fireAuth.currentUser!;
  }

  logout() {
    this.fireAuth.signOut();
    Swal.fire({
      icon: 'warning',
      text: 'Te has deslogueado de pngProject. ¡Hasta pronto!',
    });
    this.router.navigateByUrl('/home');
  }
  addNewImage() {
    const dialogRef = this.dialog.open(FormularioComponent);
  }

  getImagenes(categoria: ICategoria) {
    if (categoria.id != '5') {
      this.getCategoria.emit(categoria);
    } else {
      Swal.fire({
        title: 'Confirma si eres mayor de 18 años',
        input: 'checkbox',
        inputPlaceholder: 'Sí, tengo más de 18 años',
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value) {
            Swal.fire({ icon: 'success', text: 'Puedes ver esta categoría' });
            this.getCategoria.emit(categoria);
          } else {
            Swal.fire({
              icon: 'error',
              text: 'No puedes ver esta categoría :(',
            });
          }
        } else {
          console.log(`modal was dismissed by ${result.dismiss}`);
        }
      });
    }
  }

  scrollToFooter() {
    this.scroller.scrollToAnchor('footer');
  }
}
