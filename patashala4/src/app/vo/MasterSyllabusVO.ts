/**
 * Created by preneeth on 12/6/17.
 */

export class MasterSyllabusVO{

  syllabusId : string;
  syllabusName : string
  subjectId : string;
  subjectName: string;
  uniqueId:string;

  public toString():string {
    return this.syllabusId + " " + this.syllabusName+ " " +  this.subjectId + " " +  this.subjectName + " " + this.uniqueId;
  }

  public getValueString():string {
    return this.syllabusId + " " + this.syllabusName+ " " +  this.subjectId + " " +  this.subjectName + " " + this.uniqueId;
  }
}


