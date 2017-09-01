import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {LoginComponentInterface} from "../component/login/LoginComponentInterface";
import {MessagesTypes} from "../constants/MessageTypes";
import {MessageTO} from "../to/MessageTO";
import {Messages} from "../constants/Messages";
import {DefaultService} from "./DefaultService";


@Injectable()
export class LoginService extends DefaultService {

  angularFireDatabase: AngularFireDatabase;
  angularFireAuth:AngularFireAuth;
  className:string;

  constructor(angularFireDatabase: AngularFireDatabase,angularFireAuth:AngularFireAuth) {
    super();
    this.angularFireDatabase = angularFireDatabase;
    this.angularFireAuth = angularFireAuth;
    this.className = "LoginService";
    //let storageRef = firebase.storage().ref();

  }

  public  signUp(loginUserEmail:string,password:string,loginComponentInterface:LoginComponentInterface):void{
    var messageTO = new MessageTO();
    messageTO.serviceClassName = this.className;
    messageTO.serviceMethodName = "signUp()";
    // TODO Ravi : Before doing following sign up, please check if the email is registered or not.
    this.angularFireAuth.auth.createUserWithEmailAndPassword(loginUserEmail, password)
      .then(function(firebaseUser) {
        messageTO.messageInfo = Messages.SIGNUP_SUCCEFULL;
        messageTO.messageType = MessagesTypes.SIGNUP;
        this.displayOnConsole(true,messageTO);
        loginComponentInterface.successMessageCallBack(messageTO);
      }).catch(function(errorInfo) {
      // Handle Errors here.
      messageTO.messageInfo = errorInfo.message;
      messageTO.messageType = MessagesTypes.SIGNUP;
      this.displayOnConsole(false,messageTO);
      var errorMessage = errorInfo.message;
      loginComponentInterface.errorMessageCallBack(messageTO);

      // ...
    });

  }

  public  login(loginUserEmail:string,password:string,loginComponentInterface:LoginComponentInterface):void{
    var messageTO = new MessageTO();
    messageTO.serviceClassName = this.className;
    messageTO.serviceMethodName = "login()";
    var obj = this;
    this.angularFireAuth.auth.signInWithEmailAndPassword(loginUserEmail, password)
     .then(function(firebaseUser) {
     console.log("User " + firebaseUser.uid + " logged in successfully!");
       messageTO.messageInfo = Messages.LOGIN_SUCCEFULL;
       messageTO.messageType = MessagesTypes.LOGIN;
      obj.displayOnConsole(true,messageTO);
       loginComponentInterface.successMessageCallBack(messageTO);
     }).catch(function(errorInfo) {
      messageTO.messageInfo = errorInfo.message;
      messageTO.messageType = MessagesTypes.LOGIN;
      obj.displayOnConsole(false,messageTO);
      loginComponentInterface.errorMessageCallBack(messageTO);
     });
  }

  public resetPassword(loginUserEmail:string,loginComponentInterface:LoginComponentInterface){
    var messageTO = new MessageTO();
    messageTO.serviceClassName = this.className;
    messageTO.serviceMethodName = "resetPassword()";
    messageTO.messageInfo = "User " + loginUserEmail+ ", password reset mail sent  successfully!";
    this.angularFireAuth.auth.sendPasswordResetEmail(loginUserEmail);
    this.displayOnConsole(true,messageTO);
    loginComponentInterface.successMessageCallBack(messageTO);
  }


}
