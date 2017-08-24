import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";



@Component({
    selector: 'app-login',
    templateUrl: './forgotpassword.component.html',
   // providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
    styleUrls: ['./login.component.css']
  })


  export class ForgotpasswordComponent implements OnInit {
    userForm: any;


    constructor(){
      this.userForm = new FormGroup({
        username: new FormControl(),
        reUsername: new FormControl()
     });
    }

      ngOnInit() {
      }

      userForPwd()
      {
        
      }
  }