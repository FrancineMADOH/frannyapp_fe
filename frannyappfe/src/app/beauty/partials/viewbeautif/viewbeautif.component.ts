import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../../services/beauty.service';
import { Beautifyer } from '../../models/beautifyer';

@Component({
  selector: 'app-viewbeautif',
  templateUrl: './viewbeautif.component.html',
  styleUrls: ['./viewbeautif.component.css']
})
export class ViewbeautifComponent implements OnInit {
  id!:number;
  beautif!: Beautifyer;
  loading = true;

  constructor(private route: ActivatedRoute,
    private beauty:BeautyService, private router: Router ){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    setTimeout(()=>{
      this.loading = false;
    }, 1000)
    this.beauty.getBeautifyers(this.id).subscribe((data)=>{
      this.beautif = data;
      console.log(data)
     // this.link = `${window.location.origin}/beauty/reviews/add/${this.rdv.rdv_id}`;
      return this.beautif;
    }); 
  }

  gotoUpdate(el:number){
    this.router.navigate(["beauty/beautifyers/update/" + el]);
  }

}
