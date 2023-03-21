import { Injectable } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Injectable({
  providedIn: 'root'
})
export class NgxwowserviceService {

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
  }


wow(){
  this.wowService.init();
}

}
