import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  register(): void {
    Notification.requestPermission().then(notificationPermission => {
      this.notify('系統訊息', '註冊通知成功.');
    });

    navigator.serviceWorker.getRegistration().then(serviceWorkerRegistration => {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlB64ToUint8Array('BGZLRvtyQGmoeKhM38KvOpauQ060CfT8Vb21vg7NEC8JyDvTqWZKIztUD33ebWaF46kyjh6q8L5uOsTq1cuP2LA')
      }).then(pushSubscription => {
        console.log(pushSubscription);
      });
      self.addEventListener('push', eventListenerOrEventListenerObject => {
        console.log('push', eventListenerOrEventListenerObject);
      });
    });
  }

  notify(title: string, body: string): void {
    navigator.serviceWorker.getRegistration().then(serviceWorkerRegistration => {
      serviceWorkerRegistration.showNotification(title, {body: body, icon: 'assets/images/logo.png'}).then();
    });
  }

  urlB64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
