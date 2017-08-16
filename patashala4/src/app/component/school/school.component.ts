import {Component, OnInit, Input, Inject, PipeTransform, Pipe, Injector} from '@angular/core';
import {SchoolService} from "../../service/school.service";
import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import {SchoolConverterImpl} from "../../adapter/impl/SchoolConverterImpl";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {SchoolConverter} from "../../adapter/interfaces/SchoolConverter";
import {SchoolComponentInterface} from "./SchoolComponentInterface";
import {jsonpFactory} from "@angular/http/src/http_module";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {AngularFireAuth} from "angularfire2/auth";

import {Messages} from "../../constants/Messages";
import {Router} from "@angular/router";
import {ErrorService} from "../../service/error.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
declare var $:any;


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  providers: [SchoolService,{provide: 'SchoolConverter', useClass: SchoolConverterImpl}],
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit,SchoolComponentInterface {

  schoolProfileTO: SchoolProfileTO;
  schoolFormGroup: FormGroup;
  schoolProfileTOMap = new Map<string,SchoolProfileTO>();
  x:string;
  schoolProfileTOList:FirebaseListObservable<SchoolProfileTO>;
  errorMessage:string;
  subscription: Subscription;
  message: string = '';
  angularFireAuth: AngularFireAuth;


  private updateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Holds the error message



  updateMessage(message: string) { // updates the error message
    this.updateSubject.next(message);

  }

  update$: Observable<string> = this.updateSubject.asObservable(); // observer for the above message


  fb: FormBuilder;
  @Input() inputArray: ArrayType[];

  constructor(@Inject('SchoolConverter') private schoolConverter: SchoolConverter, fb: FormBuilder, private injector: Injector,private errorService: ErrorService,afAuth:AngularFireAuth) {
    this.fb = fb;
    this.angularFireAuth = afAuth;

    this.subscription = this.update$.subscribe(
      message => {
        this.message = message;
      });


  }

  public getRouter():Router{
    return this.injector.get(Router);
  }


  ngOnInit() {
    this.schoolFormGroup = new FormGroup(
      {
        schoolId: new FormControl('ww'),
        schoolName: new FormControl('schoolName'),
        schoolDisplayName: new FormControl('displaySchool'),
        contactName: new FormControl('ww'),
        contactNumber: new FormControl('ww'),
        addressOne: new FormControl('ww'),
        addressTwo: new FormControl('ww'),
        city: new FormControl('ww'),
        state: new FormControl('ww'),
        pincode: new FormControl('ww'),
        country: new FormControl('ww'),
        active: new FormControl('ww'),
        schoolLogo: new FormControl('ww'),
        remarks: new FormControl('ww')

      })



    // all datatables script
    $(document).ready(function(){
      $('#myTable').DataTable();

      $('.dataTables_wrapper').css('overflow-x', 'hidden');
      $('.my_table_width tbody tr td').slice(2, 6).css('cursor','pointer');
    });
    // $('.my_table_width tbody tr td').slice(2, 6).on('click',function(){
    // var alksd=$(this).parent().data("refid");
    // window.open('#/ManageSchoolDetails','_self');
    // });

// row selection script
    $('#myTable tbody tr td input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent().parent().addClass('selected_row');
      }
      else {
        $(this).parent().parent().removeClass('selected_row');
      }
    });


