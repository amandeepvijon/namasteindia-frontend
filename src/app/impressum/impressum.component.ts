import { Component, Inject,OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OnDestroy, Renderer2 } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit {
  data:any;


  constructor(@Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2,private userService :UserserviceService) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'impresssum-body');
    this.getImpressum();
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'impresssum-body');
  }

  getImpressum(){
    this.userService.getImpressum().subscribe(resp => {
    this.data=resp.privacy;
    console.log(resp,"testing");
  },
  (err) => {
    console.error(err);
  })
}

  // getDaten(){
  //   this.adminService.getDaten().subscribe(resp => {
  //   this.data=resp;
  //   this.dateForm.patchValue({
  //     privacy : this.data.privacy
  //       });
  //   console.log(resp,"hjhk");
  // },
  // (err) => {
  //   console.error(err);
  // })
}


