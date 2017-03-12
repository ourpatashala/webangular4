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
var teacher_service_1 = require('../services/teacher.service');
var TeacherComponent = (function () {
    function TeacherComponent(teacherService) {
        this.teacherService = teacherService;
        this.teacherName = "ravisha";
    }
    TeacherComponent.prototype.addTeacher = function (schoolId, teacherId) {
        this.teacherId = this.teacherService.addTeacher(schoolId, teacherId);
    };
    TeacherComponent.prototype.getTeacher = function (schoolId, teacherId) {
        this.teacherName = this.teacherService.getTeacher(schoolId, teacherId);
    };
    TeacherComponent.prototype.getTeachers = function (schoolId, classId) {
        this.teacherList = this.teacherService.getTeachers(schoolId, classId);
    };
    TeacherComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'teacher',
            templateUrl: '../screens/teacher.screen.html',
            providers: [teacher_service_1.TeacherService]
        }), 
        __metadata('design:paramtypes', [teacher_service_1.TeacherService])
    ], TeacherComponent);
    return TeacherComponent;
}());
exports.TeacherComponent = TeacherComponent;
//# sourceMappingURL=teacher.component.js.map