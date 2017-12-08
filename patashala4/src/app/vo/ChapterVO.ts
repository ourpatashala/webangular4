/**
 * Created by preneeth on 12/6/17.
 */

export class ChapterVO{

  chapterId : string;
  chapterName : string
  serialNo : string;
  completion: string;
  uniqueId:string;

  public toString():string {
    return this.chapterId + " " + this.chapterName+ " " +  this.serialNo + " " +  this.completion + " " + this.uniqueId;
  }
}


