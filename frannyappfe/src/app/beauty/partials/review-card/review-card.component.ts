import { Component,OnInit, ViewChild } from '@angular/core';
import { Review, ReviewExtension } from '../../models/review';
import { Router } from '@angular/router';
import { Beauty } from '../../models/beauty';
import { BeautyService } from '../../services/beauty.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  reviews:ReviewExtension[]  = [];
  filteredReviews:ReviewExtension []=[];
  searrch:string  = "";
  constructor(private router:Router, private beauty:BeautyService ){
    this.filteredReviews = this.reviews;

  }
  ngOnInit(): void {
    this.beauty.getReviewList().subscribe((res)=>{
      res.map((data:any)=>{
        this.reviews.push(data);
        return this.reviews;
      }
      )});
    
  }

  filterReviewBy(query:string){
    const searchterm = query.search.toString();

    if(!query){
      this.filteredReviews =  this.reviews;
    }
    this.filteredReviews = this.reviews.filter(
    Reviews => 
    Reviews?.bname.toLowerCase().includes(searchterm.toLocaleLowerCase())||
    Reviews?.note.toString().toLowerCase().includes(searchterm.toLocaleLowerCase())||
    Reviews?.comment.toLowerCase().includes(searchterm.toLocaleLowerCase())
    );
    
  }

  gotoView(el:number){
    this.router.navigate(["beauty/reviews/view/" + el]);
  }


}
