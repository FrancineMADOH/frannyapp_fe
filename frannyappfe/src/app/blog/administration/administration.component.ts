import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/authentication/models/admin';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  adminList:Admin[] = [];
  isSuperAdmin:boolean = false;
  adminEmail = "";
  admin!:Admin;
  constructor(private auth:AuthService, router:Router ){}

  ngOnInit(): void {

    this.auth.getAllUsers().subscribe((res)=>{
      res.map((user)=>{
        this.adminList.push(user);
        return this.adminList;
      })
    });
    //get the connected user
    this.auth.getAdminInfos(this.adminEmail).subscribe((res)=>{
      this.admin = res;
      this.isSuperAdmin = Boolean(this.admin.superuser);
      console.log(this.isSuperAdmin)
      return this.admin;
    });    
  }

  deleteAdminAccount(id:number){
    this.auth.deleteAdmin(id).subscribe((res:any)=>{
      alert(res.message);
      window.location.reload();
      //this.router.navigate([admin'])
    });

  }
}
