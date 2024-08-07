import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './authentication/authComponents/dashboard/dashboard.component';
import { LoginFormComponent } from './authentication/authComponents/login-form/login-form.component';
import { ResetFormComponent } from './authentication/authComponents/reset-form/reset-form.component';
import { SignupFormComponent } from './authentication/authComponents/signup-form/signup-form.component';
import { AllArticlesComponent } from './blog/all-articles/all-articles.component';
import { NewArticleComponent } from './blog/new-article/new-article.component';
import { AdministrationComponent } from './blog/administration/administration.component';
import { EditArticleComponent } from './blog/edit-article/edit-article.component';
import { ViewArticleComponent } from './blog/view-article/view-article.component';
import { BibliographieComponent } from './blog/bibliographie/bibliographie.component';
import { FaqsComponent } from './beauty/faqs/faqs.component';
import { AboutComponent } from './core/about/about.component';
import { BeautyPageComponent } from './beauty/beauty-page/beauty-page.component';
import { RdvComponent } from './beauty/rdv/rdv.component';
import { BeautifyerComponent } from './beauty/beautifyer/beautifyer.component';
import { ReviewComponent } from './beauty/review/review.component';
import { PrestationComponent } from './beauty/prestation/prestation.component';
import { AddRdvComponent } from './beauty/add-rdv/add-rdv.component';
import { AddBeautifComponent } from './beauty/add-beautif/add-beautif.component';
import { AddPrestationComponent } from './beauty/add-prestation/add-prestation.component';
import { AddReviewComponent } from './beauty/add-review/add-review.component';
import { UpdateRdvComponent } from './beauty/update-rdv/update-rdv.component';
import { UpdateBeautifComponent } from './beauty/update-beautif/update-beautif.component';
import { UpdatePrestationComponent } from './beauty/update-prestation/update-prestation.component';
import { ConfirmationComponent } from './beauty/confirmation/confirmation.component';
import { AssignrdvComponent } from './beauty/assignrdv/assignrdv.component';
import { CancelrdvComponent } from './beauty/cancelrdv/cancelrdv.component';
// import { BlogStatsComponent } from './blog/blog-stats/blog-stats.component';
import { PerformanceComponent } from './beauty/performance/performance.component';
import { CategoryComponent } from './beauty/category/category.component';
import { BookPrestationComponent } from './beauty/book-prestation/book-prestation.component';
import { MakepaiementComponent } from './beauty/makepaiement/makepaiement.component';
import { ViewbeautifComponent } from './beauty/partials/viewbeautif/viewbeautif.component';
import { ViewPrestationComponent } from './beauty/partials/view-prestation/view-prestation.component';
import { ViewRdvComponent } from './beauty/partials/view-rdv/view-rdv.component';
import { ViewReviewComponent } from './beauty/partials/view-review/view-review.component';
import { BlogcategoryComponent } from './blog/blogcategory/blogcategory.component';
import { StatisticsComponent } from './blog/statistics/statistics.component';
import { NotificationComponent } from './beauty/notification/notification.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';


const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"dashboard/:email",component:DashboardComponent, canActivate:[AuthGuard]},
  {path:"signup", component: SignupFormComponent },
  {path:"reset", component:ResetFormComponent},
  {path:"login", component:LoginFormComponent},

  
  
  //make a route for update profile
  // {path:"posts",  component:AllArticlesComponent },
  {path:"posts",  component:AllArticlesComponent},
  {path:"posts/new", component: NewArticleComponent, canActivate:[AuthGuard]},
  {path:"admin", component:AdministrationComponent, canActivate:[AuthGuard]},
  {path:"posts/edit/:id", component:EditArticleComponent, canActivate:[AuthGuard]},
  {path:"posts/view/:id/:slug", component:ViewArticleComponent},
  {path:"id/bibliographie", component: BibliographieComponent, canActivate:[AuthGuard]},
  {path:"posts/statistics",component: StatisticsComponent,canActivate:[AuthGuard] },
  {path:"beauty/faqs", component:FaqsComponent, canActivate:[AuthGuard]},
  {path:"beauty", component:BeautyPageComponent},
  {path:"about",component:AboutComponent},
  {path:"beauty/rendezvous", component:RdvComponent,canActivate:[AuthGuard]},
  {path:"beauty/beautifyers", component:BeautifyerComponent, canActivate:[AuthGuard]},

  {path:"beauty/reviews", component:ReviewComponent, canActivate:[AuthGuard]},
  {path:"beauty/prestations", component:PrestationComponent, canActivate:[AuthGuard]},
  {path:"beauty/rendezvous/add", component:AddRdvComponent, canActivate:[AuthGuard]},
  {path:"beauty/beautifyers/add", component: AddBeautifComponent, canActivate:[AuthGuard]},
  {path:"beauty/prestations/add", component:AddPrestationComponent, canActivate:[AuthGuard]},
  {path:"beauty/rendezvous/update/:id", component:UpdateRdvComponent, canActivate:[AuthGuard]},
  {path:"beauty/rendezvous/assign/:id", component:AssignrdvComponent , canActivate:[AuthGuard]},
  {path:"beauty/rendezvous/cancel/:id", component:CancelrdvComponent , canActivate:[AuthGuard]},
  {path:"beauty/performance", component:PerformanceComponent,canActivate:[AuthGuard]},

  {path:"beauty/beautifyers/update/:id", component:UpdateBeautifComponent, canActivate:[AuthGuard]},
  {path:"beauty/prestations/update/:id", component:UpdatePrestationComponent, canActivate:[AuthGuard]},
  
  //view component
  {path:"beauty/beautifyers/view/:id",component:ViewbeautifComponent , canActivate:[AuthGuard]},
  {path:"beauty/prestations/view/:id",component:ViewPrestationComponent , canActivate:[AuthGuard]},
  {path:"beauty/rendezvous/view/:id",component:ViewRdvComponent , canActivate:[AuthGuard]},
  {path:"beauty/reviews/view/:id",component:ViewReviewComponent , canActivate:[AuthGuard]},
   
  //notifications
  {path:"beauty/notifications",component:NotificationComponent, canActivate:[AuthGuard]},
  
  //public routes
  {path:"beauty/rendezvous/confirmation",component:ConfirmationComponent},
  {path:"beauty/reviews/add/:id", component:AddReviewComponent},
  {path:"beauty/faqs", component:FaqsComponent},
  {path:"beauty/category/:catName", component: CategoryComponent},
  {path:"beauty/:category/book/:id", component: BookPrestationComponent},
  {path:"beauty/rendezvous/payment/:id", component: MakepaiementComponent},
  {path:"posts/:catName",component:BlogcategoryComponent },

  //Not found page
  {path:'404' , component:NotfoundComponent},
  {path:'**', redirectTo:'/404', pathMatch:'full'},

 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
