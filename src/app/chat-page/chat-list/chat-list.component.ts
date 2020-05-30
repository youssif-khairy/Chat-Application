import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'src/app/shared/room-model.model';
import { FriendsService } from 'src/app/shared/friends.service';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  all_friends:RoomModel[] = [];
  constructor(private friendsService:FriendsService) {
    
    
   }

  ngOnInit(): void {
    
    this.friendsService.friends.subscribe((all_Friends:RoomModel[])=>{      
      let t:RoomModel[] = [];
      all_Friends.map((el:RoomModel)=>{let temp = new RoomModel(el._id,el.name,el.messages,el.userEmails);this.all_friends.push(temp);t.push(temp);})
      
    })
  }

}
