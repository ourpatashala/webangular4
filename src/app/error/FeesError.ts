/**
 * Created by ravisha on 4/29/17.
 */
export class FeesError {
  message:string;
  constructor(message:string){
    this.message = message;
  }
  toString() {
    return this.message;
  }
}
