import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Routes,RouterModule, Router} from '@angular/router';
import {routing} from './../../app.routing';
import {LoginComponentInterface} from "./LoginComponentInterface";
import {LoginTO} from "../../to/LoginTO";
import {LoginConverter} from "../../adapter/interfaces/LoginConverter";


import {LoginConverterImpl} from "../../adapter/impl/LoginConverterImpl";
import {MessageTO} from "../../to/MessageTO";

@Component({
    selector: 'app-login',
    templateUrl: './registeration.component.html',
    providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
    styleUrls: ['./login.component.css']
  })



export class RegisterationComponent  implements OnInit , LoginComponentInterface {
  userForm: any;
  errorMessage:string;
  sucessMessage:string;
  active:string="0";//0 for no content, 1 for success, 2 for error

  constructor(@Inject('LoginConverter') private loginConverter: LoginConverter,private router: Router){
    this.userForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      Confirmpassword: new FormControl()
   });

  }

      ngOnInit() {
      }


      userReg()
      {

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

      successMessageCallBack(messageTo:MessageTO) {
        setTimeout(()=>{
          this.router.navigate(['/School']);
        },2000);
        this.setUserSuccessMessageonUI("user registered successfully");
      }

      errorMessageCallBack(messageTo:MessageTO){
        this.setUserErrorMessageonUI(messageTo.messageInfo);
      }
      setUserSuccessMessageonUI(message:string)
      {
        this.sucessMessage = message;
        this.active="1";
        setTimeout(()=>{
          this.sucessMessage = "";
          this.active="0";
        },2000);
      }
      setUserErrorMessageonUI(message:string)
      {
        this.errorMessage = message;
        this.active="2";
        setTimeout(()=>{
          this.errorMessage = "";
          this.active="0";
        },2000);
      }

  }
