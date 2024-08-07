import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faStar , fas} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    date = new Date().getFullYear()


  ngOnInit(): void {
  }


}
