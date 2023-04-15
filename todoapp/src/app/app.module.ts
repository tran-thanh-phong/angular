import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { ToggleComponent } from './toggle/toggle.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { ButtonComponent } from './button/button.component';
import { PipeExampleComponent } from './PipeExample/pipe-example.component';
import { AppTitlePipe } from './libs/app-title.pipe';
import { IsAdultPipe } from './libs/pipes/is-adult.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    BookstoreComponent,
    ProgressBarComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    ToggleComponent,
    TabContainerComponent,
    ButtonComponent,
    PipeExampleComponent,
    AppTitlePipe,
    IsAdultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
