import { Component, OnInit, ViewChild } from '@angular/core';
import { BeautyService } from '../services/beauty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rendezvous } from '../models/rdv';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-makepaiement',
  templateUrl: './makepaiement.component.html',
  styleUrls: ['./makepaiement.component.css']
})
export class MakepaiementComponent implements OnInit {
  id!:number;
  rdvstate ="Completed";
  rdv!:Rendezvous;
  isloading=true;
  paid = false;
  link!:string;
  isauth!:boolean;
  @ViewChild("paymentForm",{static:true} )paymentForm:any;


  constructor(private  beauty:BeautyService,
    private router:Router,
    private auth:AuthService,
    private route:ActivatedRoute){}


  ngOnInit(): void {
    setTimeout(() => {
      this.isloading = false;
    }, 1000);
    this.isauth =  this.auth.isLogin();
    this.id = Number(this.route.snapshot.params['id']);
    this.beauty.getRendezvous(this.id).subscribe((data)=>{
      this.rdv = data;
      this.link = `${window.location.origin}/beauty/reviews/add/${this.rdv.rdv_id}`;
      return this.rdv;
    }); 
  }

  makeCashPayment(paymentForm:any){
    paymentForm.value.rdvstate = this.rdvstate;
    if(paymentForm.valid ){
      this.beauty.makepaiement(this.id,
         this.rdvstate,
         paymentForm.value.pm,
         this.rdv.bname,
         this.rdv.client_email,
         this.rdv.rdvdate.split(" ")[0],
         this.link,
         this.rdv.client_name
         ).subscribe((res)=>{
        this.isauth ? alert(res.message) : setTimeout(() => {
          this.router.navigate(["beauty/"])
        }, 2000);
      })
      paymentForm.reset();
      this.paid = true;  
      setTimeout
     }
  }

  back(){
    this.router.navigate(["beauty/rendezvous/"])
  }

}
