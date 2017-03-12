import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { StudentComponent } from './components/student.component';
import { TeacherComponent } from './components/teacher.component';
import {routing} from './app.routing';

@NgModule({
  imports:      [ BrowserModule , FormsModule , routing],
  declarations: [ AppComponent, StudentComponent, TeacherComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
