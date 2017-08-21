import {LoginVO} from "../../vo/LoginVO";
/**
 * Created by ravisha on 8/17/17.
 */


export interface LoginConverter {
  signUp(loginVo:LoginVO):void;
  login(loginVo:LoginVO):void;
  resetPassword(loginVo:LoginVO);
}