// show and hide fields scripts
    $('.add_more_btn').on('click',function(){
      $('.add_fields').slideDown();
      $('.datatable_toggle').slideUp();
      $('.buttons_div').fadeOut();
    });
    $('.cancel_btn_add').on('click',function(){
      $('.add_fields').slideUp();
      $('.add_fields input').val('');
      $('.datatable_toggle').slideDown();
      $('.buttons_div').fadeIn();
    });

    $('.edit_field_btn').on('click',function(){
      $('.modify_fields').slideDown();
      $('.datatable_toggle').slideUp();
      $('.buttons_div').fadeOut();
    });
    $('.cancel_btn_modify').on('click',function(){
      $('.modify_fields').slideUp();
      $('.modify_fields input').val('');
      $('.datatable_toggle').slideDown();
      $('.buttons_div').fadeIn();
    });






  }


  /**
   * USed for adding school Profile.
   * @param value
   * @param valid
   */
  addSchoolProfile({value, valid}: {value: SchoolProfileTO, valid: boolean}) {
    this.schoolProfileTO = value;
    //console.log(this.schoolProfileTO);

    //throw new SchoolError("Error from Component..");
    // this.schoolConverter.addSchoolProfile(this.schoolProfileTO, this);
    //this.signup();
    this.deleteSchoolProfile(this.schoolProfileTO.schoolId);

    //this.getSchoolProfile("school01");
    //this.deleteSchoolProfile("-KqaGGoSBQhYT0tU7qAf");
    // this.getSchoolProfileRange("1","2");
    //this.getAllSchoolProfiles();
    // this.searchSchoolProfile("sa");
  }


  /**
   * Used for getting the school profile.
   * @param schoolId
   */
  getSchoolProfile(schoolId:string){
    this.schoolConverter.getSchoolProfile(schoolId,this);
  }

  getSchoolProfileRange(start:string,end:string){
    this.schoolConverter.getSchoolProfileRange(start,end,this);

  }


  /**
   * Used for getting all school profile objects.
   */
  getAllSchoolProfiles(){
    this.schoolConverter.getAllSchoolProfile(this);
  }

  /**
   * Used for updating the school profile.
   * @param value
   * @param valid
   */
  updateSchoolProfile({value, valid}: {value: SchoolProfileTO, valid: boolean}) {
    this.schoolProfileTO = value;
    this.schoolConverter.updateSchoolProfile( this.schoolProfileTO,this);
  }

  /**
   * Used for deleting the school profile.
   * @param schoolId
   */
  deleteSchoolProfile(schoolId:string){
    this.schoolConverter.deleteSchoolProfile(schoolId);
  }

  /**
   * Used for getting the school Object.
   * @param schoolId
   */
  displaySchoolProfileCallBack(schoolProfileTO:SchoolProfileTO){
    console.log("Response from callback method.."+schoolProfileTO.contactName);
  }


  /**
   * Used for displaying all school profile objects.
   * @param schoolProfileTO
   */
  displayAllSchoolProfileCallBack(schoolProfileTOList:FirebaseListObservable<SchoolProfileTO>){
    this.schoolProfileTOList = schoolProfileTOList;
    this.schoolProfileTOList.forEach(schoolProfileTO => {
      console.log('SchoolProfileTO:', schoolProfileTO);
    });
  }

  successMessageCallBack(message:string){
    console.log(message);
  }

  /**
   * Handle all the error messages here . Basing on the error message decide where you want to display
   * the Error Message, Also if required you can recirect to any page basing on the navigate method
   * given below.
   *
   * @param message
   */
  errorMessageCallBack(message:string){
    console.log("error message call back..")
    this.errorMessage = message;
    //this.schoolFormGroup.reset();
    this.updateMessage(this.errorMessage);
    this.getRouter().navigate(['']);
  }


  signup() {
    //  const credential = this.angularFireAuth.auth..credential(email, password);
    //var credential : EmailPasswordCredentials = { email : 'test@test.com', password: '12345' };
    console.log("signup...")
    console.log(this.angularFireAuth );

    //this.angularFireAuth.createUser('ravi@gmail.com','Welcome1',false);

    /*
    this.angularFireAuth.createUser({
      email: 'helloravisha@gmail.com',
      password: 'Welcome1'
    }).then(
      (success) => {
        // this.router.navigate(['/members'])
      }).catch(
      (err) => {
        //this.error = err;
      })*/


    var emailAddress = "user@example.com";



  }

}


