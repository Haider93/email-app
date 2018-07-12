import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL  =  'http://localhost:3000';
 
  constructor(private  httpClient:  HttpClient) { }

  email: string;
  public _signOutOption: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.email);


  signUp(email: string, password: string){
    localStorage.setItem("email-app-session",JSON.stringify({"email": email}));
    return  this.httpClient.get(`${this.API_URL}/sign_up/`+email+'/'+password);
}
  signIn(email: string, password: string){
    this.email = email;
    localStorage.setItem("email-app-session",JSON.stringify({"email": email}));
    return  this.httpClient.get(`${this.API_URL}/sign_in/`+email+'/'+password);
  } 
  
  inbox(email: string){
    return  this.httpClient.get(`${this.API_URL}/inbox/`+email);
  }
  sent(email: string){
    return  this.httpClient.get(`${this.API_URL}/sent/`+email);
  }
  reply(sender: string, receiver: string,subject: string, body: string,date: string, time: string){
    return  this.httpClient.get(`${this.API_URL}/reply/`+sender+'/'+receiver+'/'+subject+'/'+body+'/'+date+'/'+time);
  }
  delete(id: number){
    return  this.httpClient.get(`${this.API_URL}/delete/`+id);
  }
  insert_into_deleted(id: number,sender: string, receiver: string,subject: string, body: string,date: string, time: string, deleted_by: string){
    return  this.httpClient.get(`${this.API_URL}/insert_to_deleted/`+id+'/'+sender+'/'+receiver+'/'+subject+'/'+body+'/'+date+'/'+time+'/'+deleted_by);
  }
  deletedMails(email: string){
    return  this.httpClient.get(`${this.API_URL}/deleted/`+email);
  }
}
