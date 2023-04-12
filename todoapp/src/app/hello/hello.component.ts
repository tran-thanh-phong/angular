import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent {
  user = {
    name: 'Pi',
    age: 12
  };
  counter: number = 0;

  sayHi(value: any) {
    alert('Hi ' + value + '! You have clicked on the button!');
  };
}
