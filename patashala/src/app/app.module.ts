import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';


import {StudentService } from './services/student.service'
import { AppComponent }  from './app.component';
import { StudentComponent } from './components/student.component';
import { TeacherComponent } from './components/teacher.component';
import {routing} from './app.routing';


export const firebaseConfig = {     apiKey: 'AIzaSyB6WeGfORqOzz5jT_XL6GLMCl8zeQqORHU',     authDomain: 'devpatashala-4e257.firebaseapp.com',     databaseURL: 'https://devpatashala-4e257.firebaseio.com',     storageBucket: 'devpatashala-4e257.appspot.com',     messagingSenderId: '857631726201' };

firebase.initializeApp(firebaseConfig);
export var databaseFB =  firebase.database();

export const angularFireModule =  AngularFireModule.initializeApp(firebaseConfig);

@NgModule({
  imports:      [ BrowserModule , FormsModule , routing, angularFireModule],
  declarations: [ AppComponent, StudentComponent, TeacherComponent ],
  bootstrap:    [ AppComponent ],
    providers:[StudentService]
})

export class AppModule { }
