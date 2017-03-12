/**
 * Created by ravisha on 3/11/17.
 */
import {Injectable} from '@angular/core'

@Injectable()
export class TeacherService{
    constructor(){

    }

    addTeacher(schoolId : String,teacherId: String){
        return 'Teacher Added with id: '+teacherId+' in School :'+schoolId;
    }

    getTeacher(schoolId : String,teacherId: String){
        return 'Teacher Cnu with id : '+teacherId+' in School :'+schoolId;;
    }

    getTeachers(schoolId : String,classId:String){
        return 'Teacher Cnu with classId : '+classId+' schoolId : '+schoolId;

    }

}
