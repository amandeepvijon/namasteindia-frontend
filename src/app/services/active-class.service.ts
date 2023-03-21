import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveClassService {

  active: string

  constructor() { }

  setActiveClass(header: string) {
    this.active = header;
  }
}
