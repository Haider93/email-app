import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-compose-modal',
  templateUrl: './compose-modal.component.html',
  styleUrls: ['./compose-modal.component.css']
})
export class ComposeModalComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;

  constructor(private  apiService:  ApiService, private router: Router){
    var app_session = JSON.parse(localStorage.getItem("email-app-session"));
    var keys = [];
    for(var k in app_session) keys.push(k);
     var val = app_session[keys[0]];
    this.loggedInEmail = val;
  }

  public show(): void {
    this.visible = true;
    this.router.navigate(['/side_panel']);
    setTimeout(() => this.visibleAnimate = true, 100);
  }
  ngOnInit(){

  }

  public hide(): void {
    this.visibleAnimate = false;
    this.router.navigate(['/side_panel']);
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  loggedInEmail: string;
  
}
