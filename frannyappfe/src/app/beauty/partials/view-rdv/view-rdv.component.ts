import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rendezvous } from '../../models/rdv';
import { BeautyService } from '../../services/beauty.service';

@Component({
  selector: 'app-view-rdv',
  templateUrl: './view-rdv.component.html',
  styleUrls: ['./view-rdv.component.css']
})
export class ViewRdvComponent implements OnInit {
  rdv!:Rendezvous;
  rdvList:Rendezvous[] = []; 
  filteredrdvList:Rendezvous[] = [];
  CancelApt = "Cancelled";
  schedApt= "Scheduled"
  OnApt= "Ongoing"
  complApt= "Completed"
  id!:number;
  isloading= true;

  constructor(private router:Router, private route:ActivatedRoute,
    private beauty:BeautyService){}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    setTimeout(() => {
      this.isloading =false;
    }, 1000);

    this.beauty.getRendezvous(this.id).subscribe((res)=>{
      this.rdv = res;
      return this.rdv
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


}
