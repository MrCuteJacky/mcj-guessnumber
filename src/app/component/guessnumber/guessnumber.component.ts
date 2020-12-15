import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {GuessnumberService} from 'src/app/service/guessnumber.service';
import {Log} from 'src/app/vo/log';

import * as $ from 'jquery';
import {FormGroup} from '@angular/forms';
import {NotificationService} from '../../service/notification.service';

declare let Fireworks: any;

declare let gtag: any;

@Component({
    selector: 'app-guessnumber',
    templateUrl: './guessnumber.component.html',
    styleUrls: ['./guessnumber.component.scss']
})
export class GuessnumberComponent implements OnInit {

    form: FormGroup;

    logs: Log[] = [];

    answer: string;

    level: string;

    constructor(private translate: TranslateService,
                private guessnumberService: GuessnumberService,
                private notificationService: NotificationService) {

        translate.addLangs(['zh', 'en']);
        translate.setDefaultLang('zh');

        const broswerLang = translate.getBrowserLang();
        translate.use(broswerLang.match(/en|zh/) ? broswerLang : 'zh');
    }

    ngOnInit(): void {
        this.init();
        this.notificationService.register();
    }

    init(): void {
        this.logs = [];
        this.guessnumberService.generator();
        $('#toast').hide();
        $('#canvas-container').hide();
    }

    validate(): void {
        try {
            gtag('event', 'Guess', {event_category: 'Click', event_label: 'Guess', value: ''});
            this.guessnumberService.validate(this.answer);
            this.logs.unshift(new Log(this.answer, '4A'));
            this.win();
        } catch (error) {
            this.logs.unshift(new Log(this.answer, error.message));
            this.notificationService.notify('提示', '密碼可能是' + this.guessnumberService.getAnswer());
        }
        this.answer = null;
    }

    win(): void {

        if (this.logs.length === 1) {
            this.level = 'lucky';
        } else if (this.logs.length <= 3) {
            this.level = 'perfect';
        } else if (this.logs.length <= 5) {
            this.level = 'great';
        } else if (this.logs.length <= 8) {
            this.level = 'good';
        }
        gtag('event', 'Win', {event_category: 'Click', event_label: 'Guess', value: this.level});
        $('#canvas-container').fadeIn(500, () => {
            new Fireworks().start();
            setTimeout(() => {
                $('#toast').fadeIn();
            }, 3000);
        });
    }

}
