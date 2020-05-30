import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from './user-model.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { RoomModel } from './room-model.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  url:string = environment.SOCKET_ENDPOINT;
  friends:BehaviorSubject<Array<RoomModel>> = new BehaviorSubject<RoomModel[]>([]);

  constructor(private http:HttpClient,private authService:AuthServiceService) { }

  populateFriends(email:string){
    this.http.post(this.url + '/rooms/getAllRooms',{email}).subscribe(
      
      (allRooms:[]) => {
        let temp:RoomModel[] = [];
        allRooms.map((el:any)=>{temp.push(new RoomModel(el._id,el.name,el.messages,el.userEmails))});
        this.friends.next(temp); 
      }
    );
  }
  addFriend(email:string){
    const thisUser = this.authService.user.value.email;
    return this.http.post(this.url + '/rooms/addUser',{email1:thisUser,email2:email})
  }

  addGroup(name:String,userEmails:String[]){
    return this.http.post(this.url + '/rooms/add',{name,userEmails})
  }
  populateMessagesForRoom(index:number){
    const roomID:String = this.friends.value[index]._id
    return this.http.post(this.url + '/rooms/getMessagesForRoom',{roomID})
  }
  

}
