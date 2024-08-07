import { AfterContentInit, Component,OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../services/beauty.service';
import { Rendezvous } from '../models/rdv';
import { Review } from '../models/review';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {  
  id!: string;
  rdv!:Rendezvous;
  date:any = [];
  values:any = [];
  review!:Review;
  isauth!:boolean;
  isuser!:boolean;
  isreview!:boolean;
  mess!:string;
  isloading=true;


  @ViewChild("addReviewForm", {static:true}) addReviewForm:any;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private beauty:BeautyService,
    private auth:AuthService
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isreview =  false;
    setTimeout(() => {
      this.isloading = false;
    }, 2000);
    //get infos about the rdv
    this.beauty.getRendezvous(Number(this.id)).subscribe((res)=>{
      this.rdv = res;
      this.values.push(this.rdv.client_name)
      this.values.push(this.rdv.bname);
      this.date = this.rdv.rdvdate.split(' ')
            return this.rdv;
    });
    this.isauth = this.auth.isLogin();
    this.isauth ? this.isuser = false: this.isuser= true;
  }
  
  saveUserReview(addReviewForm:any){
    if(this.addReviewForm.valid){
     this.addReviewForm.value.rdvid = this.rdv.rdv_id;
     this.addReviewForm.value.review_date = new Date().toLocaleString();
     this.review = this.addReviewForm.value;
     this.beauty.addReview(this.review).subscribe((res:any)=>{
      this.isauth ? alert(res.message): null ;
     })}
    this.addReviewForm.reset();
    if(this.isauth){
      this.router.navigate(['beauty/rendezvous']);
    }else{
      this.isreview = !this.isreview
      this.mess = 'Votre avis a été enregistré';

      setTimeout(() => {
       this.router.navigate(['beauty/'])
      }, 3000);
    }
  }

}
