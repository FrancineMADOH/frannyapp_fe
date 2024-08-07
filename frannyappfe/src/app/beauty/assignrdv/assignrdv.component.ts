import { Component,OnInit, ViewChild } from '@angular/core';
import { BeautyService } from '../services/beauty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beautifyer } from '../models/beautifyer';

@Component({
  selector: 'app-assignrdv',
  templateUrl: './assignrdv.component.html',
  styleUrls: ['./assignrdv.component.css']
})
export class AssignrdvComponent implements OnInit {

  BeautyfyerList: Beautifyer[] = [];
  id!:number;
  rdvstate="Ongoing";
  rdv!:any;
  beau!:Beautifyer;
  @ViewChild("assignrdvForm",{static:true} )assignrdvForm:any;

  constructor(public router:Router
     , private beauty:BeautyService,
     private route:ActivatedRoute
     ){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.beauty.getBeautifyerList().subscribe((data)=>{
      data.map((el)=>{
        this.BeautyfyerList.push(el);
      });
      return this.BeautyfyerList;
    });

    //get the rdv infos
    this.beauty.getRendezvous(this.id).subscribe((rdv)=>{
      this.rdv = rdv;
      console.log(this.rdv);
      return this.rdv;
    })
  }

  //assign
  assignApointment(assignrdvForm:any){
    var doneby = this.assignrdvForm.value.doneby;

   
    
    if(this.assignrdvForm.valid){
            //assign rdv
            this.beauty.assignRendezvous(this.id,
              doneby,
              this.rdvstate,
              this.rdv.rdvdate.split(' ')[0],
              this.rdv.rdvdate.split(' ')[1],
              this.rdv.client_email,
              this.rdv.category,
              this.rdv.title,
              this.rdv.client_name
              )
            .subscribe((res:any)=>{
            alert(res.message);
            }); 
      
    }
    this.assignrdvForm.reset();
    this.router.navigate(["/beauty/rendezvous"]);
  }
    

}
