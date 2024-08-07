import { Component, OnInit } from '@angular/core';
import { BeautyService } from '../services/beauty.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  metrics!:any;
  topEarners:any[] = [];
  prestations:any[] = [];
  isLoading = false;
  constructor(private beauty:BeautyService){}

  ngOnInit(): void {

    setTimeout(()=>{
      this.isLoading = true;
    },2000)
    this.beauty.getMetrics().subscribe((res)=>{
      this.metrics = res;
      console.log(this.metrics)
      return this.metrics
    });
    

    //tables
    this.beauty.topEarners().subscribe((res)=>{
      res.map((el:any)=>{
        this.topEarners.push(el);
      })
      return this.topEarners;
    });

    this.beauty.topPrestation().subscribe((res)=>{
      res.map((el:any)=>{
        this.prestations.push(el);
      })
      return this.prestations;
    })
    
  }

}
