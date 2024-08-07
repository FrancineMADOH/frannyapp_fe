import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SelectServiceService } from '../../services/select-service.service';
import { BeautyService } from '../../services/beauty.service';
import { Prestation } from '../../models/prestation';

@Component({
  selector: 'app-prestation-form',
  templateUrl: './prestation-form.component.html',
  styleUrls: ['./prestation-form.component.css']
})
export class PrestationFormComponent implements OnInit {

@ViewChild("addPrestationForm", { static: true }) addPrestationForm:any;
categories:string[] = [];
id!:string;
iscreateMode!:boolean;
prestation!: Prestation;
action ="Add prestation";


  constructor(public router:Router, 
              private route:ActivatedRoute,
              private select:SelectServiceService,
              private beauty:BeautyService
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.iscreateMode = !this.id;
    console.log(this.iscreateMode)

    if(!this.iscreateMode){  
      this.action = "Update Prestation"
    this.beauty.getPrestation(Number(this.id)).subscribe((res:any)=>{      
      if(!this.iscreateMode){  
        this.addPrestationForm.form.setValue({
          title:res.title ,
          price:res.price,
          duration:res.duration,
          category:res.category,
          seance:res.seance,
          gold:res.gold,
          gold_price:res.gold_price,
          premium:res.premium,
          premium_price:res.premium_price
        })
      }
    });
    }


  }

  onSubmit(){
    if(this.iscreateMode){
      this.savePrestation(this.addPrestationForm)
    } else {
      this.updatePrestation(Number(this.id),this.addPrestationForm)
    }
  }

  savePrestation(addPrestationForm:any){
    if(this.addPrestationForm.valid){
      this.prestation = this.addPrestationForm.value;
      this.beauty.addNewPrestation (this.prestation).subscribe((res:any)=>{
         alert(res.message);
         this.router.navigate(["beauty/prestations"]);
      });
      this.addPrestationForm.reset();
    }
  }
  updatePrestation(id:number,addPrestationForm:any){
    if(this.addPrestationForm.valid){
       this.prestation = this.addPrestationForm.value ;
      this.beauty.updatePrestation(id,this.prestation).subscribe((res:any)=>{
        alert(res.message);
        this.router.navigate(["/beauty/prestations"])
      });
    }
    this.addPrestationForm.reset();
  }

  backToPrestation(){
    this.router.navigate(['beauty/prestations']);
  }

}
