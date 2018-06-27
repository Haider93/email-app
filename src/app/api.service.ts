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
}
