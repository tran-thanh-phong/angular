import { Component, OnInit } from '@angular/core';
import { Author, authors } from '../authors'

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = authors;
  constructor() {}
  ngOnInit() {}

  handleDeleteAuthor(author: Author) {
    this.authors = this.authors.filter(x => x.id !== author.id);
  }

  reload() {
    this.authors = authors;
  }
}

