import { Component, OnInit } from '@angular/core';
import { GuessnumberService } from 'src/app/service/guessnumber.service';
import { Log } from 'src/app/vo/log';

import * as $ from 'jquery';

declare var Fireworks: any;

@Component({
  selector: 'app-guessnumber',
  templateUrl: './guessnumber.component.html',
  styleUrls: ['./guessnumber.component.sass']
})
export class GuessnumberComponent implements OnInit {

  title: string = "終極密碼";

  answer: string;

  logs: Log[] = [];

  message: string;

  constructor(
    private guessnumberService: GuessnumberService
  ) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.logs = [];
    this.guessnumberService.generator();
    $('#toast').hide();
    $('#canvas-container').hide();
  }

  validate(): void {
    try {
      this.guessnumberService.validate(this.answer);
      this.logs.unshift(new Log(this.answer, '4A'));
      this.win();
    } catch (error) {
      console.log(error);
      this.logs.unshift(new Log(this.answer, error));
    }
    this.answer = null;
  }

  win(): void {

    if (this.logs.length == 1) {
      this.message = '太幸運了';
    } else if (this.logs.length <= 3) {
      this.message = '絕世高手';
    } else if (this.logs.length <= 5) {
      this.message = '高手';
    } else if (this.logs.length <= 8) {
      this.message = '不錯哦';
    }
    $('#canvas-container').fadeIn(500, () => {
      new Fireworks().start();
      setTimeout(() => {
        $('#toast').fadeIn();
      }, 3000);
    });
  }

}
