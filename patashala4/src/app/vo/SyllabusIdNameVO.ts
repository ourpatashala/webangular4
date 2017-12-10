/**
 * Created by preneeth on 12/6/17.
 */

export class SyllabusIdNameVO{

  syllabusId : string;
  syllabusName : string


  public toString():string {
    return this.syllabusId + " " + this.syllabusName;
  }
}


