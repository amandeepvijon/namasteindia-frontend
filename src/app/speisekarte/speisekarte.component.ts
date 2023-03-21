import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-speisekarte',
  templateUrl: './speisekarte.component.html',
  styleUrls: ['./speisekarte.component.scss']
})
export class SpeisekarteComponent implements OnInit {
  env = environment;
  pdfData:any;
  pdfSource: string ='';
  categorymenuData:any;
  menuData:any;
  toggleDiv: boolean = false;
  toggleData:any;



  constructor(private router:Router,private userservice:UserserviceService) { }

  ngOnInit(): void {
    this.getCategoryMenu();
    this.getPdf();
    this.getpdfcard();
  }

  reservation(){
    this.router.navigate(['/reservierung']);
  }

  getPdf(){
    this.userservice.getPdf().subscribe(resp => {
      console.log(resp,"testingpdf");
      this.pdfData=resp;
      this.pdfSource = environment.pdfUrl  + this.pdfData.pdf;
    },
    (err) => {
      console.error(err);
    })
  }

  getCategoryMenu(){
    this.userservice.getCategoryMenu().subscribe(resp => {
      console.log(resp,"testingAllcategorymenu");
      this.categorymenuData=resp.data;
      console.log(this.categorymenuData,"tetsinggetcategoryMenu");
    },
    (err) => {
      console.error(err);
    })
  }

  getpdfcard(){
    this.userservice.getpdfcard().subscribe(resp => {
      console.log(resp,"getpdfcard");
      this.toggleDiv=resp.data.isMenuPdf;
    },
    (err) => {
      console.error(err);
    })
  }
}
