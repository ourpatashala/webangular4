import {Component, OnInit, Input, Inject, PipeTransform, Pipe, Injector} from '@angular/core';
import {ViewChild} from '@angular/core';
import {SchoolService} from "../../service/school.service";
import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import {SchoolConverterImpl} from "../../adapter/impl/SchoolConverterImpl";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {SchoolConverter} from "../../adapter/interfaces/SchoolConverter";
import {SchoolComponentInterface} from "./SchoolComponentInterface";
import {jsonpFactory} from "@angular/http/src/http_module";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { DataTableDirective } from 'angular-datatables';
import {AngularFireAuth} from "angularfire2/auth";
import {Messages} from "../../constants/Messages";
import {Router} from "@angular/router";
import {ErrorService} from "../../service/error.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
declare var $: any;
import {Subject} from 'rxjs/Rx';
import {MessageTO} from "../../to/MessageTO";


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  providers: [SchoolService, {provide: 'SchoolConverter', useClass: SchoolConverterImpl}],
  styleUrls: ['./school.component.css']
})

export class SchoolComponent implements OnInit, SchoolComponentInterface {

  selectedSchoolArray: Array<any> = [];
  schoolProfileTO: SchoolProfileTO;
  schoolFormGroup: FormGroup;
  schoolProfileTOMap = new Map<string, SchoolProfileTO>();
  x: string;
  schoolProfileTOList: FirebaseListObservable<SchoolProfileTO>;
  errorMessage: string;
  sucessMessage: string;
  subscription: Subscription;
  message: string = '';
  checkedschoolid: string = "";
  temp_schoolid: string = 'default';
  angularFireAuth: AngularFireAuth;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  //dtTrigger = new Subject();
  dtTrigger: Subject<any> = new Subject();
  dtInstance: DataTables.Api;
  private updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Holds the error message
  active: string = "0";// for error and success divs;;  0 for no content, 1 for success, 2 for error
  div_Element_Id: string = "0";//for multiple pages in school list page;; 0 to show list of school , 1 to show add school, 2 to show edit school, 3 to show single school view.
  flag: boolean = false;
  popupstatus:string="0"; //0 for default close //1 for close and show listing
  updateMessage(message: string) { // updates the error message
    this.updateSubject.next(message);

  }

  update$: Observable<string> = this.updateSubject.asObservable(); // observer for the above message


  fb: FormBuilder;
  @Input() inputArray: ArrayType[];

