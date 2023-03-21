import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as $ from 'jquery';
import { ViewChild,TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {inject} from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';


@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component implements OnInit {
    cookiesbox:boolean =false;
    data:any;




    @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
    constructor(private router: Router,private dialog: MatDialog,private cookie:CookieService)
    {  }


    ngOnInit(): void {


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
  //  Tableform()
  //  {
  //    this.dialog.open(DialogComponent, {
  //      data: {name : 'tableform'},

  //    });
  //  }


    impressum() {
      this.data= { name: 'impressum' };
      let dialogRef= this.dialog.open(this.callAPIDialog, {  disableClose: true });

    }
    cancel(){
      this.dialog.closeAll();
    }



  }

