import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';
import { HashLocationStrategy } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { SwiperModule } from 'swiper/angular';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SpeisekarteComponent } from './speisekarte/speisekarte.component';
import { ReservierungComponent } from './reservierung/reservierung.component';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { Dialog2Component } from './dialog2/dialog2.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    DialogComponent,
    ImpressumComponent,
    DatenschutzComponent,
    ReservierungComponent,
    Dialog2Component,
    SpeisekarteComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SwiperModule,
    MatMomentDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxHideOnScrollModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    PdfViewerModule

  ],
  providers:


  [CookieService, {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    { provide: LOCALE_ID, useValue: 'de-DE'},

],


  bootstrap: [AppComponent]
})
export class AppModule { }
