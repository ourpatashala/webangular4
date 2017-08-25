import {LoginVO} from "../../vo/LoginVO";
import {LoginComponentInterface} from "../../component/login/LoginComponentInterface";
/**
 * Created by ravisha on 8/17/17.
 */


export interface LoginConverter {
  signUp(loginVo:LoginVO,loginComponentInterface:LoginComponentInterface):void;
  login(loginVo:LoginVO,loginComponentInterface:LoginComponentInterface):void;
  resetPassword(loginVo:LoginVO,loginComponentInterface:LoginComponentInterface);
}
