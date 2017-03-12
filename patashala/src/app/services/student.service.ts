/**
 * Created by ravisha on 3/11/17.
 */
import {Injectable} from '@angular/core'

@Injectable()
export class StudentService{
    constructor(){

    }
    addStudent(schoolId : String,studentId: String){
        console.log("heloo.."+studentId)
        return 'Student Added with id: '+studentId+' in School :'+schoolId;;
    }

    getStudent(schoolId : String,studentId: String){
        return 'Student Cnu with id : '+studentId+' in School :'+schoolId;
    }

    getStudents(schoolId : String,classId:String){
        return 'Student Cnu with classId : '+classId+' schoolId : '+schoolId;

    }

}
