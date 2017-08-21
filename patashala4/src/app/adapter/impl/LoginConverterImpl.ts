import {CommonConverter} from "./CommonConverter";
import {LoginConverter} from "../interfaces/LoginConverter";
import {Injectable} from "@angular/core";
import {LoginVO} from "../../vo/LoginVO";
import {LoginService} from "../../service/login.service";
/**
 * Created by ravisha on 8/17/17.
 */

@Injectable()
export class LoginConverterImpl extends CommonConverter implements LoginConverter {

  constructor(private loginService: LoginService) {
    super()
  }

  signUp(loginVo:LoginVO):void{
    this.loginService.signUp(loginVo.loginUserEmail,loginVo.password);

  }
  login(loginVo:LoginVO):void{
    this.loginService.login(loginVo.loginUserEmail,loginVo.password);
  }
  resetPassword(loginVo:LoginVO){
    this.loginService.resetPassword(loginVo.loginUserEmail);
  }
}
