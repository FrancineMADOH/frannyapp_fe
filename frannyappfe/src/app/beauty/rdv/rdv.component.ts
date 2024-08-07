import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {

  @ViewChild('searchRendezVous', {static:true}) searchRendezVous:any;
  constructor(private router:Router){}

  ngOnInit(): void { 
     
  }
  searchArticleByTerm(searchRendezVous:any){
    this.searchRendezVous.reset();
  }
  goToNewAppointmentPage(){
    this.router.navigate(['beauty/']);
  }

}
