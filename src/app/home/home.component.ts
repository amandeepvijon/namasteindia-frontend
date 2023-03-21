import { Component, OnInit, Sanitizer } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as $ from 'jquery';
import { ViewChild,TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {inject} from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { environment } from 'src/environments/environment';
import { UserserviceService } from '../services/userservice.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  cookiesbox:boolean =false;
  data:any;
  imageUrl:any;
  bannerList:any;
  getdata:any;
  item:any;
  testinomialdata:any;
  url:any;
  image:any;
  aboutsection:any;
  galleryImg:any;
  env = environment;
  galleryData:any;
  footerImg:any;
  setSelectedImage: string;
  locationData:any;
  slideCurrIndex: number = -1;
  slideIndex: number = 0;
  lat:number;
  long:number;
  linkUrl:any;
  menuImg:any;
  ImgData:any;
  categoryData:any;
  ItemsData:any;
  MenuData:any;

  breakPoints: any = {
    0: {
      slidesPerView: 1
    },
    320: {
      slidesPerView: 1
    },
    768: {
      spaceBetween: 2
    },
    991: {
      spaceBetween: 3
    }

  }


  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  constructor(private router: Router,private dialog: MatDialog, private sanitizer: DomSanitizer,
    private cookie:CookieService,private userservice:UserserviceService)
  {    this.getLocation();
       this.getUrl();
       this.getMenu();
       this.getItems();
       this.getCategory();
  }


  ngOnInit(): void {

    this.Check();
    if(!this.cookie.get('data')){
    setTimeout(() => {  },1000);
    }
    this.getbanner();
    this.aboutSection();
    this.gettestimonial();
    this.getgallery();
    this.getFooter();
    this.getLocation();
    this.getUrl();
    this.getPricingImage();
  }

  getbanner(){
    this.userservice.getbanner().subscribe(resp => {
      console.log(resp);
      this.url=resp.banners;
    },
    (err) => {
      console.error(err);
    })
  }

  getgallery(){
    this.userservice.getgallery().subscribe(resp => {
      console.log(resp,"testing");
       this.galleryData=resp.data.gallery;
    },
    (err) => {
      console.error(err);
    })
  }

  getLocation(){
    this.userservice.getLocation().subscribe(resp => {
      console.log(resp,"testing");
     this.locationData= this.sanitizer.bypassSecurityTrustResourceUrl(resp.data);
    },
    (err) => {
      console.error(err);
    })
  }

  getPricingImage(){
    this.userservice.getPricingImage().subscribe(resp => {
      console.log(resp,"testingpricingImg");
      this.ImgData=resp;
    },
    (err) => {
      console.error(err);
    })
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
 changeSlide(n: number) {
  this.slideIndex += n;
}

getCategory(){
  this.userservice.getCategory().subscribe(resp => {
    console.log(resp,"testingmenucategory");
    this.categoryData=resp;
  },
  (err) => {
    console.error(err);
  })
}

getItems(){
  this.userservice.getItems().subscribe(resp => {
    console.log(resp,"testingmenuimages");
    this.ItemsData=resp.data;
  },
  (err) => {
    console.error(err);
  })
}


aboutSection(){
  this.userservice.aboutSection().subscribe(resp => {
   console.log(resp);
    this.aboutsection=resp;
},
(err) => {
  console.error(err);
})
}


gettestimonial(){
  this.userservice.gettestinomial().subscribe(resp => {
   console.log(resp);
    this.getdata=resp.data;
},
(err) => {
  console.error(err);
})
}

getFooter(){
  this.userservice.getFooter().subscribe(resp => {
    console.log(resp,"testing");
    this.footerImg=resp;
  },
  (err) => {
    console.error(err);
  })
}


  openModal(filename: string, index: number)
  {
    document.getElementById("myModal")?.setAttribute("style", "display: block;");
    this.setSelectedImage = filename;
    this.slideCurrIndex = index;
  }

  closeModal()
  {
    document.getElementById("myModal")?.setAttribute("style", "display: none;");
  }

  nextSlide(direction: number)
  {
    if(direction == 1)
    {
      if(this.slideCurrIndex < this.galleryData.length - 1) {
        this.setSelectedImage = this.galleryData[++this.slideCurrIndex].filename
      }
    }
    else if(direction == -1) {
      if(this.slideCurrIndex > 0) {
        this.setSelectedImage = this.galleryData[--this.slideCurrIndex].filename
      }
    }
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

  getMenu(){
    this.userservice.getMenu().subscribe(resp => {
      console.log(resp,"menuimg");
      this.MenuData=resp.data;
    },
    (err) => {
      console.error(err);
    })
  }
}




