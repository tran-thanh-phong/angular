import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppTitlePipe } from '../libs/app-title.pipe'
import { Observable, finalize, map, retry, startWith, takeWhile, timer } from 'rxjs';
import { User } from '../libs/pipes/is-adult.pipe';

@Component({
  selector: 'app-pipe-example',
  templateUrl: './pipe-example.component.html',
  styleUrls: ['./pipe-example.component.scss']
})
export class PipeExampleComponent implements OnInit {
  dob = new Date();
  dateFormats = ['fullDate', 'medium', 'shortTime', 'mm:ss', '', '', '', '', '', ''];

  userIdChangeAfterFiveSeconds = '14324';

  timer: Observable<number> = timer(0, 1000).pipe(
    map((val) => 5 - (val + 1)),
    startWith(5),
    finalize(() => {
      this.userIdChangeAfterFiveSeconds = '';
    }),
    takeWhile((val) => val > 0)
  );

  users: User[] = [
    {
      name: "Tiep Phan",
      age: 30
    },
    {
      name: "Trung Vo",
      age: 28
    },
    {
      name: "Chau Tran",
      age: 29
    },
    {
      name: "Tuan Anh",
      age: 16
    }
  ];

  newUser!: User;

  ngOnInit(): void {
    this.newUser = new User();
  }

  addUser(keepCurrentArray: boolean = true) {
    if (!this.newUser.age || !this.newUser.name)
    {
      alert('The name or age is empty. Please fill again!');
      return;
    }

    console.log('keepCurrentArray: ', keepCurrentArray);
    
    if (keepCurrentArray) {
      this.users.push(this.newUser);
    } else {
      this.users = [...this.users, this.newUser];
    }

    this.newUser = new User();
  }
}
