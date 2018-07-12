import { Component, OnInit } from '@angular/core';
import {Email} from '../models/email';
import { ApiService } from  '../api.service';
import {DataServiceService} from '../data-service.service';
import { Router } from '@angular/router';
import { EmailDetailComponent } from '../email-detail/email-detail.component';
import {ActivatedRoute} from "@angular/router";

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
  backButton: boolean = false;
  replyButton: boolean = false;
  deleteButton: boolean = false;
  prevUrl: string;

  constructor(private route: ActivatedRoute,private  apiService:  ApiService, public dataService: DataServiceService, public router: Router) { 
    var app_session = JSON.parse(localStorage.getItem("email-app-session"));
    var keys = [];
    for(var k in app_session) keys.push(k);
     var val = app_session[keys[0]];
    this.loggedInEmail = val;
    this.route.params.subscribe( params => console.log("Email details route ",params) );
  }

  ngOnInit() {
    //this.emails = EMAILS;
    //this.router.navigate(['side_panel/inbox']);
    this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
      //console.log("signed In---",data.result.rowCount);
      //this.emails = data;
      this.emails = data.result.rows;
    });
  }

  
  inbox(){
    this.router.navigate(['/side_panel/inbox']);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
      this.emails = data.result.rows;
      console.log("emails before deletion in inbox--",this.emails);
    });
    
  }

  getEmailDetail(id,sender,receiver,subject,body){
    this.replyButton = true;
    this.deleteButton = true;
    this.showHideEmailDetail = true;
    this.showHideEmailList = false;
    this.backButton = true;
    this.emailDetail = new Email(sender,receiver,subject,body);
    this.dataService.setEmailDetail(this.emailDetail);
    this.prevUrl = this.router.url;
    this.router.navigate([this.router.url+'/email_detail/', id]);
  }

  
  sent(){
    this.router.navigate(['/side_panel/sent']);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    this.apiService.sent(this.loggedInEmail).subscribe((data: any) => {
      console.log("signed In---",data.result.rows);
      this.emails = data.result.rows;
    });
  }

  deleted(){
    this.router.navigate(['/side_panel/deleted']);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    this.apiService.deletedMails(this.loggedInEmail).subscribe((data: any) => {
      console.log("deleted mails---",data.result.rows);
      this.emails = data.result.rows;
    });
  }
  composeEmail(receiver,subject,body){
    var date = '23-may-2018';
    var time = '11:00';
    console.log('email subject---------------', subject);
    this.apiService.reply(this.loggedInEmail,receiver,subject,body,date,time).subscribe((data: any) => {
      console.log("signed In---",data.result.rows);
    });
  }
  back(){
    this.router.navigate([this.prevUrl]);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
  }
  removeItem(id: number){
    //remove id index element freom emails array
    var arr = [];
    for(var i=0;i<this.emails.length;i++)
    {
      if(id != this.emails[i].id)
      {
        arr.push(this.emails[i]);
      }
    }
    this.emails = [];
    for(var i=0;i<arr.length;i++)
    {
      this.emails[i]=arr[i];
    }
  }
  delete(id,sender,receiver,subject,body,date,time){
    alert("Are you sure?"+id);
    
    this.apiService.delete(id).subscribe((data: any) => {
      //console.log("signed In---",data);
    });

    this.apiService.insert_into_deleted(id,sender,receiver,subject,body,date,time,this.loggedInEmail).subscribe((data: any) => {
      console.log("insert into delted called---",data);
    });
    for(var i=0;i<this.emails.length;i++)
    {
      if(this.emails[i].id == id)
      {
        this.removeItem(id);
        return;
      }
    }
  }
}
