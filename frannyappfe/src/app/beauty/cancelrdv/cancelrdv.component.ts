import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../services/beauty.service';

@Component({
  selector: 'app-cancelrdv',
  templateUrl: './cancelrdv.component.html',
  styleUrls: ['./cancelrdv.component.css']
})
export class CancelrdvComponent implements OnInit{
  id!:number;
  rdvstate = "Cancelled";

  @ViewChild("cancelrdvForm",{static:true} )cancelrdvForm:any;
  constructor(
    public router:Router,
    public route:ActivatedRoute,
    private beauty:BeautyService
     ){}



  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    
  }

  cancelApointment(cancelrdvForm:any){
    if(this.cancelrdvForm.valid){
      this.beauty.cancelRendezvous(this.id,this.rdvstate,this.cancelrdvForm.value).subscribe((res:any)=>{
        console.log(res);
        alert(res.message)
        this.router.navigate(['/beauty/rendezvous'])
      });
      this.cancelrdvForm.reset();
    }
  }

}
