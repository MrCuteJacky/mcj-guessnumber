import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.register();

    navigator.serviceWorker.addEventListener('install', event => {
      console.log('install', event);
    });
    navigator.serviceWorker.addEventListener('activate', event => {
      console.log('activate', event);
    });
    navigator.serviceWorker.addEventListener('fetch', event => {
      console.log('fetch', event);
    });
  }

}
