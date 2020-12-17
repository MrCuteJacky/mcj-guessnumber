import { Injectable } from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  serverPublicKey = 'BLZim1zgHOWGWAEI27u_Detz69HjpxOrSzVH9Rm4us71RuBU_YZ-hoO2mDgLb3cqg9o-HI0WCwtRpWzgShWuyHw';

  constructor(private swPush: SwPush) { }

  register(): void {
    this.swPush.requestSubscription({
      serverPublicKey: this.serverPublicKey
    }).then(pushSubscription => {
      console.log(JSON.stringify(pushSubscription));
      this.notify('系統訊息', '註冊通知成功.');
    }).catch(error => {
      console.error(error);
    });
    // Notification.requestPermission().then(notificationPermission => {
    //   this.notify('系統訊息', '註冊通知成功.');
    // });
  }

  notify(title: string, body: string): void {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(serviceWorkerRegistration => {
        // actions?: NotificationAction[];
        // badge?: string;
        // body?: string;
        // data?: any;
        // dir?: NotificationDirection;
        // icon?: string;
        // image?: string;
        // lang?: string;
        // renotify?: boolean;
        // requireInteraction?: boolean;
        // silent?: boolean;
        // tag?: string;
        // timestamp?: number;
        // vibrate?: VibratePattern;
        const options: NotificationOptions = {
          body,
          icon: 'assets/images/logo.png',
          timestamp: Date.now()
        };
        serviceWorkerRegistration.showNotification(title, options).then();
      });
    }
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
