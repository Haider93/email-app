import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from  './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gizmodo Email';
  userEmail: string;
  signOutOption: boolean = true;
  constructor(private  apiService:  ApiService, public router: Router){
    
    //this.router.navigate(['side_panel']);
     var app_session = JSON.parse(localStorage.getItem("email-app-session"));
     if(app_session != null)
     {
       var keys = [];
      for(var k in app_session) keys.push(k);
      var val = app_session[k];
      this.userEmail = val;
      this.signOutOption = true;
      this.router.navigate(['side_panel/inbox']);
      //alert(this.userEmail+this.signOutOption);
     }
     else{
      this.router.navigate(['sign_up']);
     }
     this.apiService._userEmail.subscribe(value => {
      this.userEmail = value;
      });
    this.apiService._signOutOption.subscribe(value => {
      this.signOutOption = value;
      });
     
    
  }
  ngOnInit(){
    var app_session = JSON.parse(localStorage.getItem("email-app-session"));
     if(app_session != null)
     {
       var keys = [];
      for(var k in app_session) keys.push(k);
      var val = app_session[k];
      this.userEmail = val;
      this.signOutOption = true;
      this.router.navigate(['side_panel/inbox']);
      //alert(this.userEmail+this.signOutOption);
     }
  }

  signOut(){
    localStorage.clear();
    this.apiService._signOutOption.next(false);
    this.apiService._userEmail.next("");
    this.router.navigate(['sign_in']);
  }
}
