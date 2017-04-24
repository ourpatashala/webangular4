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
import {StudentService} from "./service/student.service";

import * as firebase from "firebase";


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
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    angularFireModule,
    HttpModule
  ],
  providers:[StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
