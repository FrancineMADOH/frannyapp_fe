import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit{

  @ViewChild("searchPrestation", { static: true }) searchPrestation:any

  constructor(private router:Router){}
  ngOnInit(): void {
    
  }

  goToNewPrestation(){
    this.router.navigate(['beauty/prestations/add']);
  }

 

}
