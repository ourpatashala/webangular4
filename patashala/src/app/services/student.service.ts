/**
 * Created by ravisha on 3/11/17.
 */
import {Injectable, Inject} from '@angular/core'
import { FirebaseApp } from 'angularfire2';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {angularFireModule} from "../app.module";
import {databaseFB} from "../app.module";


@Injectable()
export class StudentService{

    studentsInfo:FirebaseListObservable<StudentInterface[]>;
    firebaseApp: any;


    constructor(af: AngularFire) {
        this.firebaseApp =af;
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


    getStudentsFromFB(){
         this.studentsInfo = this.firebaseApp.database.list('/schools/school01/studentProfile/student10') as FirebaseListObservable<StudentInterface>;
        return this.studentsInfo;
    }

}


 export  interface StudentInterface{
    firstName?:String;
    gender?:String;
    schoolName?:String;


}
