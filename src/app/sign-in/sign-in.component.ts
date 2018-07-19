import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

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


  signIn(email,password){
    if(!this.validateEmail(email.value)){
      alert("Email doesn't contain @ symbol");
    }
    else{
      this.apiService.signIn(email.value,password.value).subscribe((data: any) => {
        console.log("signed In---",data);
        //debugger;
        if(email.value == data.email && password.value == data.password){
          this.router.navigate(['/side_panel/inbox']);
        this.apiService._signOutOption.next(true);
        this.apiService._userEmail.next(email.value);
        }
        else{
          alert("Wrong credentials");
        }
      });
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
