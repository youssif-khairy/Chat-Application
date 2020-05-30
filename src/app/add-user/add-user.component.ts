import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FriendsService } from '../shared/friends.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomModel } from '../shared/room-model.model';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private friendsService:FriendsService,private authService:AuthServiceService) { }

  form:FormGroup;
  error:string = null;
  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(),
    });
  }
  onSubmit(){
    if (this.form.value.email == this.authService.user.value.email){
      this.error = `you can't add your self as friend`;
      return;
    }
    if (this.form.valid){
      this.friendsService.addFriend(this.form.value.email).subscribe(
        (newRoom:RoomModel)=>{
          this.friendsService.populateFriends(this.authService.user.value.email);
        },
        (error:HttpErrorResponse)=>{this.error = error.error;}
      );
       
      
    }
  }

}
