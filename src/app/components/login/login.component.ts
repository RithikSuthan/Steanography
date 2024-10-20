import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteanographyService } from 'src/app/services/steanography.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service:SteanographyService,private router:Router) { }
  postObj={
    email:"",
    password:""
  }
  ngOnInit(): void {
  }
  loginUser()
  {
    this.service.loginUser(this.postObj).subscribe(
      (response) => {
        console.log(response);
        alert(response['message']);
        localStorage.setItem('email',this.postObj.email);
        this.router.navigateByUrl("/home");
      },
      (error) => {
        console.error(error);
        alert(error['message']);
      }
    );
  }
}
