import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}

//function footerToggle(footerBtn: any) {
  //$(footerBtn).toggleClass("btnActive");
  //$(footerBtn).next().toggleClass("active");
//}
