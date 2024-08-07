import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rendezvous } from '../../models/rdv';
import { Prestation } from '../../models/prestation';
import { Location } from '../../models/location';
import { BeautyService } from '../../services/beauty.service';
import { SelectServiceService } from '../../services/select-service.service';
import generaterdvCode from 'src/app/shared/utils/rdvcode';
@Component({
  selector: 'app-rdv-form',
  templateUrl: './rdv-form.component.html',
  styleUrls: ['./rdv-form.component.css']
})
export class RdvFormComponent implements OnInit {
  id!:string;
  iscreateMode!:boolean;
  rdvCode = "";
  rdv!: Rendezvous;
  restrict_date = new Date().toISOString().split('T')[0];
  prestation!:Prestation;
  prestations:Prestation[] = [];
  seance = [ "Classic","Gold","Premium" ];
  appointment_type =  ["Personnel","Familial","Evenement","Entreprise"];
  appointment_state = ["Scheduled,Ongoing","Completed","Cancelled"];
  allLocation:Location [] = [];
  allVille:any= [];
  ville = "";
  action="Create";
  categories = ["Coiffure","Onglerie","Make-Up","Massage","Soins du visage"];

  @ViewChild ("addRendezvousForm", {static:true}) addRendezvousForm:any;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private beauty:BeautyService,
              private select:SelectServiceService
              ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.iscreateMode = !this.id;

    //load ville
    this.select.getAllLocation().subscribe(
      (location:Location[])=>{
        this.allLocation =   location.map((el:Location)=>{
          return el
        });
      });
      this.select.getAllVille().subscribe((el)=>{
        this.allVille = el.map((a)=>{
          return a;
        })
      });

    //load prestations
    this.beauty.getPrestationList().subscribe((res)=>{
      res.map((pres)=>{
        return this.prestations.push(pres);
         //this.prestations;
      });
    });
    //load the rdv to modify
    if(!this.iscreateMode){
      this.action = "Update";
      this.beauty.getRendezvous(Number(this.id)).subscribe((res)=>{
        this.beauty.getPrestation(Number(res.prestation)).subscribe((data)=>{
          this.prestation = data;
         console.log(data)
          return this.prestation;
        });
        this.addRendezvousForm.form.setValue({
          client_name: res.client_name,
          client_phone: res.client_phone ,
          client_email:res.client_email ,
          rdvdate:res.rdvdate ,
          prestation: res.prestation ,
          category: res.category,
          rdvcode: res.rdvcode,
         // rdvtype: res.rdvtype,
          rdv_price:res.rdv_price ,
          ville: res.ville,
          quartier:res.quartier ,
          comments: res.comments,
        })
      })
      
    }
  }

  onSubmit():void{
    if(this.iscreateMode){
      this.saveRendezVous(this.addRendezvousForm)
    }else{
      this.updateRdv(parseInt(this.id), this.addRendezvousForm)
    }
  }

  saveRendezVous(addRendezvousForm:any){
    this.rdvCode = generaterdvCode(
    this.addRendezvousForm.value.client_name,
    this.addRendezvousForm.value.rdvdate,
    this.addRendezvousForm.value.ville,
    this.addRendezvousForm.value.quartier,
    // this.addRendezvousForm.value.prestation,
    //this.addRendezvousForm.value.category,
    //this.addRendezvousForm.value.rdvtype
    );
    this.addRendezvousForm.value.rdvcode  = this.rdvCode;
    this.addRendezvousForm.value.rdv_price = parseInt(this.addRendezvousForm.value.rdv_price);

    if(addRendezvousForm.valid){
      this.rdv =  this.addRendezvousForm.value;
      this.beauty.createRendezvous(this.rdv).subscribe((res:any)=>{
        console.log(res);
        alert(res.message);
        this.router.navigate(['/beauty/rendezvous'])
       })
    }
    this.addRendezvousForm.reset();
  }

  updateRdv(id:number,addRendezvousForm:any){
    this.rdvCode = generaterdvCode(
      this.addRendezvousForm.value.client_name,
      this.addRendezvousForm.value.rdvdate,
      this.addRendezvousForm.value.ville,
      this.addRendezvousForm.value.quartier,
      // this.addRendezvousForm.value.prestation,
      //this.addRendezvousForm.value.category,
      //this.addRendezvousForm.value.rdvtype
      );
      
      this.addRendezvousForm.value.rdvcode  = this.rdvCode;
    //   this.addRendezvousForm.value.rdv_price = parseInt(this.addRendezvousForm.value.rdv_price);
    console.log(this.addRendezvousForm.value)
      if(this.addRendezvousForm.valid){
      this.rdv = this.addRendezvousForm.value;
      this.beauty.updateRendezvous(id,this.rdv).subscribe((res:any)=>{
        console.log(res);
        alert(res.message);
        this.router.navigate(['beauty/rendezvous']);
      });
      this.addRendezvousForm.reset();
    }

  }
  backToRdv(){
    this.router.navigate(['beauty/rendezvous'])
  }

}
