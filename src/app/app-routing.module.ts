import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { NoActiveChatComponent } from './chat-page/no-active-chat/no-active-chat.component';
import { ActiveChatComponent } from './chat-page/active-chat/active-chat.component';
import { AddGroupComponent } from './add-group/add-group.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path:'auth',component:AuthComponent,
    children:[
      {path:'',component:SigninComponent},
      {path:'signup',component:SignupComponent},
    ],
  },
  
  {
    path:'chat',component:ChatPageComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component:NoActiveChatComponent},
      {path:':id',component:ActiveChatComponent},
    ],
  },
  {path:'addUser',component:AddUserComponent,canActivate:[AuthGuard]},
  {path:'addGroup',component:AddGroupComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
