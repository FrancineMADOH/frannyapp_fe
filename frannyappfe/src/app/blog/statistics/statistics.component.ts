import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  kpi!:any;
  topfive:any[] = [];
  isLoading = false;

  constructor(private blog:BlogService){}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 1000);

    this.blog.getpostbykpi().subscribe((res)=>{
      this.kpi = res;
      console.log(res)
      return this.kpi;
    });

    this.blog.getposmostCommented().subscribe((res)=>{
      res.map((el:any)=>{
        this.topfive.push(el);
      });
      console.log(res)
      return this.topfive;
    });
    
  }

}
