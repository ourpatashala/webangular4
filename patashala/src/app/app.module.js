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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var angularfire2_1 = require('angularfire2');
var student_service_1 = require('./services/student.service');
var app_component_1 = require('./app.component');
var student_component_1 = require('./components/student.component');
var teacher_component_1 = require('./components/teacher.component');
var app_routing_1 = require('./app.routing');
exports.firebaseConfig = {
    apiKey: 'AIzaSyB6WeGfORqOzz5jT_XL6GLMCl8zeQqORHU',
    authDomain: 'devpatashala-4e257.firebaseapp.com',
    databaseURL: 'https://devpatashala-4e257.firebaseio.com',
    storageBucket: 'devpatashala-4e257.appspot.com',
    messagingSenderId: '857631726201'
};
firebase.initializeApp(exports.firebaseConfig);
exports.databaseFB = firebase.database();
exports.angularFireModule = angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routing_1.routing, exports.angularFireModule],
            declarations: [app_component_1.AppComponent, student_component_1.StudentComponent, teacher_component_1.TeacherComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [student_service_1.StudentService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map