import { Component, OnInit } from '@angular/core';
import {Email} from '../models/email';
import { ApiService } from  '../api.service';
import {DataServiceService} from '../data-service.service';
import { Router } from '@angular/router';
import { EmailDetailComponent } from '../email-detail/email-detail.component';

@Component({
  selector: 'app-folders-panel',
  templateUrl: './folders-panel.component.html',
  styleUrls: ['./folders-panel.component.css']
})
export class FoldersPanelComponent implements OnInit {

  loggedInEmail: string;
  emails: Email[];
  public emailDetail: Email;
  showHideEmailDetail: boolean = false;
  showHideEmailList: boolean = true;

  constructor(private  apiService:  ApiService, public dataService: DataServiceService, public router: Router) { 
    var app_session = JSON.parse(localStorage.getItem("email-app-session"));
    var keys = [];
    for(var k in app_session) keys.push(k);
     var val = app_session[keys[0]];
    this.loggedInEmail = val;
  }

  ngOnInit() {
    //this.emails = EMAILS;
    this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
      console.log("signed In---",data.result.rows);
      this.emails = data.result.rows;
    });
  }

  
  inbox(){
    this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
      console.log("signed In---",data.result.rows);
      this.emails = data.result.rows;
    });
  }

  getEmailDetail(sender,receiver,subject,body){
    this.showHideEmailDetail = true;
    this.showHideEmailList = false;
    this.emailDetail = new Email(sender,receiver,subject,body);
    this.dataService.setEmailDetail(this.emailDetail);
    //this.router.navigate(['/email_detail']);
  }

  
  sent(){
    this.apiService.sent(this.loggedInEmail).subscribe((data: any) => {
      console.log("signed In---",data.result.rows);
      this.emails = data.result.rows;
    });
  }

  deleted(){
    alert("delete called")
  }
  composeEmail(receiver,subject,body){
    var date = '23-may-2018';
    var time = '11:00';
    console.log('email subject---------------', subject);
    this.apiService.reply(this.loggedInEmail,receiver,subject,body,date,time).subscribe((data: any) => {
      console.log("signed In---",data.result.rows);
    });
  }
}
