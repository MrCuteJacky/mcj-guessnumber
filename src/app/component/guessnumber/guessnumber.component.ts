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

  title: string = "GuessNumber";

  answer: string;

  logs: Log[] = [];

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
      this.win();
    } catch (error) {
      console.log(error);
      this.logs.unshift(new Log(this.answer, error));
    }
    this.answer = null;
  }

  win(): void {
    $('#canvas-container').fadeIn(500, () => {
      new Fireworks().start();
      setTimeout(() => {
        $('#toast').fadeIn();
      }, 3000);
    });
  }

}
