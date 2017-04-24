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

const appRoutes: Routes = [
  {
    path:'',
    component: StudentComponent
  },
  {
    path:'student',
    component: StudentComponent
  },

  {
    path:'teacher',
    component: TeacherComponent
  }

]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


