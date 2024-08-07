import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../services/beauty.service';

@Component({
  selector: 'app-update-beautif',
  templateUrl: './update-beautif.component.html',
  styleUrls: ['./update-beautif.component.css']
})
export class UpdateBeautifComponent  implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute, private beauty: BeautyService){}
  
  ngOnInit(){
    
  }
}
