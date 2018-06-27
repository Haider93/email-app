import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL  =  'http://localhost:3000';
  constructor(private  httpClient:  HttpClient) { }

  signUp(email: string, password: string){
    localStorage.setItem("email-app-session",JSON.stringify({"email": email}));
    return  this.httpClient.get(`${this.API_URL}/sign_up/`+email+'/'+password);
}
}
