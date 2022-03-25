import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const video: any = document.getElementById('video')!;
    video.play();
  }
}
