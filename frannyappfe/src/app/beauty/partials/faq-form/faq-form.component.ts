import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Faq } from '../../models/faq';
import { BeautyService } from '../../services/beauty.service';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {

  @ViewChild("addFaqForm", { static: true }) addFaqForm:any

  faq!:Faq;
  succesMessage:string = "";
  categories:string[] = ["Coiffure","Onglerie","Make-Up","Massage","Soins du visage"]

  constructor(private router:Router, private beauty:BeautyService){}

  ngOnInit(): void {
    
  }
  saveNewFaq(addFaqForm:any){

    if(this.addFaqForm.valid){
      this.faq = this.addFaqForm.value;
      this.beauty.addNewFaq(this.faq).subscribe((res:any)=>{
        this.succesMessage = res.message;
        alert(this.succesMessage);
      })
    }
    this.addFaqForm.reset();

  }


}
