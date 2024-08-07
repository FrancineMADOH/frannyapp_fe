import { Component, OnInit, ViewChild } from '@angular/core';
import { BeautyService } from '../../services/beauty.service';
import { FaqsComponent } from '../../faqs/faqs.component';
import { Faq } from '../../models/faq';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.css']
})
export class FaqCardComponent implements OnInit {

  faqList:Faq[]=[];
  id!:string;
  isAuth!:boolean;
  emptydb= true;

  @ViewChild("deleteFaqForm", {static: true}) deleteFaqForm:any;

  constructor(private beauty:BeautyService,
    private auth:AuthService
    ){}

  ngOnInit(): void {
    this.isAuth = this.auth.isLogin()
    this.beauty.getFaqList().subscribe((res:Faq[])=>{
      res.map((data)=>{
        this.faqList.push(data);
        return this.faqList;
      });
    });

    if(this.faqList.length == 0){
      this.emptydb = false;
    }
  }

  //deletequestion
  deleteFaq(deleteFaqForm:any,id:number){
    console.log('i am clicked ')
    this.beauty.deleteFaq(id).subscribe((res:any)=>{
      alert(res.message);
      location.reload();
    });
  }


}
