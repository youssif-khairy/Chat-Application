import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/shared/user-model.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  imageFile:File;
  constructor(private authService:AuthServiceService,private route:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name:new FormControl(),
      email:new FormControl(),
      password:new FormControl(),
      //avatar:new FormControl(),
    })
    this.authService.user.next(null);
  }
  onSubmit(){
    if(this.form.invalid){ return;}
    this.authService.signUp(this.form.value.email,this.form.value.name,this.form.value.password)
    .subscribe((message)=>{
      this.route.navigate(['/']);
    },(error)=>{
      console.log(error);
    })
    
  }
  

}
