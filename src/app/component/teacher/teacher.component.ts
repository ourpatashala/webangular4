import {Component, OnInit, Input, Inject} from '@angular/core';
import {
  FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl
}
  from '@angular/forms';
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {TeacherConverterImpl} from "../../adapter/TeacherConverterImpl";
import {TeacherTO} from "../../to/TeacherTO";
import {TeacherConverter} from "../../adapter/interfaces/TeacherConverter";
import {TeacherService} from "../../service/teacher.service";


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  providers: [TeacherService,{provide: 'TeacherConverter', useClass: TeacherConverterImpl}],

  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacherTO: TeacherTO;
  teacherFormGroup: FormGroup;
  errorMessage: string;
  fb: FormBuilder;
  @Input() inputArray: ArrayType[];

  constructor(@Inject('TeacherConverter') private teacherConverter: TeacherConverter, fb: FormBuilder) {
    this.fb = fb;
  }

  ngOnInit() {
    this.teacherFormGroup = new FormGroup(
      {
        lastName: new FormControl(''),
        schoolId: new FormControl(''),
        firstName: new FormControl(''),
        middleName: new FormControl(''),
        id: new FormControl(''),
        profilePic: new FormControl(''),
        classTeacher: new FormControl(''),
        contactNumber: new FormControl(''),
        qualification: new FormControl(''),
        address: new FormGroup({
          city: new FormControl(''),
          doorNo: new FormControl('')
        })
      }
    );


  }


  /**
   * USed for adding teacher Profile.
   * @param value
   * @param valid
   */
  addTeacherProfile({value, valid}: {value: TeacherTO, valid: boolean}) {
    this.teacherTO = value;
    this.teacherConverter.addTeacherProfile(this.teacherTO.schoolId, this.teacherTO);
  }


}

