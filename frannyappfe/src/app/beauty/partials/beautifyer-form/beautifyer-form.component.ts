import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SelectServiceService } from '../../services/select-service.service';
import { Location } from '../../models/location';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Admin } from 'src/app/authentication/models/admin';
import generateBeautifCode from 'src/app/shared/utils/bcode';
import { BeautyService } from '../../services/beauty.service';
import { Beautifyer } from '../../models/beautifyer';

@Component({
  selector: 'app-beautifyer-form',
  templateUrl: './beautifyer-form.component.html',
  styleUrls: ['./beautifyer-form.component.css']
})
export class BeautifyerFormComponent implements OnInit {

  @ViewChild("addBeautifForm", {static: true}) addBeautifForm: any;

  allLocation:Location[] = [];
  allVille:any= [];
  allUsers: Admin[] = [];
  beautifCode = "";
  beautif!:Beautifyer;
  iscreateMode!:boolean;
  id!:string;
  loadBeautif!:any;

  constructor(private router:Router,
  private route: ActivatedRoute,
  private select:SelectServiceService,
  private auth: AuthService,
  private beauti:BeautyService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.iscreateMode = !this.id;

    this.select.getAllLocation().subscribe(
      (location:Location[])=>{
        this.allLocation =   location.map((el:Location)=>{
          return el
        });
      });
      this.select.getAllVille().subscribe((el)=>{
        this.allVille = el.map((a)=>{
          return a;
        })
      });

      this.auth.getAllUsers().subscribe(
        (data:Admin[])=>{
          this.allUsers =   data.map((el:Admin)=>{
            return el
          });
        });

        if(!this.iscreateMode){
          this.beauti.getBeautifyers(parseInt(this.id)).subscribe((res: any) => {
            console.log(res)
            if (!this.iscreateMode) {
              this.addBeautifForm.form.setValue({
                bname: res.bname,
                email: res.email,
                quartier: res.quartier,
                phone: res.phone,
                details: res.details,
                recruit_date: res.recruit_date,
                ville: res.ville,
                create_by: res.create_by,
                beautifcode: res.beautifcode,
                id_number: res.id_number || '00000000000000000',
                //admin_name: res.data.admin_name
              })
            }
        });
        }
  }

 backtoBeautifList(){
    this.router.navigate(['beauty/beautifyers']);
  }

  onSubmit(){
    if(this.iscreateMode){
      this.saveBeautif(this.addBeautifForm);
    }else{
      this.updateBeautif(parseInt(this.id),this.addBeautifForm);
    }
  }

  saveBeautif(addBeautifForm:any){
    this.beautifCode = generateBeautifCode(this.addBeautifForm.value.recruit_date,this.addBeautifForm.value.bname,this.addBeautifForm.value.ville,this.addBeautifForm.value.quartier);
    this.addBeautifForm.value.beautifcode = this.beautifCode;
    this.addBeautifForm.value.create_by = parseInt((this.addBeautifForm.value.create_by));
    if(this.addBeautifForm.valid){
      this.beautif = this.addBeautifForm.value;
      this.beauti.addBeautifyer(this.beautif).subscribe((res)=>{
        alert(res.message);
      });
      this.router.navigate(["beauty/beautifyers"]);
    }
    this.addBeautifForm.reset()
  }

  updateBeautif(id:number,addBeautifForm:any){
    this.beautifCode = generateBeautifCode(this.addBeautifForm.value.recruit_date,this.addBeautifForm.value.bname,this.addBeautifForm.value.ville,this.addBeautifForm.value.quartier);
    this.beautif = this.addBeautifForm.value;
    this.addBeautifForm.value.create_by = parseInt((this.addBeautifForm.value.create_by));
    this.addBeautifForm.value.phone = parseInt((this.addBeautifForm.value.phone));
    if(this.addBeautifForm.valid){
      this.addBeautifForm.value.beautifcode = this.beautifCode;
      this.beauti.updateBeautifyer(id,this.beautif).subscribe((res)=>{
        console.log(res)
        alert(res.message);
        this.router.navigate(["beauty/beautifyers"]);
      });
    }
    this.addBeautifForm.reset()
  }

}
