import {Component, OnInit, Inject} from '@angular/core';
import {LoginVO} from "../../vo/LoginVO";
import {LoginTO} from "../../to/LoginTO";
import {LoginConverterImpl} from "../../adapter/impl/LoginConverterImpl";
import {LoginConverter} from "../../adapter/interfaces/LoginConverter";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject('LoginConverter') private loginConverter: LoginConverter){

  }

  ngOnInit() {
  }

  signUp(loginTo:LoginTO):void{
    this.loginConverter.signUp(loginTo)

  }

  login(loginTo:LoginTO):void{
    this.loginConverter.login(loginTo)

  }

  resetPassword(loginTo:LoginTO){
    this.loginConverter.resetPassword(loginTo)
  }



}
