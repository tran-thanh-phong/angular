import { AppRoutingModule } from './../../../../todoapp/src/app/app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticleServcie } from '../services/article.service';
import { RouterLink  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
  articles$!: Observable<Article[]>;

  constructor(private _articleService: ArticleServcie) {}

  ngOnInit(): void {
    this.articles$ = this._articleService.getArticles();
  }

}
