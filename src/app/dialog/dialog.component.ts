import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AbstractControl, FormArray, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  thank:boolean;
  data:any;
  myDate = new Date();
  todayDate:any;
  time:any;
  currentDate:any;
  currentTime:any;
  booktableForm=new FormGroup({
    "name": new FormControl(null, [Validators.required]),
      "totalPerson": new FormControl(null, [Validators.required]),
      "dateOfResv": new FormControl(null, [Validators.required]),
      "timeOfResv": new FormControl(null, [Validators.required]),
      "phoneNumber": new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "notes": new FormControl(null)
  })

  get f(){return this.booktableForm.controls}

  constructor(private router: Router,private userserviceService:UserserviceService,private dialog: MatDialog,private dialogRef: MatDialogRef<any>
    )
   { this.currentDate= formatDate(new Date(), 'yyyy-MM-dd', 'en');
     this.time= formatDate(new Date(), 'HH:mm', 'en')}

  ngOnInit(): void {

  }

  onClickSubmit(){

 console.log(this.booktableForm.value);
 console.log(this.time);
  let selectedDate=this.booktableForm.controls['dateOfResv'].value;
   let selectime=this.booktableForm.controls['timeOfResv'].value;
   if(selectedDate >= this.currentDate && selectime >= this.time){
      this.userserviceService.reservation(this.booktableForm.value).subscribe((resp)=>{
      if(resp.success){
        this.thank= true;
      console.log(resp);
      setTimeout(() => { window.location.reload();}, 8000);
      }

      },
      (err) => {
      });
   }
   else{
       console.log('failed');
   }

  }

  navToHome()
  {
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
  }





