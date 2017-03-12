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
var StudentService = (function () {
    function StudentService() {
    }
    StudentService.prototype.addStudent = function (schoolId, studentId) {
        console.log("heloo.." + studentId);
        return 'Student Added with id: ' + studentId + ' in School :' + schoolId;
        ;
    };
    StudentService.prototype.getStudent = function (schoolId, studentId) {
        return 'Student Cnu with id : ' + studentId + ' in School :' + schoolId;
    };
    StudentService.prototype.getStudents = function (schoolId, classId) {
        return 'Student Cnu with classId : ' + classId + ' schoolId : ' + schoolId;
    };
    StudentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StudentService);
    return StudentService;
}());
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map