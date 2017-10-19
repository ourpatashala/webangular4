/**
 * Created by Preneeth on 10/11/17.
 */
export class ClassProfileTO{

  id: string;
  name: string;
  classTeacher: string;


  toString() {
    return "id : " + this.id + "\n" +
      "name : " + this.name + "\n" +
      "classTeacher : " + this.classTeacher + "\n" ;
  }

}
