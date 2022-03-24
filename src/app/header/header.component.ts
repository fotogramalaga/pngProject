import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private fireAuth: Auth, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.fireAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
