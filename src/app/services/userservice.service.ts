import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  public lat:any;
  public lng:any;

  constructor(private http:HttpClient) { }


  reservation(postData:any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/sendReservationMail/" + environment.restaurantId,postData);
  }


  getLogo(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/logo/" + environment.restaurantId);
  }
  getbanner(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/bannerData/" + environment.restaurantId);
  }

  aboutSection(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/about-usData/" + environment.restaurantId);
  }
  gettestinomial(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getTestimonial/" + environment.restaurantId);
  }
  getgallery(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getImageData/" + environment.restaurantId);
  }

  getFooter(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getFooterImage/" + environment.restaurantId);
  }
  getcontact(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getFooterDetails/" + environment.restaurantId);
  }
  getLocation(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getLocation/" + environment.restaurantId);
  }
    gettimezone(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getFooterContent/" + environment.restaurantId);
  }

  getImpressum(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getPrivacy/" + environment.restaurantId);
  }
  getDaten(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getImprint/" + environment.restaurantId);
  }

  getUrl(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getUrl/" + environment.restaurantId);
  }

  getMenu(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getMenuImageData/" + environment.restaurantId);
  }
  getSociallinks(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getLink/" + environment.restaurantId);
  }
  getReservation(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getRestuarentDetails/" + environment.restaurantId);
  }
  getPricingImage(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getPricingImage/" + environment.restaurantId);
  }
  getCategory(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getCategory/" + environment.restaurantId);
  }

  getItems(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl  + "/getItemAndPrice/" + environment.restaurantId);
  }
  getPdf(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getPdf/" + environment.restaurantId);
  }
  getCategoryMenu(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getMenuItemAndPrice/" + environment.restaurantId);
  }

  getpdfcard(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/restuarantDetails/" + environment.restaurantId);
  }

  getTimezone(): Observable<any>{
    return this.http.get(environment.apiBaseUrl + "/getTiming/" + environment.restaurantId);
  }
}















