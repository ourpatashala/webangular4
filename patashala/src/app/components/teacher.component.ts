/**
 * Created by ravisha on 3/11/17.
 */
import { Component } from '@angular/core';
import {TeacherService } from '../services/teacher.service'

@Component({
    moduleId: module.id,
    selector: 'teacher',
    templateUrl: '../screens/teacher.screen.html',
    providers: [TeacherService]
})
export class TeacherComponent {
    teacherName:String;
    teacherList: String;
    teacherId:String;
    constructor(private teacherService: TeacherService ){
        this.teacherName = "ravisha";

    }

    addTeacher(schoolId : String,teacherId: String){
        this.teacherId =  this.teacherService.addTeacher(schoolId,teacherId);
    }

    getTeacher(schoolId : String,teacherId: String){
        this.teacherName = this.teacherService.getTeacher(schoolId,teacherId);
    }

    getTeachers(schoolId : String,classId:String){
        this.teacherList =  this.teacherService.getTeachers(schoolId,classId);

    }


}


