import {Component, OnInit, Input, Inject} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {StudentConverter} from "../../adapter/interfaces/StudentConverter";
import {
  FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl
}
  from '@angular/forms';
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {StudentConverterImpl} from "../../adapter/StudentConverterImpl";
import {StudentTO} from "../../to/StudentTO";



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [StudentService, { provide: 'StudentConverter', useClass: StudentConverterImpl }],

  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentTO:StudentTO;
  studentFormGroup: FormGroup;
  errorMessage:string;
  fb:FormBuilder;
   @Input() inputArray: ArrayType[];

   constructor(@Inject('StudentConverter') private studentConverter:StudentConverter,private studentService: StudentService,fb: FormBuilder) {
     this.fb = fb;
   }

  ngOnInit() {
    this.studentFormGroup = new FormGroup(
      {
        lastName:new FormControl(''),
        schoolId:new FormControl(''),
        firstName  :new FormControl(''),
        middleName :new FormControl(''),
        dob  :new FormControl(''),
        id  :new FormControl(''),
        gender:new FormControl(''),
        fatherName:new FormControl(''),
        motherName:new FormControl(''),
        remarks:new FormControl(''),
        schoolName:new FormControl(''),
        className:new FormControl(''),
        profilePhotoUrl:new FormControl(''),
        bloodGroup:new FormControl(''),
        classId:new FormControl(''),

        phoneNumbers: this.fb.array([
          this.initPhoneNumbers(),
        ]),


        siblings: this.fb.array([
          this.initSiblings(),
        ]),



        address:new FormGroup({
          city: new FormControl(''),
          doorNo:new FormControl('')
        })
      }
    );




  }


  addPhoneNumbers() {
    const control = <FormArray>this.studentFormGroup.controls['phoneNumbers'];
    control.push(this.initPhoneNumbers());
}



  addSiblings() {
    const control = <FormArray>this.studentFormGroup.controls['siblings'];
    control.push(this.initSiblings());
  }



  initPhoneNumbers() {
    // initialize our address
    return this.fb.group({
       phoneNumber: ['']
    });
  }


  initSiblings() {
    // initialize our address
    return this.fb.group({
      type: [''],
      value: ['']
    });
  }


  getStudentProfile(schoolId:string,studentId:string){
    var studentInfo =  this.studentService.getStudentProfile(schoolId,studentId);
    studentInfo.subscribe(snapshot => {
      console.log(snapshot);
    Object.keys(snapshot).forEach(key=> {
        console.log(snapshot[key])  ;
      });
   });

  }

  addStudentProfile({ value, valid }: { value: StudentTO, valid: boolean }) {
    this.studentTO = value;
    this.studentConverter.addStudentProfile(this.studentTO.schoolId,this.studentTO);
  }

}
