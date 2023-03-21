import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AbstractControl, FormArray, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import {formatDate, Location} from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {
  MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import {Inject} from '@angular/core';
import * as moment from 'moment-timezone';
import { Console, time, timeStamp } from 'console';
import { DOCUMENT } from '@angular/common';
import { OnDestroy, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reservierung',
  templateUrl: './reservierung.component.html',
  styleUrls: ['./reservierung.component.scss']
})
export class ReservierungComponent implements OnInit {

  thank:boolean;
  minDate: Date;
  maxDate: Date;
  showspinner: boolean;
  myDate = new Date();
  todayDate:any;
  currDay:any;
  timeMessage:any;
  selectedtDate: any;
  currentDate:any;
  currentTime:any;
  submitted :any;
  settime:any;
  selectedTime: any;
  minTime: string = "00:00";
  maxTime: string = "23:59";
  nextLibAvailable: boolean ;
  currTime:moment.Moment;
  arrayData:any;
  i:any;
  timearray:any[] =[];
  linkUrl:any;
  reservationData:any;
  locationData:any;
  timeData : any;

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

  constructor(private router: Router,private userserviceService:UserserviceService, private _adapter: DateAdapter<any>, private sanitizer: DomSanitizer,
    private dialog: MatDialog,private dialogRef: MatDialogRef<any>, private location: Location, @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,private userService :UserserviceService)
  {   const currentDate = new Date();
      this.minDate = new Date(currentDate.getFullYear() , currentDate.getMonth(), currentDate.getDate());
      this.currTime = moment().tz('Europe/Berlin');
      this.arrayData=[];

  }

 ngOnInit(): void {
  this.booktableForm.controls['timeOfResv'].disable();
  this.timeMessage=null;
  this.renderer.addClass(this.document.body, 'reservierung-body');
  this.getReservation();
  this.getLocation();
  this.getTimezone();
 }
 ngOnDestroy(): void {
  this.renderer.removeClass(this.document.body, 'reservierung-body');
}




getLocation(){
  this.userService.getLocation().subscribe(resp => {
    console.log(resp,"testing");
   this.locationData= this.sanitizer.bypassSecurityTrustResourceUrl(resp.data);
  },
  (err) => {
    console.error(err);
  })
}

getTimezone(){
  this.userService.getTimezone().subscribe(resp => {
    console.log(resp,"testing");
    this.timeData=resp.data;
  },
  (err) => {
    console.error(err.message);
  })
}

// addEvent(event: any){
//   const selectedDay: moment.Moment = event.value;
//   this.booktableForm.controls['timeOfResv'].reset();
//   this.arrayData=[];
//   this.selectedtDate = selectedDay.day();
//   console.log(this.selectedtDate , "testing");
//   this.timeMessage = ''
//   this.getTimezone()
//   this.timeData.forEach((value: any, index: string | number) => {
//         var days = value;
//           days.days.forEach((e: any, index: any) => {
//             if(e === "Sunday"){ days.days[index] = 0; }
//             else if(e === "Monday"){ days.days[index] = 1; }
//             else if(e === "Tuesday"){ days.days[index] = 2; }
//             else if(e === "Wednesday"){ days.days[index] = 3;}
//             else if(e === "Thursday"){ days.days[index] = 4;}
//             else if(e === "Friday"){ days.days[index] = 5;}
//             else{ days.days[index] = 6;}
//           });
//   });
//   this.timeData.forEach((element: any) => {
//        let maxDay = element.days.reduce((a: number, b: number) => Math.max(a, b));
//        let minDayDay = element.days.reduce((a: number, b: number) => Math.min(a, b));
//       //  console.log(element.closeTime);

//        if(this.selectedtDate >= minDayDay && this.selectedtDate <= maxDay)
//        {
//          for( this.i= 0; this.i <= 690; this.i+=30)
//          {
//            let time =moment(element.openTime, 'HH:mm').add(this.i , 'minutes');

//            if(this.isBetween(time, moment(element.openTime, "HH:mm"), moment(element.closeTime, "HH:mm"))) {
//                this.timearray.push(time.format("HH:mm"));
//                this.arrayData.push(time.format("HH:mm"));
//              }
//          }
//          console.log(this.timearray);
//          this.booktableForm.controls['timeOfResv'].enable();
//        }
//        else{
//          this.minTime = "00:00";
//          this.maxTime = "00:00";
//          this.timeMessage="Tuesday geschlossen";
//          this.booktableForm.controls['timeOfResv'].disable();
//        }

//   });


//   // if(this.selectedtDate >= 0 && this.selectedtDate <= 6)
//   // {
//   //   for( this.i= 0; this.i <= 690; this.i+=30)
//   //   {
//   //     let time =moment("11:30", 'HH:mm').add(this.i , 'minutes');

//   //     if(this.isBetween(time, moment("11:30", "HH:mm"), moment("15:00", "HH:mm")) ||
//   //       this.isBetween(time, moment("17:30", "HH:mm"), moment("23:30", "HH:mm"))) {
//   //         this.timearray.push(time.format("HH:mm"));
//   //         this.arrayData.push(time.format("HH:mm"));
//   //       }
//   //   }
//   //   console.log(this.timearray);
//   //   this.booktableForm.controls['timeOfResv'].enable();
//   // }
//   // else{
//   //   this.minTime = "00:00";
//   //   this.maxTime = "00:00";
//   //   this.timeMessage="Tuesday geschlossen";
//   //   this.booktableForm.controls['timeOfResv'].disable();
//   // }
// }

addEvent(event: any){
  const selectedDay: moment.Moment = event.value;
  this.booktableForm.controls['timeOfResv'].reset();
  this.arrayData=[];
  this.selectedtDate = selectedDay.day();
  console.log(this.selectedtDate , "testing");
  this.timeMessage = ''
  this.getTimezone()
  this.timeData.forEach((value: any, index: string | number) => {
        var days = value;
          days.days.forEach((e: any, index: any) => {
            if(e === "Sunday"){ days.days[index] = 0; }
            else if(e === "Monday"){ days.days[index] = 1; }
            else if(e === "Tuesday"){ days.days[index] = 2; }
            else if(e === "Wednesday"){ days.days[index] = 3;}
            else if(e === "Thursday"){ days.days[index] = 4;}
            else if(e === "Friday"){ days.days[index] = 5;}
            else{ days.days[index] = 6;}
          });
  });
  //  console.log(this.timeData,"apitesti");

  this.timeData.forEach((element: any) => {
       let maxDay = element.days.reduce((a: number, b: number) => Math.max(a, b));
       let minDayDay = element.days.reduce((a: number, b: number) => Math.min(a, b));
      //  console.log(element,'testing');
       let getDay = element.days.some((x: number) => x === this.selectedtDate);
       if(getDay)
       {
         for( this.i= 0; this.i <= 690; this.i+=30)
         {
           let time =moment(element.openTime, 'HH:mm').add(this.i , 'minutes');

           if(this.isBetween(time, moment(element.openTime, "HH:mm"), moment(element.closeTime, "HH:mm"))) {
               this.timearray.push(time.format("HH:mm"));
               this.arrayData.push(time.format("HH:mm"));
             }
         }
         console.log(this.timearray);
         this.booktableForm.controls['timeOfResv'].enable();
         return ;
       }
       else{
         this.minTime = "00:00";
         this.maxTime = "00:00";
        //  this.timeMessage="Tuesday geschlossen";
        //  this.booktableForm.controls['timeOfResv'].disable();
       }

  });


  // if(this.selectedtDate >= 0 && this.selectedtDate <= 6)
  // {
  //   for( this.i= 0; this.i <= 690; this.i+=30)
  //   {
  //     let time =moment("11:30", 'HH:mm').add(this.i , 'minutes');

  //     if(this.isBetween(time, moment("11:30", "HH:mm"), moment("15:00", "HH:mm")) ||
  //       this.isBetween(time, moment("17:30", "HH:mm"), moment("23:30", "HH:mm"))) {
  //         this.timearray.push(time.format("HH:mm"));
  //         this.arrayData.push(time.format("HH:mm"));
  //       }
  //   }
  //   console.log(this.timearray);
  //   this.booktableForm.controls['timeOfResv'].enable();
  // }
  // else{
  //   this.minTime = "00:00";
  //   this.maxTime = "00:00";
  //   this.timeMessage="Tuesday geschlossen";
  //   this.booktableForm.controls['timeOfResv'].disable();
  // }
}


