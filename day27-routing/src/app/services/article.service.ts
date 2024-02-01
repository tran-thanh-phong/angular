import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

const Articles: Article[] = [
  {
    id: '1',
    slug: 'bai-viet-1',
    title: 'Bai viet 1',
    content: 'Day la noi dung bai viet 1',
    updatedAt: '2020-07-06T13:26:31.785Z',
  },
  {
    id: '2',
    slug: 'bai-viet-2',
    title: 'Bai viet 2',
    content: 'Day la noi dung bai viet 2 nhe',
    updatedAt: '2020-07-15:00:00.000Z',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ArticleServcie {
  getArticles(): Observable<Article[]> {
    return of(Articles).pipe(delay(500));
  }

  getArticleBySlug(slug: string | null): Observable<Article | undefined> {
    let article = Articles.find((x) => x.slug === slug);
    return of(article).pipe(delay(500));
  }
}
