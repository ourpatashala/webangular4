/**
 * Created by ravisha on 3/11/17.
 */
import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'


import {StudentComponent} from './components/student.component'
import {TeacherComponent} from './components/teacher.component'

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

