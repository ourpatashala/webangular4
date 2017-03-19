/**
 * Created by ravisha on 3/11/17.
 */
import { Component } from '@angular/core';
import {StudentService, StudentInterface} from '../services/student.service'
import {Student} from '../vo/student'

@Component({
    moduleId: module.id,
    selector: 'student',
    templateUrl: '../screens/student.screen.html',
    providers: [StudentService]
})
export class StudentComponent {
    studentsInfo:StudentInterface[];
    student:Student;
    addResult:string;
    getResult:string;
    getResults:string;


    constructor(private studentService: StudentService ){

        this.student ={
            id :"10",
            firstName :"ravi",
            lastName: "katta",
            classId:"10A",
            schoolId:"school01"
        }

    }

    addStudent(){
        this.addResult =  this.studentService.addStudent(this.student.schoolId,this.student.id);
        console.log(this.addResult)
    }

    getStudent(){
        this.getResult = this.studentService.getStudent(this.student.schoolId,this.student.id);
        console.log(this.getResult)
    }

    getStudents(schoolId : String,classId:String){
        this.getResults  =  this.studentService.getStudents(this.student.schoolId,this.student.id);
        console.log(this.getResults)
    }


    getFirebaseStudents() {
        this.studentService.getStudentsFromFB().subscribe(studentsInfo => {
            console.log("Printing Student Info");
            console.log("Printing Student Info"+studentsInfo.length);
            this.studentsInfo = studentsInfo;
        });
    }



    }


