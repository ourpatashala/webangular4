import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {ReactiveFormsModule} from "@angular/forms";



import { AppComponent } from './app.component';
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

import {AppConstants} from './constants/AppConstants';
import {PathUtil} from "./util/PathUtil";

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
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    angularFireModule,
    HttpModule
  ],
  providers:[AppConstants,PathUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
