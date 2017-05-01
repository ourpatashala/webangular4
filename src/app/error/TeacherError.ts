/**
 * Created by ravisha on 4/29/17.
 */
export class TeacherError {
  message:string;
  constructor(message:string){
    this.message = message;
  }
  toString() {
    return this.message;
  }
}
