import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  register(): void {
    Notification.requestPermission().then(r => {
      console.log(r);
      this.notify('系統訊息', '註冊通知成功.');
    });
  }

  notify(title: string, body: string): void {
    console.log('v1');
    navigator.serviceWorker.getRegistration().then(reg => {
      reg.showNotification(title, {body: body, icon: 'assets/images/logo.png'}).then();
    });
  }
}
