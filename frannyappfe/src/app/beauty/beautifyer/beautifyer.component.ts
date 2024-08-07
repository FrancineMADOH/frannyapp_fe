import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BeautyService } from '../services/beauty.service';
import { Beautifyer } from '../models/beautifyer';

@Component({
  selector: 'app-beautifyer',
  templateUrl: './beautifyer.component.html',
  styleUrls: ['./beautifyer.component.css']
})
export class BeautifyerComponent implements OnInit {

  beautifList:Beautifyer[]=[];
  @ViewChild("searchbeautifyer", {static:true}) searchbeautifyer:any;

  constructor(private router:Router, private beau: BeautyService){}

  ngOnInit(): void {
    this.beau.getBeautifyerList().subscribe((res:Beautifyer[])=>{
      res.map((el:Beautifyer)=>{
        this.beautifList.push(el);
        return this.beautifList;
      })
    });    
  }
  gotoAddBeautifyerPage(){
    this.router.navigate(['beauty/beautifyers/add'])
  }

  searchBeautifyerTerm(searchbeautifyer:any){
    this.searchbeautifyer.reset();
  }

}
