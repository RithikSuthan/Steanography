import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoints } from '../Constants/Endpoint';
import { Observable } from 'rxjs';

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
  loginUser(postObj:any)
  {
    const url=this.url+EndPoints.login;
    return this.http.post<any>(url,postObj);
  }
  uploadPhoto(email: string, photoName: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('photo_name', photoName);
    formData.append('file', file);

    return this.http.post(`${this.url}/upload`, formData);
  }

  getPhoto(email: string, photoName: string): Observable<any> {
    return this.http.get(`${this.url}/get_photo?email=${email}&photo_name=${photoName}`, {
      responseType: 'blob' // to get binary data
    });
  }

  deletePhoto(email: string, photoName: string): Observable<any> {
    return this.http.post(`${this.url}/delete`, { email, photo_name: photoName });
  }
}

