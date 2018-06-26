import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoldersPanelComponent } from './folders-panel/folders-panel.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sign_up', component: SignUpComponent },
  { path: 'sign_in', component: SignInComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FoldersPanelComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
