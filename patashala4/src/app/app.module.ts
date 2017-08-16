import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SchoolComponent } from './component/school/school.component';
import {Routes, RouterModule} from "@angular/router";
import {routing} from './app.routing';
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AppConstants} from "./constants/AppConstants";
import {ErrorService} from "./service/error.service";
import {PathUtil} from "./util/PathUtil";
import {HeaderAdminComponent} from "./component/header-admin/header-admin.component";


export const firebaseConfig = {     apiKey: 'AIzaSyB6WeGfORqOzz5jT_XL6GLMCl8zeQqORHU',     authDomain: 'devpatashala-4e257.firebaseapp.com',     databaseURL: 'https://devpatashala-4e257.firebaseio.com',     storageBucket: 'devpatashala-4e257.appspot.com',     messagingSenderId: '857631726201' };



@NgModule({
  declarations: [
    AppComponent,
    SchoolComponent,
    HeaderAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [AppConstants,ErrorService,PathUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }