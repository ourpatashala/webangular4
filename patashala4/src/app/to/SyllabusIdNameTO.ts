/**
 * Created by preneeth on 12/6/17.
 */

export class SyllabusIdNameTO{

  syllabusId : string;
  syllabusName : string


  public toString():string {
    return this.syllabusId + " " + this.syllabusName;
  }
}


