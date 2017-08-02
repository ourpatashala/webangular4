import {Component, OnInit, Input, Inject, PipeTransform, Pipe} from '@angular/core';
import {SchoolService} from "../../service/school.service";
import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import {SchoolConverterImpl} from "../../adapter/SchoolConverterImpl";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ArrayType} from "@angular/compiler/src/output/output_ast";
import {SchoolConverter} from "../../adapter/interfaces/SchoolConverter";
import {SchoolComponentInterface} from "./SchoolComponentInterface";
import {jsonpFactory} from "@angular/http/src/http_module";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
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
  //obj:FirebaseListObservable<any>;
  schoolProfileTOList:FirebaseListObservable<SchoolProfileTO>;





  errorMessage: string;
  fb: FormBuilder;
  @Input() inputArray: ArrayType[];

  constructor(@Inject('SchoolConverter') private schoolConverter: SchoolConverter, fb: FormBuilder) {
    this.fb = fb;


  }




  ngOnInit() {
    this.schoolFormGroup = new FormGroup(
      {
        schoolId: new FormControl(''),
        schoolName: new FormControl(''),
        schoolDisplayName: new FormControl(''),
        contactName: new FormControl(''),
        contactNumber: new FormControl(''),
        addressOne: new FormControl(''),
        addressTwo: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        pincode: new FormControl(''),
        country: new FormControl(''),
        active: new FormControl(''),
        schoolLogo: new FormControl(''),
        remarks: new FormControl('')

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
    console.log(this.schoolProfileTO);
     this.schoolConverter.addSchoolProfile( this.schoolProfileTO,this);
    //this.getSchoolProfile("school01");
    //this.deleteSchoolProfile("school03");
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


}



