import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  register(): void {
    Notification.requestPermission().then(r => {});
  }

  notify(title: string, body: string): void {
    new Notification(title, {body: body, icon: 'assets/images/logo.png'});
    // this.serviceWorkerRegistration.showNotification(title, {body: body, icon: 'assets/images/logo.png'}).then(r => {});
  }
}
