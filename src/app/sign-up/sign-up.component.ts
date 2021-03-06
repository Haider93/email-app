import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  

  constructor(private  apiService:  ApiService, public router: Router) { }

  ngOnInit() {
    var app_session = JSON.parse(localStorage.getItem("email-app-session"));
    var keys = [];
    if(app_session != null)
    {
      // for(var k in app_session) keys.push(k);
      // var val = app_session[k];
      this.router.navigate(['/side_panel/inbox']);
    }
  }
  signUpToken: any;

  submitForm(email,password,confirmPassword){
    console.log("sign up backend--",email.value);
    var emailTest = this.validateEmail(email.value);
    if(password.value != confirmPassword.value || (!emailTest))
    {
      alert("Password doen't get matched or email doesn't contain @");
    }
    else{
      this.apiService.signUp(email.value,password.value).subscribe((data:  string) => {
        this.signUpToken  =  data;
      });
      this.apiService._signOutOption.next(true);
      this.apiService._userEmail.next(email.value);
      this.router.navigate(['/side_panel/inbox']);
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
