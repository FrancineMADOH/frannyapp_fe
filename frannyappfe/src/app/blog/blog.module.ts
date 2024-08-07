import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { AdministrationComponent } from './administration/administration.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { BibliographieComponent } from './bibliographie/bibliographie.component';
import { TopTenComponent } from './top-ten/top-ten.component';
import { CoreModule } from '../core/core.module';
import { CommentComponent } from './partials/comment/comment.component';
import { ArticleFormComponent } from './partials/article-form/article-form.component';
import { ArticleCardComponent } from './partials/article-card/article-card.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CommentCardComponent } from './partials/comment-card/comment-card.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BlogcategoryComponent } from './blogcategory/blogcategory.component';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';



@NgModule({
  declarations: [
    AllArticlesComponent,
    AdministrationComponent,
    NewArticleComponent,
    EditArticleComponent,
    ViewArticleComponent,
    BibliographieComponent,
    TopTenComponent,
    CommentComponent,
    ArticleFormComponent,
    ArticleCardComponent,
    CommentCardComponent,
    BlogcategoryComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AuthenticationModule,
    FormsModule,
    RouterModule
  ]
})
export class BlogModule { }
