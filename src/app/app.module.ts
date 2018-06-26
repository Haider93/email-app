import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoldersPanelComponent } from './folders-panel/folders-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    FoldersPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
