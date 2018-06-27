import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpToken: any;

  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
  }

  submitForm(email,password,confirmPassword){
    console.log("sign up backend--",email.value);
    if(password.value != confirmPassword.value)
    {
      console.log("Password doen't get matched");
    }
    else{
      this.apiService.signUp(email.value,password.value).subscribe((data:  string) => {
        this.signUpToken  =  data;
        alert("return by sign up "+data);
      });
    }
  }

}
