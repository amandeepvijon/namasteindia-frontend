import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogComponent } from './dialog/dialog.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ReservierungComponent } from './reservierung/reservierung.component';
import { SpeisekarteComponent } from './speisekarte/speisekarte.component';
import { Dialog2Component } from './dialog2/dialog2.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {path:'dialog',component:DialogComponent},
  {path:'impressum',component:ImpressumComponent},
  {path:'datenschutz',component:DatenschutzComponent},
  {path:'reservierung',component:ReservierungComponent},
  {path:'dialog2',component:Dialog2Component},
  {path:'speisekarte',component:SpeisekarteComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
