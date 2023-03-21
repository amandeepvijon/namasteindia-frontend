import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {inject} from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActiveClassService } from '../services/active-class.service';
import { environment } from 'src/environments/environment';
import { UserserviceService } from '../services/userservice.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  active:any;
  cookiesbox:boolean =false;
  data:any;
  scrolled: boolean = false;
  cookie:any;
  env=environment;
  contactData:any;
  timeData:any;
  linkUrl:any;
  socialLinks:any;

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @HostListener("window:scroll", [])
  onWindowScroll() {
      this.scrolled = window.scrollY > 150;
  }


  constructor(private router:Router, private dialog: MatDialog,private dialogRef: MatDialogRef<any>,public activeClass: ActiveClassService,
    private userService :UserserviceService) {    this.getcontact(); this.gettimezone(); this.getSociallinks();
      this.getUrl(); }


  ngOnInit(): void {
            this.Check();
            this.getcontact();
            this.gettimezone();
  }

  getcontact(){
    this.userService.getcontact().subscribe(resp => {
      console.log(resp,"testing");
      this.contactData=resp;
    },
    (err) => {
      console.error(err);
    })

  }


  gettimezone(){
    this.userService.gettimezone().subscribe(resp => {
    this.timeData=resp;
    console.log(resp,"testing");
  },
  (err) => {
    console.error(err);
  })
}


  impressum() {
    this.data= { name: 'impressum' };
    let dialogRef= this.dialog.open(this.callAPIDialog, { });
    dialogRef.afterClosed().subscribe(result => { });
  }

  date() {
    this.data= { name: 'date' };
    let dialogRef= this.dialog.open(this.callAPIDialog, { });
    dialogRef.afterClosed().subscribe(result => { });
  }

  scrollTo(headerName: string) {
    document.getElementById(headerName)?.scrollIntoView();
    this.active=headerName;
    console.log(this.active);
  }

  activeValue(headerName: string){
    this.active="resActive";
    document.getElementById(headerName)?.scrollIntoView();
    this.active=headerName;

  }

  reservation() {
    this.router.navigate(['/reservierung']);
  }

  datenschutz(){
    this.router.navigate(['/datenschutz']);
  }

  impre(){
    this.router.navigate(['/impressum']);
  }

  scrollTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


  Check(){
      const checking = this.cookie.check('data');
      console.log(checking);
      
      if(checking){
       this.cookiesbox = false;
      }
      else{
       this.cookiesbox = true;
      }
       }
     Allow(){
        this.cookie.set('data','codetodo',{expires:1})
        this.cookiesbox =false;
        this.dialog.closeAll();
     }

     Decline(){
       this.cookiesbox =false;
       this.dialog.closeAll();
     }
     Delete(){
       this.cookie.delete('data');
     }

     getUrl(){
      this.userService.getUrl().subscribe(resp => {
        console.log(resp,"testing **");
        this.linkUrl=resp;
      },
      (err) => {
        console.error(err);
      })
    }
    getSociallinks(){
      this.userService.getSociallinks().subscribe(resp => {
        console.log(resp,"testing **");
        this.socialLinks=resp;
      },
      (err) => {
        console.error(err);
      })
    }


}
