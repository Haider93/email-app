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
    this.apiService.signIn(email.value,password.value).subscribe((data: any) => {
      console.log("signed In---",data);
      this.router.navigate(['/side_panel/inbox']);
      this.apiService._signOutOption.next(true);
      this.apiService._userEmail.next(email.value);
    });
    // var email_id = this.data["email"];
    //   var pwd = this.data["password"];
    //   if(email == email_id && password == pwd)
    //     this.router.navigate(['/side_panel']);
    //   else
    //     alert("wrong credentials");
  }

}
