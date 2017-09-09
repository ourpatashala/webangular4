import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {LoginComponentInterface} from "../component/login/LoginComponentInterface";


@Injectable()
export class LoginService {

  angularFireDatabase: AngularFireDatabase;
  angularFireAuth:AngularFireAuth;

  constructor(angularFireDatabase: AngularFireDatabase,angularFireAuth:AngularFireAuth) {
    this.angularFireDatabase = angularFireDatabase;
    this.angularFireAuth = angularFireAuth;
    //let storageRef = firebase.storage().ref();

  }

  public  signUp(loginUserEmail:string,password:string,loginComponentInterface:LoginComponentInterface):void{

    // TODO Ravi : Before doing following sign up, please check if the email is registered or not.
    this.angularFireAuth.auth.createUserWithEmailAndPassword(loginUserEmail, password)
      .then(function(firebaseUser) {
        loginComponentInterface.successMessageCallBack(" User "+loginUserEmail+ " created successfully..");
        console.log("User " + firebaseUser.uid + " created successfully!");
        //return firebaseUser;
      });

  }

  public  login(loginUserEmail:string,password:string,loginComponentInterface:LoginComponentInterface):void{
     this.angularFireAuth.auth.signInWithEmailAndPassword(loginUserEmail, password)
     .then(function(firebaseUser) {
     console.log("User " + firebaseUser.uid + " logged in successfully!");
       loginComponentInterface.successMessageCallBack("Welcome "+loginUserEmail);
     //return firebaseUser;
     });

  }

  public resetPassword(loginUserEmail:string,loginComponentInterface:LoginComponentInterface){
    this.angularFireAuth.auth.sendPasswordResetEmail(loginUserEmail);
    loginComponentInterface.successMessageCallBack("Password reset mail sent  successfully to user:"+loginUserEmail);
    console.log("User " + loginUserEmail+ ", password reset mail sent  successfully!");

  }


}
