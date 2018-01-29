/**
 * Created by ravisha on 3/25/17.
 */
/**
 * Created by ravisha on 3/11/17.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { SchoolComponent } from './component/school/school.component';
import { MastersubjectComponent } from './component/mastersubject/mastersubject.component';
import { MasterSyllabusComponent } from './component/master-syllabus/master-syllabus.component';
import { MasterCourseComponent } from './component/master-course/master-course.component';



import { LoginComponent } from './component/login/login.component';
import { ForgotpasswordComponent } from './component/login/forgotpassword.component';
import { RegisterationComponent } from './component/login/registeration.component';
import { StudentComponent } from './component/student/student.component';
import { TabServiceComponent } from './component/tab-service/tab-service.component';
import { TabManageComponent } from './component/tab-manage/tab-manage.component';
import { ManageTimetableComponent } from './component/manage-timetable/manage-timetable.component';
import { ManageClassesComponent } from './component/manage-classes/manage-classes.component';



const appRoutes: Routes = [
  { path:'', component:LoginComponent },
  { path:'School', component: SchoolComponent },
  { path: 'Registration', component: RegisterationComponent},
  { path: 'Forgotpassword', component: ForgotpasswordComponent},
  { path: 'Students', component: StudentComponent},
  { path: 'TabService',component:TabServiceComponent},
  { path: 'TabManage',component:TabManageComponent},
  { path: 'Mastercourse',component:MasterCourseComponent},
  { path: 'Mastersubject',component:MastersubjectComponent},
  { path: 'Mastersyllabus',component:MasterSyllabusComponent},
  { path: 'ManageTimeTable',component:ManageTimetableComponent},
  { path: 'Manageclasses',component:ManageClassesComponent}
];




export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


