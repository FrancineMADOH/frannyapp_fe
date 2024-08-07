import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqFormComponent } from './partials/faq-form/faq-form.component';
import { FaqCardComponent } from './partials/faq-card/faq-card.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BeautifyerCardComponent } from './partials/beautifyer-card/beautifyer-card.component';
import { BeautifyerFormComponent } from './partials/beautifyer-form/beautifyer-form.component';
import { PrestationFormComponent } from './partials/prestation-form/prestation-form.component';
import { PrestationCardComponent } from './partials/prestation-card/prestation-card.component';
import { RdvCardComponent } from './partials/rdv-card/rdv-card.component';
import { RdvFormComponent } from './partials/rdv-form/rdv-form.component';
import { ReviewCardComponent } from './partials/review-card/review-card.component';
import { PrestationComponent } from './prestation/prestation.component';
import { ReviewComponent } from './review/review.component';
import { BeautifyerComponent } from './beautifyer/beautifyer.component';
import { RdvComponent } from './rdv/rdv.component';
import { BeautyPageComponent } from './beauty-page/beauty-page.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddRdvComponent } from './add-rdv/add-rdv.component';
import { AddBeautifComponent } from './add-beautif/add-beautif.component';
import { AddPrestationComponent } from './add-prestation/add-prestation.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { UpdateRdvComponent } from './update-rdv/update-rdv.component';
import { UpdateBeautifComponent } from './update-beautif/update-beautif.component';
import { UpdatePrestationComponent } from './update-prestation/update-prestation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CancelrdvComponent } from './cancelrdv/cancelrdv.component';
import { AssignrdvComponent } from './assignrdv/assignrdv.component';
import { PerformanceComponent } from './performance/performance.component';
import { CategoryComponent } from './category/category.component';
import { BookPrestationComponent } from './book-prestation/book-prestation.component';
import { MakepaiementComponent } from './makepaiement/makepaiement.component';
import { SharedModule } from '../shared/shared.module';
import { EmptyComponent } from '../shared/empty/empty.component';
import { ViewbeautifComponent } from './partials/viewbeautif/viewbeautif.component';
import { ViewPrestationComponent } from './partials/view-prestation/view-prestation.component';
import { ViewRdvComponent } from './partials/view-rdv/view-rdv.component';
import { ViewReviewComponent } from './partials/view-review/view-review.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    FaqsComponent,
    FaqFormComponent,
    FaqCardComponent,
    BeautifyerCardComponent,
    BeautifyerFormComponent,
    PrestationFormComponent,
    PrestationCardComponent,
    RdvCardComponent,
    RdvFormComponent,
    ReviewCardComponent,
    PrestationComponent,
    ReviewComponent,
    BeautifyerComponent,
    RdvComponent,
    BeautyPageComponent,
    AddRdvComponent,
    AddBeautifComponent,
    AddPrestationComponent,
    AddReviewComponent,
    UpdateRdvComponent,
    UpdateBeautifComponent,
    UpdatePrestationComponent,
    ConfirmationComponent,
    CancelrdvComponent,
    AssignrdvComponent,
    PerformanceComponent,
    CategoryComponent,
    BookPrestationComponent,
    MakepaiementComponent,
    ViewbeautifComponent,
    ViewPrestationComponent,
    ViewRdvComponent,
    ViewReviewComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class BeautyModule { }
