/**
 * Created by ravisha on 7/12/17.
 */
export class SchoolError {
  message:string;
  constructor(message:string){
    this.message = message;
  }
  toString() {
    return this.message;
  }
}
