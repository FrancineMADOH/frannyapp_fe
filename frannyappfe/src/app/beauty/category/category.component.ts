import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestation } from '../models/prestation';
import { BeautyService } from '../services/beauty.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category!:string;
  prestations:Prestation[]= [];
  constructor(private route:ActivatedRoute,
    private beauty:BeautyService,
    private router:Router
     ){}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['catName'];
    this.beauty.getPrestationBCategory(this.category).subscribe((res)=>{
      res.map((pres:any)=>{
        console.log(pres)
        this.prestations.push(pres);
      })
    })
  }

  bookPrestation(id:number){
    this.router.navigate([`/beauty/${this.category}/book/${id}`])
  }

}
