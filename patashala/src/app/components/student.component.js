"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by ravisha on 3/11/17.
 */
var core_1 = require('@angular/core');
var student_service_1 = require('../services/student.service');
var StudentComponent = (function () {
    function StudentComponent(studentService) {
        this.studentService = studentService;
        this.student = {
            id: "10",
            firstName: "ravi",
            lastName: "katta",
            classId: "10A",
            schoolId: "school01"
        };
    }
    StudentComponent.prototype.addStudent = function () {
        this.addResult = this.studentService.addStudent(this.student.schoolId, this.student.id);
        console.log(this.addResult);
    };
    StudentComponent.prototype.getStudent = function () {
        this.getResult = this.studentService.getStudent(this.student.schoolId, this.student.id);
        console.log(this.getResult);
    };
    StudentComponent.prototype.getStudents = function (schoolId, classId) {
        this.getResults = this.studentService.getStudents(this.student.schoolId, this.student.id);
        console.log(this.getResults);
    };
    StudentComponent.prototype.getFirebaseStudents = function () {
        var _this = this;
        this.studentService.getStudentsFromFB().subscribe(function (studentsInfo) {
            console.log("Printing Student Info");
            console.log("Printing Student Info" + studentsInfo.length);
            _this.studentsInfo = studentsInfo;
        });
    };
    StudentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'student',
            templateUrl: '../screens/student.screen.html',
            providers: [student_service_1.StudentService]
        }), 
        __metadata('design:paramtypes', [student_service_1.StudentService])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.component.js.map