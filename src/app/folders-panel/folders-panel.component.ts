import { Component, OnInit } from '@angular/core';
import {Email} from '../models/email';
import {EMAILS} from '../models/mock-emails';

@Component({
  selector: 'app-folders-panel',
  templateUrl: './folders-panel.component.html',
  styleUrls: ['./folders-panel.component.css']
})
export class FoldersPanelComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    this.emails = EMAILS;
  }


  emails: Email[]
  inbox(){
    
  }

  sent(){}

  deleted(){}
}
