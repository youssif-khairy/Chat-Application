import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ServerSocketService } from '../server-socket.service';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from 'src/app/shared/friends.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
})

export class ActiveChatComponent implements OnInit,AfterViewChecked {

  @ViewChild('scroll') scroll:ElementRef;

  textMessage:string="";
  id:number;
  messages:{fromUser:String,message:String}[] = []
  constructor(private server :ServerSocketService,private activeRoute:ActivatedRoute,
    private friendsService:FriendsService,public authService:AuthServiceService) { }

  ngAfterViewChecked(): void {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params)=>{
      this.server.leaveAllRooms() //leave room before starting any new room
      this.id = +params.id; //recieve id
      this.server.connectToRoom(this.friendsService.friends.value[this.id]._id);//connect to the new room

      //fill all messages from server
      this.friendsService.populateMessagesForRoom(this.id).subscribe(
        (messages:[{fromUser:String,message:String}])=>{
          this.friendsService.friends.value[this.id].messages = messages.slice();
          this.messages = messages.slice();
        })
    })
    //subscribe to recive messages
    this.server.reciveMessage().subscribe((recievedData:any) =>{ //get messages from other users
      this.messages.push({fromUser:recievedData.email,message:recievedData.message})
    })
    
  }
  addMessage(){ //send messages to other users
    if (this.textMessage != "")
    {
      this.messages.push({fromUser:this.authService.user.value.email,message:this.textMessage})
      this.server.sendMessage(this.textMessage,this.friendsService.friends.value[this.id]._id)
    }
      
    this.textMessage = ""
  }
}
