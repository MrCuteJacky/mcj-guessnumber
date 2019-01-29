import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessnumberService {

  private answer: string;

  constructor() { }

  generator(): void {

    this.answer = '';
    var templates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    while(this.answer.length < 4) {
      var number = templates[Math.floor(Math.random() * templates.length)];
      this.answer += number;
      templates = templates.filter(template => {
        return template != number;
      });
    }
    console.log(this.answer);
  }

  validate(input: string): void {
    
    if (this.answer != input) {
      var a = 0, b = 0;
      var answers = Array.from(this.answer);
      Array.from(input).forEach((word, index) => {
        if (word == answers[index]) {
          a++;
        } else {
          answers.forEach(answer => {
            if (word == answer) {
              b++;
            }
          });
        }
      });
      throw a + 'A' + b + 'B';
    }
  }
}