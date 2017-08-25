import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Routes,RouterModule, Router} from '@angular/router';
import {routing} from './../../app.routing';
import {LoginComponentInterface} from "./LoginComponentInterface";
import {LoginTO} from "../../to/LoginTO";
import {LoginConverter} from "../../adapter/interfaces/LoginConverter";


 import {LoginConverterImpl} from "../../adapter/impl/LoginConverterImpl";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit , LoginComponentInterface{
  userForm: any;



  constructor(@Inject('LoginConverter') private loginConverter: LoginConverter,private router: Router){
 }


  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
   });
  }



  signUp({value, valid}: {value: LoginTO, valid: boolean}) {
    this.loginConverter.signUp(value,this)

  }

  login({value, valid}: {value: LoginTO, valid: boolean}) {
    this.loginConverter.login(value,this)

  }

  resetPassword({value, valid}: {value: LoginTO, valid: boolean}) {
    this.loginConverter.resetPassword(value,this)

  }

  successMessageCallBack(message1:string) {
    console.log(message1.length + 'sucess');
    this.router.navigate(['/School']);
  }

  errorMessageCallBack(message:string){
    console.log(message.length + 'Navigate to Error page');

  }

  }




