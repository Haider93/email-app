import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Email App';
  userEmail: string;
  constructor(public router: Router){
    this.router.navigate(['sign_up']);
     var app_session = JSON.parse(localStorage.getItem("email-app-session"));
     if(app_session != null)
     {
       var keys = [];
      for(var k in app_session) keys.push(k);
      var val = app_session[k];
      this.userEmail = val;
     }
    
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['sign_in']);
  }
}
