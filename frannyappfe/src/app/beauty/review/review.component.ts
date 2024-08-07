import { Component, OnInit, ViewChild } from '@angular/core';
import { Review } from '../models/review';
import { Router } from '@angular/router';
import { BeautyService } from '../services/beauty.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviews:Review[]  = [];
  filteredReviews:Review[]=[];
  @ViewChild("filterReview", {static: true}) filterReview:any

  constructor(private router:Router, private beauty:BeautyService ){
    this.filterReview = this.reviews;
  }
  ngOnInit(){

    

  }
  filterReviewBy(filterReview:any){
    this.filterReview.reset();
  }

}
