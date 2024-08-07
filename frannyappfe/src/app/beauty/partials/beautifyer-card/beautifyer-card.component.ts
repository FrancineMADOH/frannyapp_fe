import { Component, Input,OnInit } from '@angular/core';
import { Beautifyer } from '../../models/beautifyer';
import { BeautyService } from '../../services/beauty.service';
import { Router } from '@angular/router';
import searchByTerm from 'src/app/shared/utils/search';


@Component({
  selector: 'app-beautifyer-card',
  templateUrl: './beautifyer-card.component.html',
  styleUrls: ['./beautifyer-card.component.css']
})
export class BeautifyerCardComponent implements OnInit {
  beautifList:Beautifyer[]= [];
  filteredList:Beautifyer[]=[];
  searchVal:string= "";
  emptydb = true;

constructor(private beau: BeautyService, public router: Router){
  this.filteredList = this.beautifList
}

ngOnInit():void{
  this.beau.getBeautifyerList().subscribe((res:Beautifyer[])=>{
    res.map((el)=>{
      this.beautifList.push(el);
      return this.beautifList;  
    });
  }); 

  if(this.beautifList.length == 0){
    this.emptydb = false;
  }
}

gotoUpdate(el:number){
  this.router.navigate(["beauty/beautifyers/update/" + el]);
}

gotoView(el:number){
  this.router.navigate(["beauty/beautifyers/view/" + el]);
}

searchBeautifyerTerm(query:string){
  const searchterm = query.search.toString();
  if(!query){
    this.filteredList = this.beautifList;
  }
this.filteredList = this.beautifList.filter(
  Beautifyer =>
   Beautifyer?.bname.toLowerCase().includes(searchterm.toLocaleLowerCase()) ||
   Beautifyer?.ville.toLowerCase().includes(searchterm.toLocaleLowerCase()) ||
   Beautifyer.quartier.toLowerCase().includes(searchterm.toLocaleLowerCase())
   )
}

}

//https://angular.io/tutorial/first-app/first-app-lesson-13
