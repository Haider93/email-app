import { Component, OnInit } from '@angular/core';
import {Email} from '../models/email';
import {EMAILS} from '../models/mock-emails';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-folders-panel',
  templateUrl: './folders-panel.component.html',
  styleUrls: ['./folders-panel.component.css']
})
export class FoldersPanelComponent implements OnInit {

  
  constructor(private  apiService:  ApiService) { 
    var app_session = JSON.parse(localStorage.getItem("email-app-session"));
    var keys = [];
    for(var k in app_session) keys.push(k);
     var val = app_session[keys[0]];
    this.loggedInEmail = val;
  }

  ngOnInit() {
    this.emails = EMAILS;
  }

  loggedInEmail: string;
  emails: Email[]
  inbox(){
    alert("inbox method called");
    // this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
    //   console.log("signed In---",data);
    // });
  }

  sent(){}

  deleted(){}
}
