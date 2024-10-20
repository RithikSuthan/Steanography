import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../Constants/Endpoint';
@Injectable({
  providedIn: 'root'
})
export class SteanographyService {

  url:any;
  constructor(private http:HttpClient) {
    this.url=environment.steanography_service_url;
   }

  generateOTP(postObj:any)
  {
      const url=this.url+EndPoints.sendOTP;
      return this.http.post<any>(url,postObj);
  }
  verifyOTP(postObj:any)
  {
      const url=this.url+EndPoints.verifyOTP;
      return this.http.post<any>(url,postObj);
  }
  registerUser(postObj:any)
  {
    const url=this.url+EndPoints.register;
    return this.http.post<any>(url,postObj);
  }
}
