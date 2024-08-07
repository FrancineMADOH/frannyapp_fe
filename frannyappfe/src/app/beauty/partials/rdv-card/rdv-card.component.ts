import { Component,OnInit } from '@angular/core';
import { Rendezvous } from '../../models/rdv';
import { BeautyService } from '../../services/beauty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rdv-card',
  templateUrl: './rdv-card.component.html',
  styleUrls: ['./rdv-card.component.css']
})
export class RdvCardComponent implements OnInit{

  rdvList:Rendezvous[] = []; 
  filteredrdvList:Rendezvous[] = [];
  CancelApt = "Cancelled";
  schedApt= "Scheduled"
  OnApt= "Ongoing"
  complApt= "Completed"
  constructor(private router:Router , private beauty:BeautyService){
        this.filteredrdvList = this.rdvList;

  }

  ngOnInit(): void {
    this.beauty.getRendezvousList().subscribe((res)=>{
      res.map((data)=>{
        this.rdvList.push(data);
        return this.rdvList;
      })
    })
    
  }

  gotoUpdate(id:number){
    this.router.navigate(["/beauty/rendezvous/update/"+id]);
  }
  gotoView(el:number){
    this.router.navigate(["beauty/rendezvous/view/" + el]);
  }
  
  gotoAssign(id:number){
    this.router.navigate(["/beauty/rendezvous/assign/"+id]);
  }
  gotoCancel(id:number){
    this.router.navigate(["/beauty/rendezvous/cancel/"+id]);
  }
  gotoPayment(id:number){
    this.router.navigate(["/beauty/rendezvous/payment/"+id]);
  }
  gotoReview(id:number){
    this.router.navigate(["beauty/reviews/add/"+id]);
  }

  searchByTerm(query:string){
    const searchterm =  query.search.toString();
    if(!query){
      this.filteredrdvList = this.rdvList;
    }
    this.filteredrdvList = this.rdvList.filter( 
      Rendezvous =>
        //console.log(Prestation.title.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase()))
        Rendezvous.client_name.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase() )||
        Rendezvous?.category.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase()) ||
        // Rendezvous?.rdv_price.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase())||
        Rendezvous?.rdvstate.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase())||
        Rendezvous?.quartier.toLocaleLowerCase().includes(searchterm.toLocaleLowerCase())

       );
      
      if(this.filteredrdvList.length==0){
        this.filteredrdvList = this.rdvList;
        alert('Empty query');
      }

}

}