import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    serverPublicKey = 'BLZim1zgHOWGWAEI27u_Detz69HjpxOrSzVH9Rm4us71RuBU_YZ-hoO2mDgLb3cqg9o-HI0WCwtRpWzgShWuyHw';

    constructor(private swPush: SwPush) {
    }

    share(data): void {
        if (navigator.share) {
            navigator.share({
                title: 'pushSubscription',
                text: JSON.stringify(data)
            }).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing', error));
        } else {
            console.log(JSON.stringify(data));
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
                data: pushSubscription,
                actions: [
                    {action: 'share', title: 'share'},
                    {action: 'cancel', title: 'cancel'}
                ]
            });
        }).catch(error => {
            console.error('error', error);
            this.share('https://mrcutejacky.github.io/mcj-guessnumber/');
        });

        this.swPush.notificationClicks.subscribe(partialObserver => {
            if (partialObserver.action === 'share') {
                this.share(partialObserver.notification.data);
            }
        });
        /* example, https://web-push-codelab.glitch.me/
        {
            "notification": {
            "title": "系統訊息",
                "body": "測試推播",
                "icon": "https://mrcutejacky.github.io/mcj-guessnumber/assets/images/logo.png"
            }
        }
         */
    }

    notify(title: string, data: string | NotificationOptions): void {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(serviceWorkerRegistration => {
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
}
