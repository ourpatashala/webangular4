/**
 * Created by ravisha on 3/25/17.
 */
/**
 * Created by ravisha on 3/11/17.
 */
import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'



import { SchoolComponent } from './component/school/school.component';





const appRoutes: Routes = [
  {
    path:'',
    component: SchoolComponent
  },

]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


