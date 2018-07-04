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
import { EmailDetailComponent } from './email-detail/email-detail.component';


const routes: Routes = [
  //{path: '',redirectTo: 'sign_up',pathMatch: 'full'},
  { path: 'sign_up', component: SignUpComponent },
  { path: 'sign_in', component: SignInComponent },
  {path: 'side_panel', component: FoldersPanelComponent, children:[
    {path: 'compose_email', component: ComposeModalComponent, outlet: 'compose'},
    {path: 'inbox', component: FoldersPanelComponent},
    {path: 'sent', component: FoldersPanelComponent},
    {path: 'email_detail/:id', component: EmailDetailComponent}
  ]},
  
  //,{path: '**', redirectTo: "/side_panel"}
];

@NgModule({
  declarations: [
    AppComponent,
    FoldersPanelComponent,
    SignInComponent,
    SignUpComponent,
    ComposeModalComponent,
    EmailDetailComponent
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
