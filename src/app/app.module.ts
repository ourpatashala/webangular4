import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {ReactiveFormsModule} from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';




import {AppComponent, KeysPipe} from './app.component';
import {routing} from './app.routing';
import { ExamComponent } from './component/exam/exam.component';
import { StudentComponent } from './component/student/student.component';
import { TeacherComponent } from './component/teacher/teacher.component';

import * as firebase from "firebase";
import { BannerComponent } from './component/banner/banner.component';
import { ContactComponent } from './component/contact/contact.component';
import { DocumentComponent } from './component/document/document.component';
import { EventComponent } from './component/event/event.component';
import { FeesComponent } from './component/fees/fees.component';
import { MessageComponent } from './component/message/message.component';
import { ResultComponent } from './component/result/result.component';
import { SubjectComponent } from './component/subject/subject.component';
import CommonErrorHandler from "./error/handler/CommonErrorHandler";

import { NotificationService } from './error/handler/NotificationService';

import {AppConstants} from './constants/AppConstants';
import {PathUtil} from "./util/PathUtil";
import { ErrorComponent } from './component/error/error.component';
import {ErrorService} from "./service/error.service";
import { SchoolComponent } from './component/school/school.component';
import { HeaderAdminComponent } from './component/header-admin/header-admin.component';
import {NgPipesModule} from "ngx-pipes";


export const firebaseConfig = {     apiKey: 'AIzaSyB6WeGfORqOzz5jT_XL6GLMCl8zeQqORHU',     authDomain: 'devpatashala-4e257.firebaseapp.com',     databaseURL: 'https://devpatashala-4e257.firebaseio.com',     storageBucket: 'devpatashala-4e257.appspot.com',     messagingSenderId: '857631726201' };

firebase.initializeApp(firebaseConfig);
export var databaseFB =  firebase.database();

export const angularFireModule =  AngularFireModule.initializeApp(firebaseConfig);




@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    TeacherComponent,
    ExamComponent,
    StudentComponent,
    TeacherComponent,
    BannerComponent,
    BannerComponent,
    ContactComponent,
    DocumentComponent,
    EventComponent,
    FeesComponent,
    MessageComponent,
    ResultComponent,
    SubjectComponent,
    ErrorComponent,
    SchoolComponent,
    HeaderAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    angularFireModule,
    NgPipesModule,

    HttpModule
  ],
  providers:[AppConstants,ErrorService,PathUtil,NotificationService,{ provide: ErrorHandler, useClass: CommonErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
