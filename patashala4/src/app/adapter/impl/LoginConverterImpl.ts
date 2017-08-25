import {CommonConverter} from "./CommonConverter";
import {LoginConverter} from "../interfaces/LoginConverter";
import {Injectable} from "@angular/core";
import {LoginVO} from "../../vo/LoginVO";
import {LoginService} from "../../service/login.service";
import {LoginComponentInterface} from "../../component/login/LoginComponentInterface";
import {LoginTO} from "../../to/LoginTO";
/**
 * Created by ravisha on 8/17/17.
 */

@Injectable()
export class LoginConverterImpl extends CommonConverter implements LoginConverter {

  constructor(private loginService: LoginService) {
    super()
  }

  signUp(loginTo:LoginTO,loginComponentInterface:LoginComponentInterface):void{
    var loginVo  = new LoginVO();
    loginVo.username = loginTo.username;
    loginVo.password = loginTo.password;
    this.loginService.signUp(loginVo.username,loginVo.password,loginComponentInterface);

  }
  login(loginTo:LoginTO,loginComponentInterface:LoginComponentInterface):void{
    var loginVo  = new LoginVO();
    loginVo.username = loginTo.username;
    loginVo.password = loginTo.password;
    this.loginService.login(loginVo.username,loginVo.password,loginComponentInterface);
  }

  resetPassword(loginTo:LoginTO,loginComponentInterface:LoginComponentInterface){
    var loginVo  = new LoginVO();
    loginVo.username = loginTo.username;
    loginVo.password = loginTo.password;
    this.loginService.resetPassword(loginVo.username,loginComponentInterface);
  }
}
