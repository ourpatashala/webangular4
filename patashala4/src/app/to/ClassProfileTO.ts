/**
 * Created by Preneeth on 10/11/17.
 */
export class ClassProfileTO{

  id: string;
  name: string;
  classTeacher: string;
  batch: string;


  toString() {
    return "id : " + this.id + "\n" +
      "name : " + this.name + "\n" +
      "batch : " + this.batch + "\n" +
      "classTeacher : " + this.classTeacher + "\n" ;

  }

}
