/**
 * Created by ravisha on 3/25/17.
 */
/**
 * Created by ravisha on 3/11/17.
 */
import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'

import { StudentComponent } from './component/student/student.component';
import { TeacherComponent } from './component/teacher/teacher.component';
import { SchoolComponent } from './component/school/school.component';
import { HeaderAdminComponent } from './component/header-admin/header-admin.component';


import { ErrorComponent } from './component/error/error.component';

const appRoutes: Routes = [
  {
    path:'',
    component: SchoolComponent
  },
  {
    path:'student',
    component: StudentComponent
  },

  {
    path:'teacher',
    component: TeacherComponent
  },
  {
    path:'error',
    component: ErrorComponent  
  },
  {
    path:'school',
    component: SchoolComponent
  },



]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


