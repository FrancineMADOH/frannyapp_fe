import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { Prestation } from '../../models/prestation';
import { Router } from '@angular/router';
import { BeautyService } from '../../services/beauty.service';

@Component({
  selector: 'app-prestation-card',
  templateUrl: './prestation-card.component.html',
  styleUrls: ['./prestation-card.component.css']
})
export class PrestationCardComponent implements OnInit {

  prestationList:Prestation[] = [];
  filteredList:Prestation[]=[];


  constructor(private router:Router, private beauty:BeautyService){
    this.filteredList = this.prestationList;
  }

  ngOnInit(): void {
    this.beauty.getPrestationList().subscribe((data)=>{
      data.map((el)=>{
        this.prestationList.push(el);
        return this.prestationList;
      })
    })

  }

  gotoUpdate(el:number){
    this.router.navigate(['beauty/prestations/update/' + el])
  }

  gotoView(el:number){
    this.router.navigate(["beauty/prestations/view/" + el]);
  }

  searchPrestationByTerm(query:string){
    const searchterm =  query.search.toString();
    if(!query){
      this.filteredList = this.prestationList;
    }
    this.filteredList = this.prestationList.filter( 
      Prestation =>
        //console.log(Prestation.title.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase()))
        Prestation.title.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase() )||
        Prestation?.category.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase()) ||
        Prestation?.seance.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase())
       );
      
      if(this.filteredList.length==0){
        this.filteredList = this.prestationList;
        alert('Empty query');
      }

  }
}
