import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Routes,RouterModule, Router} from '@angular/router';
import {routing} from './../../app.routing';
import {LoginComponentInterface} from "./LoginComponentInterface";
import {LoginTO} from "../../to/LoginTO";
import {LoginConverter} from "../../adapter/interfaces/LoginConverter";
import {LoginConverterImpl} from "../../adapter/impl/LoginConverterImpl";
import {MessageTO} from "../../to/MessageTO";
import { AppConstants } from "../../constants/AppConstants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit , LoginComponentInterface{
  userForm: any;
  errorMessage:string;
  sucessMessage:string;
  active:string="0";//0 for no content, 1 for success, 2 for error
  username: string="";

  constructor(@Inject('LoginConverter') private loginConverter: LoginConverter,private router: Router, private formBuilder: FormBuilder){
    this.userForm = formBuilder.group({
      username: [],
      password: []
    });

    localStorage.removeItem(AppConstants.SHAREDPREFERANCE_USERID);

    
 }
    // constructor(private router: Router){
    // }

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
    this.username=value.username;
    var atpos = value.username.indexOf("@");
    var dotpos = value.username.lastIndexOf(".");


    if(value.username == null)
      {
        this.setUserErrorMessageonUI("Please Enter Username");
      }
      else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.username.length) {
        this.setUserErrorMessageonUI("invalid Email");
      }
    else
    {
      this.username=value.username;
      this.loginConverter.login(value,this)
    }

  }

  resetPassword({value, valid}: {value: LoginTO, valid: boolean}) {

    this.username=value.username;
    var atpos = value.username.indexOf("@");
    var dotpos = value.username.lastIndexOf(".");


    if(value.username == null)
      {
        this.setUserErrorMessageonUI("Please Enter Username");
      }
      else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=value.username.length) {
        this.setUserErrorMessageonUI("invalid Email");
      }
    else
      {
        this.loginConverter.resetPassword(value,this)
      }

  }

  successMessageCallBack(messageTO:MessageTO) {
    console.log(" successMessageCallBack ==>" + messageTO.messageInfo+"  "+ messageTO.messageType+"  "+messageTO.serviceClassName+"  "+messageTO.serviceMethodName);
    if(messageTO.serviceMethodName=="login()")
    {
      localStorage.setItem(AppConstants.SHAREDPREFERANCE_USERID,this.username);
      this.setUserSuccessMessageonUI("Login Successful");
      setTimeout(()=>{
        this.router.navigate(['/School']);
      },500);
    }
    else if(messageTO.serviceMethodName=="resetPassword()")
    {
     // localStorage.setItem('schoolid',this.username);
      this.setUserSuccessMessageonUI("reset link sent successfully");
    }
  }

  errorMessageCallBack(messageTO:MessageTO){
    console.log("message in Login component..." + messageTO.messageInfo);

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




