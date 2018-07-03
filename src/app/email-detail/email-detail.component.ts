import { Component, OnInit } from '@angular/core';
import {Email} from '../models/email';
import { Router } from '@angular/router';
import { ApiService } from  '../api.service';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;
  public emailDetail: Email;

  constructor(public email: Email,public dataService: DataServiceService) {
    // this.emailDetail = dataService.getEmailDetail();
    // console.log("email ov=bject received---",this.emailDetail);
   }

  ngOnInit() {
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    //this.router.navigate(['/side_panel']);
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }


}
