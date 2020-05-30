import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatListComponent } from './chat-page/chat-list/chat-list.component';
import { ActiveChatComponent } from './chat-page/active-chat/active-chat.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NoActiveChatComponent } from './chat-page/no-active-chat/no-active-chat.component';
import { AddGroupComponent } from './add-group/add-group.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatPageComponent,
    ChatListComponent,
    ActiveChatComponent,
    AuthComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    AddUserComponent,
    NoActiveChatComponent,
    AddGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
