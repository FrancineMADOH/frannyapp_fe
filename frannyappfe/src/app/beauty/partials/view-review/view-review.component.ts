import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { BeautyService } from '../../services/beauty.service';
import { ActivatedRoute } from '@angular/router';
import { setOptions } from 'marked';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {
  rev!: any;
  id!: number;
  isloading = true;

  constructor(private beauty:BeautyService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    setTimeout(() => {
      this.isloading =  false;
    }, 1000);

    this.beauty.getReviewbyId(this.id).subscribe((res)=>{
      this.rev= res;
      console.log(res)
      return this.rev;
    })
    
  }

  

}