 onClickSubmit(){

  console.log(this.booktableForm.value);
   const postData = this.booktableForm.value;
   let selectedDate=this.booktableForm.controls['dateOfResv'].value;
   let selectime=this.booktableForm.controls['timeOfResv'].value;
   postData.dateOfResv = moment(postData.dateOfResv).format("yyyy-MM-DD");

  console.log(postData);
  this.showspinner=true;
  if(this.booktableForm.controls['totalPerson'].value >=1 && this.booktableForm.valid){

     this.userserviceService.reservation(postData).subscribe((resp)=>{
      if(resp.success){
        console.log(resp);
        this.dialog.open(DialogComponent,{
          data: {name : 'tableform'},
          disableClose: true
        })
        this.showspinner=false;
     setTimeout(() => { this.location.back();}, 5000);
     }
     },
     (err) => {
      this.showspinner=false;
     });
  }
  else{
      alert('Booking Failed');
  }
 }

 isBetween(currTime: moment.Moment, openTime: moment.Moment, closeTime: moment.Moment): boolean
 {
    let openT = new Date(0,0,0, openTime.hours(), openTime.minutes()),
        closeT = new Date(0,0,0, closeTime.hours(), closeTime.minutes()),
        currT = new Date(0,0,0, currTime.hours(), currTime.minutes());

    if(openT.getTime() <= currT.getTime() && currT.getTime() <= closeT.getTime()) {
      return true;
    }
    else {
      return false;
    }
 }

 getReservation(){
  this.userService.getReservation().subscribe(resp => {
    console.log(resp,"testingreservation **");
    this.reservationData=resp;
    // this.reservationData= this.sanitizer.bypassSecurityTrustResourceUrl(resp);
  },
  (err) => {
    console.error(err);
  })
}
}




