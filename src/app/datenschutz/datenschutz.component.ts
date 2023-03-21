
import { Component, Inject,OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';


@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss']
})
export class DatenschutzComponent implements OnInit {
  data:any;

  constructor(@Inject(DOCUMENT) private document: Document,private renderer: Renderer2,private router:Router,
  private userservice:UserserviceService) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'datenschutz-body');
    this.getDaten();
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'datenschutz-body');
  }
  datenschutz(){
    this.router.navigate(['/datenschutz']);
  }

  getDaten(){
    this.userservice.getDaten().subscribe(resp => {
    this.data=resp.imprint;
    console.log(resp,"testing");
  },
  (err) => {
    console.error(err);
  })
}


}