  constructor(@Inject('SchoolConverter') private schoolConverter: SchoolConverter, fb: FormBuilder, private injector: Injector,private router: Router, private errorService: ErrorService, afAuth: AngularFireAuth) {
    this.fb = fb;
    this.angularFireAuth = afAuth;
    var username=localStorage.getItem('userlogin');
    console.log("user logged in "+username);
    if(username=="" || username=="Undefined" || username==null)
    {
      this.router.navigate(['/']);
    }




    this.subscription = this.update$.subscribe(message => {
      this.message = message;
    });
    this.schoolProfileTO=new SchoolProfileTO();
    this.getAllSchoolProfiles();




  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  public getRouter(): Router {
    return this.injector.get(Router);
  }


  ngOnInit() {
    this.schoolFormGroup = this.fb.group({
      schoolId: [''],
      schoolName: [''],
      schoolDisplayName: [''],
      contactName: [''],
      contactNumber: [''],
      addressOne: [''],
      addressTwo: [''],
      city: [''],
      state: [''],
      pincode: [''],
      country: [''],
      active: [''],
      schoolLogo: [''],
      remarks: ['']

    });


// row selection script
    // $(document).on('change', '#myTable tbody tr td input', function () {
    //   if ($(this).is(':checked')) {
    //     $(this).parent().parent().addClass('selected_row');
    //   } else {
    //     $(this).parent().parent().removeClass('selected_row');
    //   }
    // });
//    this.dtTrigger.next();
  }


  updateCheckedOptions(option) {
    this.temp_schoolid = option;
    console.log(option);
  }

  getselectedSchoolProfile() {
    console.log(this.selectedSchoolArray[0]);
    this.getSchoolProfile(this.selectedSchoolArray[0]);
    this.div_Element_Id = "2";
  }

  show_addSchoolFields() {
    this.div_Element_Id = "1";
    this.schoolFormGroup.controls['schoolId'].patchValue('');
    this.schoolFormGroup.controls['schoolName'].patchValue('');
    this.schoolFormGroup.controls['schoolDisplayName'].patchValue('');
    this.schoolFormGroup.controls['contactName'].patchValue('');
    this.schoolFormGroup.controls['contactNumber'].patchValue('');
    this.schoolFormGroup.controls['addressOne'].patchValue('');
    this.schoolFormGroup.controls['addressTwo'].patchValue('');
    //this.schoolFormGroup.controls['city'].patchValue(schoolProfileTO.city);
    this.schoolFormGroup.controls['city'].patchValue('');
    this.schoolFormGroup.controls['state'].patchValue('');
    this.schoolFormGroup.controls['pincode'].patchValue('');
    this.schoolFormGroup.controls['country'].patchValue('');
    this.schoolFormGroup.controls['active'].patchValue('');
    this.schoolFormGroup.controls['remarks'].patchValue('');
  }

  showSchoolsList() {
    if (this.selectedSchoolArray.length > 0) (<HTMLInputElement>document.getElementById(this.selectedSchoolArray[0])).checked = false;
    this.selectedSchoolArray = [];
    this.div_Element_Id = "0";
    this.errorMessage = "";
    this.active = "0";
    this.getAllSchoolProfiles();
  }

  /**
   * USed for adding school Profile.
   * @param value
   * @param valid
   */
  addSchoolProfile({value, valid}: { value: SchoolProfileTO, valid: boolean }) {
    var field_name = "";
    this.errorMessage = field_name;
    this.active = "0";
    if (value.schoolName == null || value.schoolName == "") {
      field_name = field_name + " School Name, ";
    }
    if (value.schoolDisplayName == null || value.schoolDisplayName == "") {
      field_name = field_name + " School Display Name, ";
    }
    if (value.city == null || value.city == "") {
      field_name = field_name + " City, ";
    }
    if (value.addressOne == null || value.addressOne == "") {
      field_name = field_name + " Address One, ";
    }
    // if (value.addressTwo == null || value.addressTwo == "") {
    //   field_name = field_name + " Address Two, ";
    // }
    if (value.state == null || value.state == "") {
      field_name = field_name + " State, ";
    }
    // if (value.pincode == null || value.pincode == "") {
    //   field_name = field_name + " Pincode, ";
    // }
    if (value.country == null || value.country == "") {
      field_name = field_name + " Country, ";
    }
    // if (value.contactName == null || value.contactName == "") {
    //   field_name = field_name + " Contact Name, ";
    // }
    // if (value.contactNumber == null || value.contactNumber == "") {
    //   field_name = field_name + " Contact Number, ";
    // }
    if (field_name.length != 0) {
      this.errorMessage = "Please enter" + field_name;
      this.active = "2";
    }
    else {
     console.log(this.schoolProfileTO.schoolId);
      this.schoolProfileTO = value;
      this.schoolConverter.addSchoolProfile(this.schoolProfileTO, this);

    }


  }


  /**
   * Used for getting the school profile.
   * @param schoolId
   */
  getSchoolProfile(schoolId: string) {
    this.schoolConverter.getSchoolProfile(schoolId, this);
    this.div_Element_Id = "3";
  }

  viewSingleSchoolProfile() {
    console.log(this.selectedSchoolArray[0]);
    this.getSchoolProfile(this.selectedSchoolArray[0]);
    this.div_Element_Id = "3";
  }

  getSchoolProfileRange(start: string, end: string) {
    this.schoolConverter.getSchoolProfileRange(start, end, this);

  }

  redirecttoschooldashboard(schoolId: string)
  {
    console.log("selected school id "+schoolId);
    console.log("old "+ localStorage.getItem('schoolid'));
    localStorage.setItem('schoolid',schoolId);
    console.log("New "+ localStorage.getItem('schoolid'));
    this.getRouter().navigate(['/TabService']);

    //="/TabService"
  }

  /**
   * Used for getting all school profile objects.
   */
  getAllSchoolProfiles() {
    this.schoolConverter.getAllSchoolProfile(this);
  }

  /**
   * Used for updating the school profile.
   * @param value
   * @param valid
   */
  updateSchoolProfile({value, valid}: { value: SchoolProfileTO, valid: boolean }) {
    var field_name = "";
    this.errorMessage = field_name;
    this.active = "0";
    // if (value.schoolId == null || value.schoolId == "") {
    //   field_name = field_name + " schoolId, ";
    // }
    if (value.schoolName == null || value.schoolName == "") {
      field_name = field_name + " School Name, ";
    }
    if (value.schoolDisplayName == null || value.schoolDisplayName == "") {
      field_name = field_name + " School Display Name, ";
    }
    if (value.city == null || value.city == "") {
      field_name = field_name + " City, ";
    }
    if (value.addressOne == null || value.addressOne == "") {
      field_name = field_name + " AddressOne, ";
    }
    // if (value.addressTwo == null || value.addressTwo == "") {
    //   field_name = field_name + " addressTwo, ";
    // }
    if (value.state == null || value.state == "") {
      field_name = field_name + " State, ";
    }
    // if (value.pincode == null || value.pincode == "") {
    //   field_name = field_name + " pincode, ";
    // }
    if (value.country == null || value.country == "") {
      field_name = field_name + " Country, ";
    }
    // if (value.contactName == null || value.contactName == "") {
    //   field_name = field_name + " contactName, ";
    // }
    // if (value.contactNumber == null || value.contactNumber == "") {
    //   field_name = field_name + " contactNumber, ";
    // }
    if (field_name.length != 0) {
      this.errorMessage = "Please enter" + field_name;
      this.active = "2";
    }
    else {
      this.schoolProfileTO = value;
      this.schoolConverter.updateSchoolProfile(this.schoolProfileTO, this);
      console.log("  this.schoolProfileTO.active ===>"+ this.schoolProfileTO.active);

    }
  }

  /**
   * Used for deleting the school profile.
   * @param schoolId
   */
  deleteSchoolProfile() {
    for (var loopvar = 0; loopvar < this.selectedSchoolArray.length; loopvar++) {
      console.log(this.selectedSchoolArray[loopvar]);
      //this.schoolConverter.deleteSchoolProfile(this.selectedSchoolArray[loopvar]);
    }


  }

  /**
   * Used for getting the school Object.
   * @param schoolId
   */
  displaySchoolProfileCallBack(schoolProfileTO: SchoolProfileTO) {
    console.log(" displaySchoolProfileCallBack "+schoolProfileTO);
    this.schoolProfileTO = schoolProfileTO;
    this.schoolFormGroup.controls['schoolId'].patchValue(schoolProfileTO.schoolId);
    this.schoolFormGroup.controls['schoolName'].patchValue(schoolProfileTO.schoolName);
    this.schoolFormGroup.controls['schoolDisplayName'].patchValue(schoolProfileTO.schoolDisplayName);
    this.schoolFormGroup.controls['contactName'].patchValue(schoolProfileTO.contactName);
    this.schoolFormGroup.controls['contactNumber'].patchValue(schoolProfileTO.contactNumber);
    this.schoolFormGroup.controls['addressOne'].patchValue(schoolProfileTO.addressOne);
    this.schoolFormGroup.controls['addressTwo'].patchValue(schoolProfileTO.addressTwo);
    //this.schoolFormGroup.controls['city'].patchValue(schoolProfileTO.city);
    this.schoolFormGroup.controls['city'].patchValue(schoolProfileTO.country);
    this.schoolFormGroup.controls['state'].patchValue(schoolProfileTO.state);
    this.schoolFormGroup.controls['pincode'].patchValue(schoolProfileTO.pincode);
    this.schoolFormGroup.controls['country'].patchValue(schoolProfileTO.country);
    this.schoolFormGroup.controls['active'].patchValue(schoolProfileTO.active);
    this.schoolFormGroup.controls['remarks'].patchValue(schoolProfileTO.remarks);

  }

  /**
   * Used for displaying all school profile objects.
   * @param schoolProfileTO
   */
  displayAllSchoolProfileCallBack(schoolProfileTOList: FirebaseListObservable<SchoolProfileTO>) {
    this.schoolProfileTOList = schoolProfileTOList;
    this.schoolProfileTOList.forEach(schoolProfileTO => {
      console.log('SchoolProfileTO:', schoolProfileTO);
     // this.schoolProfileTO = schoolProfileTO;
    });
   // dtInstance.destroy();
   //this.dtTrigger.();
   this.rerender();

  }

  successMessageCallBack(messageTO:MessageTO) {
    console.log("successMessageCallBack ==>" + messageTO.messageInfo+"  "+ messageTO.messageType+"  "+messageTO.serviceClassName+"  "+messageTO.serviceMethodName);
    //console.log("*** successMessageCallBack ==>" + messageTO.messageInfo);
    if(messageTO.serviceMethodName == "searchAndAddSchoolProfile()")
    this.schoolFormGroup.reset();
    else if(messageTO.serviceMethodName == "updateSchoolProfile()")
    {
      //this.showSchoolsList();
    }


    //TODO Shiva - commented  to compile the code. Please fix it.
    /*this.sucessMessage = message1;
    if (message1.length != 0) {
      this.active = "1";
    } else {
      this.active = "0";
    }
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.sucessMessage = "";
      this.active = "0";
    }, 2000);
    */
    this.setUserSuccessMessageonUI(messageTO.messageInfo);
  }

  /**
   * Handle all the error messages here . Basing on the error message decide where you want to display
   * the Error Message, Also if required you can recirect to any page basing on the navigate method
   * given below.
   *
   * @param message
   */
  errorMessageCallBack(messageTO:MessageTO) {
    console.log("errorMessageCallBack ==>" + messageTO.messageInfo);
    //TODO Shiva - commented  to compile the code. Please fix it.
    this.errorMessage = messageTO.messageInfo;
    //this.schoolFormGroup.reset();
    this.updateMessage(this.errorMessage);
    this.getRouter().navigate(['/School']);
    if (messageTO.messageInfo.length != 0) {
      this.active = "2";
    } else {
      this.active = "0";
    }
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.errorMessage = "";
      this.active = "0";
    }, 2000);

  }

  closePopup()
  {
    this.sucessMessage = "";
    this.active = "0";
  }

  setUserSuccessMessageonUI(message: string) {
    this.sucessMessage = message;
    this.active = "1";
    // setTimeout(() => {
    //   this.sucessMessage = "";
    //   this.active = "0";
    // }, 2000);
  }

  setUserErrorMessageonUI(message: string) {
    this.errorMessage = message;
    this.active = "2";
    setTimeout(() => {
      this.errorMessage = "";
      this.active = "0";
    }, 2000);
  }

  checkedStudents(value) {
    console.log(value);
    if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
      this.selectedSchoolArray.push(value);
    } else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
      let indexx = this.selectedSchoolArray.indexOf(value);
      this.selectedSchoolArray.splice(indexx, 1)
    }
    console.log(this.selectedSchoolArray)
  }
  rerender(): void {
    console.log("render call "+this.flag);
    if(!this.flag && this.dtElement!=null)  {
      this.flag=true;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        console.log("shiva");
        this.dtTrigger.next();
        this.flag=false;
      });
    }
  }

}
