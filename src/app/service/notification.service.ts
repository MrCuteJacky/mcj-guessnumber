import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    serverPublicKey = 'BLZim1zgHOWGWAEI27u_Detz69HjpxOrSzVH9Rm4us71RuBU_YZ-hoO2mDgLb3cqg9o-HI0WCwtRpWzgShWuyHw';

    constructor(private swPush: SwPush) {
    }

    share(message): void {
        if (navigator.share) {
            navigator.share({
                title: 'pushSubscription',
                text: message
            }).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing', error));
        } else {
            console.log(message);
        }
    }

    register(): void {
        this.swPush.requestSubscription({
            serverPublicKey: this.serverPublicKey
        }).then(pushSubscription => {
            console.log(JSON.stringify(pushSubscription));
            this.notify('系統訊息', {
                body: '註冊推播成功，請分享相關註冊訊息。',
                icon: 'assets/images/logo.png',
                timestamp: Date.now(),
                data: JSON.stringify(pushSubscription),
                actions: [
                    {action: 'share', title: 'share'},
                    {action: 'cancel', title: 'cancel'}
                ]
            });
        }).catch(error => {
            console.error(error);
        });

        this.swPush.notificationClicks.subscribe(partialObserver => {
            if (partialObserver.action === 'share') {
                this.share(JSON.stringify(partialObserver.notification.data));
            }
        });
        /*
        {
            "notification": {
                "actions": NotificationAction[],
                "badge": USVString
                "body": DOMString,
                "data": any,
                "dir": "auto"|"ltr"|"rtl",
                "icon": USVString,
                "image": USVString,
                "lang": DOMString,
                "renotify": boolean,
                "requireInteraction": boolean,
                "silent": boolean,
                "tag": DOMString,
                "timestamp": DOMTimeStamp,
                "title": DOMString,
                "vibrate": number[]
            }
        }
         */
        /* example, https://web-push-codelab.glitch.me/
        {
            "notification": {
            "title": "系統訊息",
                "body": "測試推播12311",
                "icon": "https://mrcutejacky.github.io/mcj-guessnumber/assets/images/logo.png"
            }
        }
         */
    }

    notify(title: string, data: string | NotificationOptions): void {
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
                let options: NotificationOptions;
                if (typeof data === 'string') {
                    options = {
                        body: data,
                        icon: 'assets/images/logo.png',
                        timestamp: Date.now()
                    };
                } else {
                    options = data;
                }
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
