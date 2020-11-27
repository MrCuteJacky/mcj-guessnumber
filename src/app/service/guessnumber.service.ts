import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessnumberService {

  private answer: string;

  constructor() { }

  generator(): void {

    this.answer = '';
    let templates: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    while (this.answer.length < 4) {
      const num: number = templates[Math.floor(Math.random() * templates.length)];
      this.answer += num;
      templates = templates.filter(template => {
        return template !== num;
      });
    }
    console.log('Answer:', this.answer);
  }

  validate(input: string): void {

    if (this.answer !== input) {
      let a = 0;
      let b = 0;
      const answers = Array.from(this.answer);
      const inputs = Array.from(input);
      answers.forEach((answer, index) => {
        if (answer === inputs[index]) {
          a++;
          return;
        } else {
          inputs.forEach(subAnswer => {
            if (subAnswer === answer) {
              b++;
              return;
            }
          });
        }
      });
      throw new Error(a + 'A' + b + 'B');
    }
  }
}
