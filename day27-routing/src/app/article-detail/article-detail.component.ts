import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticleServcie } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit {
  article$!: Observable<Article | undefined>;

  constructor(private _articleService: ArticleServcie, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('Begin init');
    let slug = this._route.snapshot.paramMap.get('slug');

    console.log('slug', slug);

    this.article$ = this._articleService.getArticleBySlug(slug);
  }
}
