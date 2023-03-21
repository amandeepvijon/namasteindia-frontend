import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActiveClassService } from '../services/active-class.service';
import { UserserviceService } from '../services/userservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  active:any;
  showHeader = true;
  url:any;
  imageUrl:any;
  env = environment;
  linkUrl:any;

  constructor(private router: Router,private dialog: MatDialog, private dialogRef: MatDialogRef<any>, public activeClass: ActiveClassService,private userservice:UserserviceService){
    this.getUrl();
   }

  ngOnInit(): void {
      this.getlogo();
      this.getUrl();
  }

  Tableform()
  {
    this.dialog.open(DialogComponent, {
      data: {name : 'tableform'},

    });
  }
  getlogo(){
    this.userservice.getLogo().subscribe(resp => {
      console.log(resp);
      this.url=resp;
    },
    (err) => {
      console.error(err);
    })
  }

  scrollTo(headerName: string) {
    document.getElementById(headerName)?.scrollIntoView();
    console.log(this.active);
  }


  reservation() {
    window.location.reload();
    this.router.navigate(['/reservierung']);

  }

  activeValue(){
    this.active="resActive";
  }
  scrollTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getUrl(){
    this.userservice.getUrl().subscribe(resp => {
      console.log(resp,"testing **");
      this.linkUrl=resp;
    },
    (err) => {
      console.error(err);
    })
  }
}
