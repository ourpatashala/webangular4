import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { SchoolComponent } from './component/school/school.component';
import { Routes, RouterModule } from "@angular/router";
import { routing } from './app.routing';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

//import { DatePickerModule } from 'angular-io-datepicker';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AppConstants} from "./constants/AppConstants";
import {ErrorService} from "./service/error.service";
import { LoginService } from "./service/login.service";
import {PathUtil} from "./util/PathUtil";
import {HeaderAdminComponent} from "./component/header-admin/header-admin.component";
import { Header1Component } from "./component/header1/header1.component";
import { LoginComponent } from './component/login/login.component';
import { ForgotpasswordComponent } from './component/login/forgotpassword.component';
import { RegisterationComponent } from './component/login/registeration.component';
import { StudentComponent } from './component/student/student.component';
import { HeaderComponent } from './component/header/header.component';
import { TabServiceComponent } from './component/tab-service/tab-service.component';
import { TabManageComponent } from './component/tab-manage/tab-manage.component';
import {FormUploadComponent} from './component/form-upload/form-upload.component';
import {UploadFileService} from './service/upload-file.service';
import {StudentService} from './service/student.service';

import { NgDatepickerModule } from 'ng2-datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { ClassselectionPopupComponent } from './component/popup-screens/classselection-popup/classselection-popup.component';
import { WebcampopupComponent } from './component/popup-screens/webcampopup/webcampopup.component';

import { MastersubjectComponent } from './component/mastersubject/mastersubject.component';
import { MasterSyllabusComponent } from './component/master-syllabus/master-syllabus.component';
import { MasterCourseComponent } from './component/master-course/master-course.component';

import { WebCamModule } from 'ack-angular-webcam';
import { SyllbusPopupComponent } from './component/popup-screens/syllbus-popup/syllbus-popup.component';
import { ManageTimetableComponent } from './component/manage-timetable/manage-timetable.component';
import { ManageClassesComponent } from './component/manage-classes/manage-classes.component';
import { ManageCalendarComponent } from './component/manage-calendar/manage-calendar.component';
import { ManageContactsComponent } from './component/manage-contacts/manage-contacts.component';
import { ManageFeesComponent } from './component/manage-fees/manage-fees.component';
import { ManageBannerComponent } from './component/manage-banner/manage-banner.component';
import { ManageDocumentsComponent } from './component/manage-documents/manage-documents.component';
import { ManageTeacherComponent } from './component/manage-teacher/manage-teacher.component';
import { ManageUserComponent } from './component/manage-user/manage-user.component';
import { ManageParentaskComponent } from './component/manage-parentask/manage-parentask.component';
import { ManageSettingComponent } from './component/manage-setting/manage-setting.component';
import { ManageRolesComponent } from './component/manage-roles/manage-roles.component';
import { ManareReassignclassComponent } from './component/manare-reassignclass/manare-reassignclass.component';



export const firebaseConfig = {     apiKey: 'AIzaSyB6WeGfORqOzz5jT_XL6GLMCl8zeQqORHU',     authDomain: 'devpatashala-4e257.firebaseapp.com',     databaseURL: 'https://devpatashala-4e257.firebaseio.com',     storageBucket: 'devpatashala-4e257.appspot.com',     messagingSenderId: '857631726201' };



@NgModule({
  declarations: [
    AppComponent,
    SchoolComponent,
    HeaderAdminComponent,
    LoginComponent,
    ForgotpasswordComponent,
    RegisterationComponent,
    Header1Component,
    StudentComponent,
    HeaderComponent,
    TabServiceComponent,
    TabManageComponent,
    FormUploadComponent,
    ClassselectionPopupComponent,
    WebcampopupComponent,
    MastersubjectComponent,
    MasterSyllabusComponent,
    MasterCourseComponent,
    SyllbusPopupComponent,
    ManageTimetableComponent,
    ManageClassesComponent,
    ManageCalendarComponent,
    ManageContactsComponent,
    ManageFeesComponent,
    ManageBannerComponent,
    ManageDocumentsComponent,
    ManageTeacherComponent,
    ManageUserComponent,
    ManageParentaskComponent,
    ManageSettingComponent,
    ManageRolesComponent,
    ManareReassignclassComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    WebCamModule,
    NgDatepickerModule ,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],


  providers: [AppConstants,ErrorService,PathUtil,LoginService, UploadFileService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
