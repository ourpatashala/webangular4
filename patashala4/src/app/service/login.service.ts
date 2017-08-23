import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {

  angularFireDatabase: AngularFireDatabase;
  angularFireAuth:AngularFireAuth;

  constructor(angularFireDatabase: AngularFireDatabase,angularFireAuth:AngularFireAuth) {
    this.angularFireDatabase = angularFireDatabase;
    this.angularFireAuth = angularFireAuth;
  }

  public  signUp(loginUserEmail:string,password:string):void{

    // TODO Ravi : Before doing following sign up, please check if the email is registered or not.
    this.angularFireAuth.auth.createUserWithEmailAndPassword(loginUserEmail, password)
      .then(function(firebaseUser) {
        console.log("User " + firebaseUser.uid + " created successfully!");
        //return firebaseUser;
      });

  }

  public  login(loginUserEmail:string,password:string):void{
     this.angularFireAuth.auth.signInWithEmailAndPassword(loginUserEmail, password)
     .then(function(firebaseUser) {
     console.log("User " + firebaseUser.uid + " logged in successfully!");
     //return firebaseUser;
     });

  }

  public resetPassword(loginUserEmail:string){
    this.angularFireAuth.auth.sendPasswordResetEmail(loginUserEmail);
    console.log("User " + loginUserEmail+ ", password reset mail sent  successfully!");

  }


}
