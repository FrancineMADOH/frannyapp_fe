import { Component, OnInit, ViewChild } from '@angular/core';
import { BeautyService } from '../services/beauty.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  isresolve = false;
  hideform = false;
  notifications:any[] = [];
  state!:string;
  id!:number;
  message!:string;
  constructor(private beauty:BeautyService){}

  @ViewChild("resolveNotifForm", {static:true})resolveNotifForm:any;

  ngOnInit(): void {
    this.beauty.getnewNotif().subscribe((res)=>{
      res.map((el:any) => this.notifications.push(el))
      return this.notifications;
    })}

    getId(id:string){
      this.id = Number(id);

    }

  resolveNotif(resolveNotifForm:any){
    if(resolveNotifForm.valid){
      this.beauty.resoleveNotif(this.state,this.resolveNotifForm.value.comment,Number(this.id)).subscribe((res)=>{
        this.message = res.message
      });
    }
    this.resolveNotifForm.reset()
    this.isresolve = !this.isresolve;
    this.hideform = true;

  }



}
