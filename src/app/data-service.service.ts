import { Injectable } from '@angular/core';
import {Email} from './models/email';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public emailDetail: Email;

  constructor() { }

  setEmailDetail(email: Email){
    this.emailDetail = email;
    console.log("email detail set by service--",this.emailDetail);
  }
  getEmailDetail(){
    return this.emailDetail;
  }
}
