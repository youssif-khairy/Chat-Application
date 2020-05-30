import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { UserModel } from '../shared/user-model.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string="";
  isAuthenticated:boolean = false;
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user:UserModel)=>{
      if (user){
        this.isAuthenticated = !!user;
        this.userName = user["name"]
      }
      else
        {this.isAuthenticated = false;}
    })
  }
  onLogout(){
    this.authService.logout()
  }

}
