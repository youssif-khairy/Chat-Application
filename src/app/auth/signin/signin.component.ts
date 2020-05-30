import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/user-model.model';
import { Subject } from 'rxjs';
import { FriendsService } from 'src/app/shared/friends.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form:FormGroup;
  imageFile:File;
  constructor(private authService:AuthServiceService,private route:Router,private friendsService:FriendsService) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email:new FormControl(),
      password:new FormControl(),
    })
    //this.authService.user.next(null);
  }
  onSubmit(){
    if(this.form.invalid){ return;}
    this.authService.signIn(this.form.value.email,this.form.value.password)
    .subscribe((response:UserModel)=>{
      this.friendsService.populateFriends(response.email);
      this.route.navigate(['/chat']);
    },(error)=>{
      console.log(error);
    },()=>{
      
    })
  }

}
