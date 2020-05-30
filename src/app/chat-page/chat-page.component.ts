import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerSocketService } from './server-socket.service';
import { FriendsService } from '../shared/friends.service';
import { RoomModel } from '../shared/room-model.model';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  ngOnInit(){
  }
}
