/**
 * Created by preneeth on 12/6/17.
 */

export class MasterSubjectVO{
  subjectId: string;
  subjectName: string;
  uniqueId:string;

  public toString():string {
    return this.subjectId + " " +  this.subjectName + " " + this.uniqueId;
  }
}


