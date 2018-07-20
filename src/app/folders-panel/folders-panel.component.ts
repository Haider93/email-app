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
  unreadEmails: number = 0;
  inboxTabActive: boolean = true;
  sentTabActive: boolean = false;
  deletedTabActive: boolean = false;

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
      this.emails = data;
    }); 
    this.apiService.count_unread_emails(this.loggedInEmail,'unread').subscribe((data: any) => {
      this.unreadEmails = data[0].count;
    });
  }

  
  inbox(){
    this.inboxTabActive = true;
    this.sentTabActive = false;
    this.deletedTabActive = false;
    this.router.navigate(['/side_panel/inbox']);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
      this.emails = data;
      console.log("emails before deletion in inbox--",this.emails);
    });
    this.apiService.count_unread_emails(this.loggedInEmail,'unread').subscribe((data: any) => {
      this.unreadEmails = data[0].count;
    });
    
  }

  getEmailDetail(id,sender,receiver,subject,body){
    this.apiService.count_unread_emails(this.loggedInEmail,'unread').subscribe((data: any) => {
      if(data[0].count>0)
        this.unreadEmails = data[0].count-1;
    });
    this.apiService.update_read_status('read',id).subscribe((data: any) => {
    });
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
    this.inboxTabActive = false;
    this.sentTabActive = true;
    this.deletedTabActive = false;
    this.router.navigate(['/side_panel/sent']);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    this.apiService.sent(this.loggedInEmail).subscribe((data: any) => {
      this.emails = data;
    });
  }

  deleted(){
    this.inboxTabActive = false;
    this.sentTabActive = false;
    this.deletedTabActive = true;
    this.router.navigate(['/side_panel/deleted']);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    this.apiService.deletedMails(this.loggedInEmail).subscribe((data: any) => {
      this.emails = data;
    });
  }

  deleteAll(){
    alert("All will be deleted!!");
  }
  composeEmail(receiver,subject,body){
    var t = new Date();
    var date = t.toLocaleDateString('en-US');
    date = this.convertDate(date);
    var time = t.toLocaleString('en-US',{hour: 'numeric', minute: 'numeric', second:'numeric', hour12: false});
    var read_status = 'unread';
    this.apiService.reply(this.loggedInEmail,receiver,subject,body,date,time,read_status).subscribe((data: any) => {
      console.log("Email data---",data);
      if(data.length==0)
        alert("message sent");
      else
        alert("error occurred");
    });

  }
  convertDate(stringdate)
{
    stringdate = stringdate.replace(/\//g, "-");
    return stringdate;
}
  back(){
    this.router.navigate([this.prevUrl]);
    this.replyButton = false;
    this.deleteButton = false;
    this.showHideEmailDetail = false;
    this.showHideEmailList = true;
    this.backButton = false;
    if(this.inboxTabActive == true)
    {
      this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
        this.emails = data;
        console.log("emails before deletion in inbox--",this.emails);
      });
    }
    else if(this.sentTabActive == true)
    {
      this.apiService.sent(this.loggedInEmail).subscribe((data: any) => {
        this.emails = data;
      });
    }
    else if(this.deletedTabActive == true){
      this.apiService.deletedMails(this.loggedInEmail).subscribe((data: any) => {
        this.emails = data;
      });
    }
    else{
      this.apiService.inbox(this.loggedInEmail).subscribe((data: any) => {
        this.emails = data;
        console.log("emails before deletion in inbox--",this.emails);
      });
    }
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
    alert("Are you sure?");
    
    this.apiService.delete(id).subscribe((data: any) => {
      // if(data.length == 0)
      //   alert("Email Deleted");
    });

    this.apiService.insert_into_deleted(id,sender,receiver,subject,body,date,time,this.loggedInEmail).subscribe((data: any) => {
      if(data.length == 0)
        alert("Email Deleted");
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
