import { Component, OnInit, ViewChild } from '@angular/core';
import { BeautyService } from '../services/beauty.service';
import { Prestation } from '../models/prestation';
import { Faq } from '../models/faq';
import { Review } from '../models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beauty-page',
  templateUrl: './beauty-page.component.html',
  styleUrls: ['./beauty-page.component.css']
})
export class BeautyPageComponent implements OnInit {

  prestations:Prestation[] = [];
  coiffure:Prestation[] = [];
  makeup:Prestation[] = [];
  onglerie:Prestation[] = [];
  faqs:Faq[] = [];
  faqtrhree:Faq[] = [];
  reviewsthree:Review[]= [];
  reviews:Review[] = [];
  reservationDone!:boolean;
  slideInterval = 10000;
  reservation_message!:string;
  restrict_date = new Date().toISOString().split('T')[0];

  carrousel_images = [
    {"src":"assets/images/nails.jpg/","alt":"Woman taking care of nails","caption":"Brillez sans quitter le confort de votre maison.Votre salon vient a vous! Des services de beauté complets à votre convenance.Réservez maintenant, brillez plus tard  !", "title":"Soins de Beauté haut de gamme à domicile."},
    {"src":"assets/images/hairstyling.jpg/","alt":"","caption":"Des cheveux aux ongles, nous faisons tout ! Confiez a nos professionnels votre mise en beauté pour vos évenement, Ne passez plus jamais inapercu.", "title":"Des esthéticiennes qualifiées à votre service, à tout moment."},
    {"src":"assets/makeup.jpg","alt":"","caption":"Ayez fière allure, sentez-vous bien,Vos services de salon préférés, maintenant à la maison.Détendez-vous avec une expérience unique depuis le confort de votre maison", "title":"Réservation Facile, résultats époustouflants."},
    {"src":"assets/images/pres_makeup.jpg/","alt":"","caption":"Des cheveux aux ongles, nous faisons tout ! Confiez a nos professionnels votre mise en beauté pour vos évenement, Ne passez plus jamais inapercu.", "title":"Des esthéticiennes qualifiées à votre service, à tout moment."},
    {"src":"assets/images/hairstyling.jpg/","alt":"","caption":" Un mariage ? une sortie de groupe ? un shooting ? Faites confiance  à notre équipe de professionels pour un Glow up certain.", "title":"La mise en beauté pour vos événements sans stress commencent ici!"},
    {"src":"assets/images/mere.jpg/","alt":"","caption":"Nos prestations familiales sont conçu pour vous faire passer un moment de partage avec vos proches.", "title":"Un moment mere-fille ?"},
  ]


  @ViewChild("sendNotifForm", {static: true})sendNotifForm:any;


  constructor(private beauty:BeautyService,
    private router:Router,
    private route:ActivatedRoute,
    config:NgbCarouselConfig
    ){
      config.interval = 5000;  
      config.wrap = true;  
      config.keyboard = true;  
      config.pauseOnHover = true; 
    }

   ngOnInit():void {
    this.reservationDone = false;
    this.beauty.getPrestationList().subscribe((res)=>{
      res.map((data)=>{
        this.prestations.push(data);
      });
      this.coiffure = this.prestations.filter((el)=>{
        return el.category ==="Coiffure";
      });
      this.onglerie = this.prestations.filter((el)=>{
        return el.category ==="Onglerie";
      });
      this.makeup = this.prestations.filter((el)=>{
        return el.category === "Make-Up";
      });
    });
      //this faqs
      this.beauty.getFaqList().subscribe((res)=>{
        res.map((data)=>{
          this.faqs.push(data);
        })
        this.faqtrhree = this.faqs.slice(-3);
      });
      //reviews the 3 best one
      // this.beauty.getReviewList().subscribe((res)=>{
      //   res.map((data)=>{
      //     res.map((data)=>{
      //       this.reviews.push(data);
      //     })
      //     this.reviewsthree = this.reviews.slice(-3);
      //   })})
  }

  allFaq(){
    this.router.navigate(['/beauty/faqs'] )
  }

  gotoCoiffure(){
    this.router.navigate(['/beauty/category/' + "Coiffure"]);
  }
  gotoMaquillage(){
    this.router.navigate(['/beauty/category/Make-Up'])
    
  }
  gotoOnglerie(){
    this.router.navigate(['/beauty/category/Onglerie'])
  }

  //TODO
  SendNotif(sendNotifForm:any){
    if(sendNotifForm.valid){
      this.beauty.createNotif(sendNotifForm.value.phone,sendNotifForm.value.perso_name).subscribe((res)=>{
        this.reservation_message = res.message;
      });
    }
    setTimeout(() => {
      this.reservationDone=!this.reservationDone
    }, 2000);
  }
 


}


