import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserModel } from '../shared/user-model.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  url:string = environment.SOCKET_ENDPOINT;

  user = new BehaviorSubject<UserModel>(null);
  constructor(private http:HttpClient,private router:Router) { }

  signUp(email:string,name:string,password:string){
    var userData = {
        "name":name,
        "email":email,
        "password":password
    }
    return this.http.post(this.url+'/user/signup',userData)
  }
  signIn(email:string,password:string){
    var userData = {
      "email":email,
      "password":password
    }
    return this.http.post(this.url+'/user/signin',userData).pipe(tap((response:UserModel)=>{
      this.user.next(response);
    }))
  }
  logout(){
    this.user.next(null);
  }

}
