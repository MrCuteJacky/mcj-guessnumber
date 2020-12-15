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

    navigator.serviceWorker.getRegistration().then(serviceWorkerRegistration => {
      serviceWorkerRegistration.addEventListener('install', event => {
        console.log('install', event);
      });
      serviceWorkerRegistration.addEventListener('activate', event => {
        console.log('activate', event);
      });
      serviceWorkerRegistration.addEventListener('fetch', event => {
        console.log('fetch', event);
      });
    });
  }

}
