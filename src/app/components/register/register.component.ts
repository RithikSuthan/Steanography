import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteanographyService } from 'src/app/services/steanography.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  otp:any;
  selectedFile: any;
  otpVerified:any;
  constructor(private service:SteanographyService,private router:Router
  ) { }
  postObj={
    name:"",
    email:"",
    friends:[],
    password:""
  }
  ngOnInit(): void {
    this.otpVerified=false;
  }
  generateOTP()
  {
    let obj={
      name:this.postObj.name,
      send_to_email:this.postObj.email
    }
    this.service.generateOTP(obj).subscribe
  (
      (response)=>
      {
        console.log(response);
        alert(response['message']);
        this.otp=response['otp'];
      },
      (error)=>
      {
        console.error(error);
      }
  );
  }
  fileUpload(event: any)
  {
      this.selectedFile=event.target.files[0];
  }
  Verifyotp() {
    const formData: FormData = new FormData();
  
  
    formData.append('file', this.selectedFile);  // The selected file from file input
    formData.append('otp', this.otp);            // The OTP entered by the user
    formData.append('email', this.postObj.email); // The email from the form data
  
    this.service.verifyOTP(formData).subscribe(
      (response) => {
        console.log(response);
        alert(response['message']);
        if(response['message']=="OTP verification successful")
        {
          this.otpVerified=true;
        }
      },
      (error) => {
        console.error(error);
        alert(error['message']);
      }
    );
  }
  registerUser()
  {
    this.service.registerUser(this.postObj).subscribe(
      (response) => {
        console.log(response);
        alert(response['message']);
        this.router.navigateByUrl("/");
      },
      (error) => {
        console.error(error);
        alert(error['message']);
      }
    );
  }
  
}
