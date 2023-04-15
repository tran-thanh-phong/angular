import { Pipe, PipeTransform } from '@angular/core';

export class User {
  name: string;
  age: number;

  constructor() {
    this.name = '';
    this.age = 0;
  }
}

@Pipe({
  name: 'isAdult',
  //pure: false // Check change for all items in the collection. This may cause performance issue.
})
export class IsAdultPipe implements PipeTransform {

  transform(arr: User[]): User[] {
    return arr.filter((x) => x.age > 18);
  }
}
