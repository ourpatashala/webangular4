import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Routes,RouterModule, Router} from '@angular/router';
import {routing} from './../../app.routing';



// import {LoginVO} from "../../vo/LoginVO";
// import {LoginTO} from "../../to/LoginTO";
// import {LoginConverterImpl} from "../../adapter/impl/LoginConverterImpl";
// import {LoginConverter} from "../../adapter/interfaces/LoginConverter";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 // providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userForm: any;




//   constructor(@Inject('LoginConverter') private loginConverter: LoginConverter){
// }

constructor( private router: Router){
  
}




  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
   });
  }
  
  // signUp(loginTo:LoginTO):void{
  //   this.loginConverter.signUp(loginTo)
  // }
  
  // login(loginTo:LoginTO):void{
  //   this.loginConverter.login(loginTo)
  // }
  
  // resetPassword(loginTo:LoginTO){
  //   this.loginConverter.resetPassword(loginTo)
  // }

  userFormLogin()
  {
    console.log(this.userForm);

    this.router.navigate(['/School']);
    
    
  }
 
}




