import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";



@Component({
    selector: 'app-login',
    templateUrl: './registeration.component.html',
   // providers: [{provide: 'LoginConverter', useClass: LoginConverterImpl}],
    styleUrls: ['./login.component.css']
  })


  
export class RegisterationComponent implements OnInit {
  userForm: any;
    constructor(){
      this.userForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        Confirmpassword: new FormControl()
     });

    }
      ngOnInit() {
      }

      
      userReg()
      {

      }

  }