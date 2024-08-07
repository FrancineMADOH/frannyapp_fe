import { Component, OnInit, ViewChild,OnDestroy,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeautyService } from '../services/beauty.service';
import { SelectServiceService } from '../services/select-service.service';
import domToImage from 'dom-to-image';
import jsPDF, { jsPDFOptions } from 'jspdf';
import moment from 'moment';
import { Prestation } from '../models/prestation';
import generaterdvCode from 'src/app/shared/utils/rdvcode';
import restrictTimeSelection from 'src/app/shared/utils/restrict_time';
import { environment } from 'src/app/environment/env';

//https://medium.com/@vkbiotech841/how-to-export-html-to-pdf-file-in-angular-2e92ceb7755d
@Component({
  selector: 'app-book-prestation',
  templateUrl: './book-prestation.component.html',
  styleUrls: ['./book-prestation.component.css']
})
export class BookPrestationComponent implements OnInit {

  appointment_type =  ["Personnel","Familial","Evenement","Entreprise"];
  AllQuartier=[];

  rdvInfos!: FormGroup;
  category!:string;
  prestation!:Prestation;
  pres_id!:string
  rdvdate!:string;
  rdvcode!:string;
  rdv!:any;
  host = window.location.host;
  url!:string;
  rdvfromServer!:any;
  qrCode:any;
  copydate =  new Date().getFullYear();
  reservationDone=false;
  email_form = false;
  times_ranges:string [] = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00']
  today_time_ranges:string []= []

  time_ranges_to_display:string [] = [];
  backgroundurl!:string;
  
  presAvailable =  false;
  pdfName = "Franny Beauty  - Carte Rendez-vous";
  showconfirm = false;
  restrict_date = new Date().toISOString().split('T')[0];
  heure_actuelle = new Date().toISOString().split('T')[1].slice(0,5);

  constructor(private formBuilder:FormBuilder,
    private beauty: BeautyService,
    private select:SelectServiceService,
    private router:Router,
    private route:ActivatedRoute,
    // this.setBackgroundImage()
    
    ){}


  @ViewChild('dataToExport',  { read: ElementRef,static: false }) public dataToExport!:ElementRef;

  ngOnInit(): void {

    this.pres_id = this.route.snapshot.params['id'];
    this.category = this.route.snapshot.params['category'];
     //get the current prestation
    this.beauty.getPrestation(Number(this.pres_id)).subscribe((pres:any)=>{
      this.prestation = pres;
  });
    //get all yaounde location
    this.select.getAllLocation().subscribe((data:any)=>{
      this.AllQuartier = data.map((item:any)=>{
        return item.quartier ;
      });
    });

    if(this.category == 'Coiffure'){
      this.backgroundurl = "/assets/images/hairstyling.jpg"


    }else if(this.category == 'Onglerie'){
      this.backgroundurl = "/assets/images/blacknails.jpg"

    }else  if(this.category == 'Make-Up'){
      this.backgroundurl = "/assets/images/pres_makeup.jpg"
    }
    //display prestation
    setTimeout(() => {
      this.presAvailable = true;  
    }, 1500);

    this.times_ranges.map((el)=>{
      if(restrictTimeSelection(el)){
        this.today_time_ranges.push(el)  
      }
    })

    //personnal details form
    this.rdvInfos = this.formBuilder.group({
      client_name:['',Validators.required],
      client_phone:[null, Validators.minLength(9)],
      client_email:[""],
      ville:["",Validators.required],
      quartier:["",Validators.required],
      rdvdate: ["",Validators.required],
      rdvtype:["",Validators.required],
      rdv_price:[null,Validators.required],
      rdvtime:["",Validators.required],
    });

  }


  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    if(newValue == this.restrict_date){
      this.time_ranges_to_display = this.today_time_ranges;
    }else{
      this.time_ranges_to_display = this.times_ranges;
    }
  }

  

  //submit the form 
  onSubmit(){
    if(this.rdvInfos.valid){
    this.rdvdate = this.rdvInfos.value.rdvdate + " " + this.rdvInfos.value.rdvtime + ":00";
    //generate rdv code 
    this.rdvcode = generaterdvCode(
        this.rdvInfos.value.client_name,
        this.rdvdate,
        this.rdvInfos.value.ville,
        this.prestation.title
      );
    //provide a default 
    let email;
    let phone;
    this.rdvInfos.value.client_email == "" ? email = environment.defaultEmail : email = this.rdvInfos.value.client_email;
    this.rdvInfos.value.client_phone == null ? phone = environment.defaultPhone : phone = this.rdvInfos.value.client_phone;
    this.rdv = {
          client_name: this.rdvInfos.value.client_name ,
          client_phone: phone,
          client_email: email,
          rdvdate:this.rdvdate,
          prestation:this.pres_id,
          category:this.category,
          rdvcode:this.rdvcode,
          rdvtype:this.rdvInfos.value.rdvtype,
          rdv_price:this.rdvInfos.value.rdv_price,
          ville:this.rdvInfos.value.ville ,
          quartier: this.rdvInfos.value.quartier,
          comments: "",
          url: `${this.host}/beauty/rendezvous/payment/`
    }
    console.log(this.rdv)
    //save rdv to the database
    this.beauty.createRendezvous(this.rdv).subscribe((res:any)=>{
      this.rdvfromServer = res.data;
      this.qrCode =  res.qrcode
    });
  }
    this.rdvInfos.reset();

    setTimeout(() => {
      this.showconfirm = true;
    }, 2000);
  }
  backToPrestation(){
    this.router.navigate(['/beauty'])
  }
  //TODO https://dev.to/williamjuan27/series/14719
  
  //generate pdf from rdv card
  public downloadAsPdf(): void {
    //get the html element to convert and set properties
    const width = this.dataToExport.nativeElement.clientWidth;
    const height = this.dataToExport.nativeElement.clientHeight ;//+ 40;
    //let orientation:jsPDFOptions["orientation"] = '' ;
    let orientation: "p" | "portrait" | "l" | "landscape" | undefined
    //let imageUnit = 'pt';
    if (width > height) {
    orientation = 'l';
    } else {
    orientation = 'p';
    }
    //convert html to image 
    domToImage
    .toPng(this.dataToExport.nativeElement, {
    width: width,
    height: height
    })
    .then(result => {
      //from image to pdf
    let jsPdfOptions:jsPDFOptions = {
    orientation: orientation,
    unit: "pt",
    format: [width + 100, height + 150]
    };
    const pdf = new jsPDF(jsPdfOptions);
    pdf.setFontSize(12);
    pdf.setTextColor('#F460FC');
    pdf.text(this.pdfName ? this.pdfName.toUpperCase() : 'franny-beauty-card'.toUpperCase(), 15, 45);
    pdf.setFontSize(12);
    pdf.setTextColor('#131523');
    pdf.text( moment().format('ll' ) + `  ||  Contactez-nous au ${environment.defaultPhone}`, 15, 15);
    // pdf.text('Date: ' + moment().format('ll'), 25, 25);
    pdf.addImage(result, 'PNG', 25, 105, width , height);
    pdf.save(this.pdfName + '.pdf');
    this.router.navigate(['/beauty'])
    })
    .catch(error => {
      console.log("An error occurred: " + error)
    });
    }

}

//https://mdbootstrap.com/docs/b4/jquery/plugins/rating/
//https://medium.com/@vkbiotech841/how-to-export-html-to-pdf-file-in-angular-2e92ceb7755d