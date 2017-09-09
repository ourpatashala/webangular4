/**
 * Created by ravisha on 3/25/17.
 */
/**
 * Created by ravisha on 3/11/17.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { SchoolComponent } from './component/school/school.component';
import { LoginComponent } from './component/login/login.component';
import { StudentComponent } from './component/student/student.component';
import { ForgotpasswordComponent } from './component/login/forgotpassword.component';
import { RegisterationComponent } from './component/login/registeration.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'School', component: StudentComponent },
  { path: 'Registration', component: RegisterationComponent},
  { path: 'Forgotpassword', component: ForgotpasswordComponent},
  { path: 'Student', component: StudentComponent}

];




export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


