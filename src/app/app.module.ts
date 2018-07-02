import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoldersPanelComponent } from './folders-panel/folders-panel.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';
import { ApiService } from  './api.service';
import { ComposeModalComponent } from './compose-modal/compose-modal.component';


const routes: Routes = [
  { path: 'sign_up', component: SignUpComponent },
  { path: 'sign_in', component: SignInComponent },
  {path: 'side_panel', component: FoldersPanelComponent},
  // {path: 'side_panel/inbox', component: FoldersPanelComponent},
  // {path: 'side_panel/sent', component: FoldersPanelComponent},
  {path: 'compose_email', component: ComposeModalComponent, outlet: 'compose'}
  //,{path: '**', redirectTo: "/side_panel"}
];

@NgModule({
  declarations: [
    AppComponent,
    FoldersPanelComponent,
    SignInComponent,
    SignUpComponent,
    ComposeModalComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
