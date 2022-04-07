import { Component, EventEmitter, OnInit, Output,ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import "node_modules/sweetalert2/src/sweetalert2";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild('confirmarEliminar') deleteSwal!: SwalComponent;
  @ViewChild('mensaje') mensajeSwal!: SwalComponent

  constructor() { }


  ngOnInit(): void {
  }




}

//function footerToggle(footerBtn: any) {
  //$(footerBtn).toggleClass("btnActive");
  //$(footerBtn).next().toggleClass("active");
//}
