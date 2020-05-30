import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
    providedIn:'root'
})
export class ServerSocketService{
    constructor(private authService:AuthServiceService){}
    private socket = io(environment.SOCKET_ENDPOINT);


    connectToRoom(roomID){
        this.socket.emit('roomConnection',roomID);
    }
    leaveAllRooms(){
        this.socket.emit('leaveAllRooms')
    }
    sendMessage(message,roomID){
        this.socket.emit('new-message',this.authService.user.value.email,message,roomID)
    }
    
    reciveMessage():Observable<string>{
        return Observable.create((observer)=>{
            this.socket.on('new-message',(email:string,message:string)=>{
                observer.next({email,message})
            })
        })
    }

}