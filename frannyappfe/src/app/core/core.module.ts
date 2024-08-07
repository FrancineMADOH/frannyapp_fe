import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    HeaderComponent,
    FormsModule,
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    FooterComponent ,
    AboutComponent
  ]
})
export class CoreModule {
 

 }
