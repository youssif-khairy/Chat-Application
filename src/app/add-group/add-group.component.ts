import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../shared/friends.service';
import { RoomModel } from '../shared/room-model.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  all_friends:RoomModel[] = [];
  form:FormGroup;
  constructor(private friendsService:FriendsService,private user:AuthServiceService) { }
  
  ngOnInit(): void {
    this.friendsService.friends.subscribe((all_Friends:RoomModel[])=>{      
      all_Friends.map((el:RoomModel)=>{
        if (el.userEmails.length <= 2){ //Only add individual users in chat group not other groups
          let temp = new RoomModel(el._id,el.name,el.messages,el.userEmails);
          this.all_friends.push(temp);
        }
      })
    })

    this.form = new FormGroup({
      name:new FormControl(),
      users:new FormArray([])
    })
    if (this.all_friends){
      this.all_friends.map((element:RoomModel)=>{
      (this.form.controls.users as FormArray).push(new FormControl(false));  
      })
    }
    
  }
  getFormArray(){
    return (<FormArray>this.form.get('users')).controls;
  }
  onSubmit(){
    let userEmails:String[] = [];
    userEmails.push(this.user.user.value.email)
    this.form.value.users.map((el:boolean,i)=>{
      if (el){
        if (this.user.user.value.email == this.all_friends[i].userEmails[0]) //Add the other user not me
          userEmails.push(this.all_friends[i].userEmails[1])  
        else
          userEmails.push(this.all_friends[i].userEmails[0])
      }
    })

    this.friendsService.addGroup(this.form.value.name,userEmails).subscribe((room:RoomModel)=>{
      this.friendsService.friends.value.push(room)
    });
  }
}
