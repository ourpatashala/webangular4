export  class manageteacher {
   
    teacher:string;
    teacherId:string;
    className:string;
    
    
    public (toString):string {
        return this.teacher + " " +  this.teacherId + " " + this.className;
      }


}