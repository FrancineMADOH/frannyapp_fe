import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../../services/beauty.service';
import { Prestation } from '../../models/prestation';

@Component({
  selector: 'app-view-prestation',
  templateUrl: './view-prestation.component.html',
  styleUrls: ['./view-prestation.component.css']
})
export class ViewPrestationComponent implements OnInit {

  id!:number;
  prestation!:Prestation;
  isloading =  true;
  

  constructor(private router: Router, private route:ActivatedRoute, private beauty:BeautyService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    setTimeout(() => {
      this.isloading = false;
      
    }, 1000);
    this.beauty.getPrestation(this.id).subscribe((res)=>{
      this.prestation = res;
      console.log(res)
      return this.prestation;
    })
    
  }

  gotoUpdate(el:number){
    this.router.navigate(['beauty/prestations/update/' + el])
  }

}
