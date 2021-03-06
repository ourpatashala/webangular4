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
  { path: 'Manageclasses',component:ManageClassesComponent},
  { path: 'ManageCalendar',component:ManageCalendarComponent},
  { path: 'ManageContact',component:ManageContactsComponent},
  { path: 'ManageFees',component:ManageFeesComponent},
  { path: 'ManageBanner',component:ManageBannerComponent},
  { path: 'ManageDocuments',component:ManageDocumentsComponent},
  { path: 'Manageteacher',component:ManageTeacherComponent},
  { path: 'ManageUser',component:ManageUserComponent},
  { path: 'ParentAskCategories',component:ManageParentaskComponent},
  { path: 'ManageSettings',component:ManageSettingComponent},
  { path: 'ManageRoles',component:ManageRolesComponent},
  { path: 'ReassignStudentToNewClass',component:ManareReassignclassComponent},
];




export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


