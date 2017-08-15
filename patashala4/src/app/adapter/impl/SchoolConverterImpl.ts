/**
 * Created by ravisha on 7/3/17.
 */
import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {SchoolConverter} from "../interfaces/SchoolConverter";
import {SchoolProfileTO} from "../../to/SchoolProfileTO";
import {SchoolService} from "../../service/school.service";
import {SchoolProfileVO} from "../../vo/SchoolProfileVO";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {SchoolComponentInterface} from "../../component/school/SchoolComponentInterface";
/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class SchoolConverterImpl extends CommonConverter implements SchoolConverter {
  schoolProfileVO: SchoolProfileVO;
  //schoolProfileTO:SchoolProfileTO;


  constructor(private schoolService: SchoolService) {
    super()
  }

  /**
   * Decide your unqiue key here.
   * @param schoolProfileTO
   * @returns {string}
   */
  getUniqueKey(schoolProfileTO: SchoolProfileTO){
    return schoolProfileTO.schoolName+schoolProfileTO.schoolDisplayName;
  }

  /**
   * This method is a converter from TO to VO. Always ensure that unique key is assigned  properly.
   * @param schoolProfileTO
   * @returns {SchoolProfileVO}
   */
  getVOFromTO(schoolProfileTO: SchoolProfileTO):SchoolProfileVO{
    var schoolProfileVO  = new SchoolProfileVO();
    schoolProfileVO.schoolId = schoolProfileTO.schoolId;
    schoolProfileVO.schoolName = schoolProfileTO.schoolName;
    schoolProfileVO.schoolDisplayName = schoolProfileTO.schoolDisplayName;
    schoolProfileVO.state = schoolProfileTO.state;
    schoolProfileVO.country = schoolProfileTO.country;
    schoolProfileVO.addressOne = schoolProfileTO.addressOne;
    schoolProfileVO.addressTwo = schoolProfileTO.addressTwo;
    schoolProfileVO.pincode = schoolProfileTO.pincode;
    schoolProfileVO.remarks = schoolProfileTO.remarks;
    schoolProfileVO.uniqueId = this.getUniqueKey(schoolProfileTO);
    console.log("Unique Key.."+schoolProfileVO.uniqueId);

    console.log("in converter impl"+schoolProfileVO.state);
    return schoolProfileVO;
  }

  /**
   * Used for adding the school profile.
   * @param schoolProfileTO
   * @param schoolComponentInterface
   */
  addSchoolProfile(schoolProfileTO: SchoolProfileTO,schoolComponentInterface:SchoolComponentInterface){
    try{
        this.schoolService.addSchoolProfile( this.getVOFromTO(schoolProfileTO),schoolComponentInterface);
    }catch(schoolError){
       throw schoolError;
    }
  }


  getSchoolProfile(schoolId:string,schoolComponentInterface:SchoolComponentInterface){
    var schoolProfileTO=  new SchoolProfileTO();
    var schoolObject = this.schoolService.getSchoolProfile(schoolId);
    schoolObject.subscribe(snapshot => {
      schoolProfileTO = snapshot;
      schoolComponentInterface.displaySchoolProfileCallBack(schoolProfileTO);
    });
  }

  getSchoolProfileRange(start:string,end:string,schoolComponentInterface:SchoolComponentInterface){
    var schoolProfileTO=  new SchoolProfileTO();
    var schoolObject = this.schoolService.getSchoolProfileRange(start,end);


  }



  /**
   * Used for getting the list of all schools.
   * @param schoolComponentInterface
   */
  getAllSchoolProfile(schoolComponentInterface:SchoolComponentInterface){
    var objData:FirebaseListObservable<SchoolProfileTO>;
    var schoolObject = this.schoolService.getAllSchoolProfile();
    schoolObject.subscribe(snapshot => {
      objData = snapshot;
      schoolComponentInterface.displayAllSchoolProfileCallBack(objData);

    });
  }


  /**
   * Used for updating the school profile.
   * @param schoolProfileTO
   * @param schoolComponentInterface
   */
  updateSchoolProfile(schoolProfileTO: SchoolProfileTO,schoolComponentInterface:SchoolComponentInterface){
    console.log("in converter impl..")
    console.log(schoolProfileTO);
    this.schoolService.updateSchoolProfile(this.getVOFromTO(schoolProfileTO),schoolComponentInterface);

  }

  deleteSchoolProfile(schoolid: string){
    this.schoolService.deleteSchoolProfile(schoolid);

  }



}
