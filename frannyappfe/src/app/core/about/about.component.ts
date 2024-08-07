import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../core.service';
import { faArrowLeft, faStar, fas } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @ViewChild ("sendMessage", {static:true}) sendMessage:any;
  responseMessage!: string;
  messageSent!: boolean;

  constructor(private core: CoreService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.messageSent = false
   

  }



  sendMessagetoSever() {
    if (this.sendMessage.valid) {
      const infos = {
        from: this.sendMessage.value.from,
        text: this.sendMessage.value.text
      }
      // console.log(infos)
      this.core.contactFranny(infos).subscribe((res) => {
        console.log(res)
        this.responseMessage = res.message;
        return this.responseMessage;
      });
      setTimeout(() => {
        this.messageSent = true;
      }, 2000);
     }
    this.sendMessage.reset();
  }

}
