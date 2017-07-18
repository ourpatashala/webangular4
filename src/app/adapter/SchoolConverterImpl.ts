/**
 * Created by ravisha on 7/3/17.
 */
import {Injectable} from "@angular/core";
import {CommonConverter} from "./CommonConverter";
import {SchoolConverter} from "./interfaces/SchoolConverter";
import {SchoolProfileTO} from "../to/SchoolProfileTO";
import {SchoolService} from "../service/school.service";
import {SchoolProfileVO} from "../vo/SchoolProfileVO";
import {FirebaseListObservable} from "angularfire2";
import {SchoolComponentInterface} from "../component/school/SchoolComponentInterface";
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

  addSchoolProfile(schoolProfileTO: SchoolProfileTO,schoolComponentInterface:SchoolComponentInterface){
    this.schoolProfileVO  = new SchoolProfileVO();
    this.schoolProfileVO.schoolId = schoolProfileTO.schoolId;
    this.schoolProfileVO.schoolName = schoolProfileTO.schoolName;
    this.schoolProfileVO.schoolDisplayName = schoolProfileTO.schoolDisplayName;
    this.schoolProfileVO.state = schoolProfileTO.state;
    this.schoolProfileVO.country = schoolProfileTO.country;
    this.schoolProfileVO.address1 = schoolProfileTO.address1;
    this.schoolProfileVO.address2 = schoolProfileTO.address2;
    this.schoolProfileVO.pincode = schoolProfileTO.pincode;
    this.schoolProfileVO.remarks = schoolProfileTO.remarks;
    //this.schoolProfileVO.active = schoolProfileTO.active;
    this.schoolProfileVO.uniqueId = schoolProfileTO.schoolName+schoolProfileTO.schoolDisplayName;
    console.log("in converter impl"+schoolProfileTO.state);
    this.schoolService.addSchoolProfile(this.schoolProfileVO,schoolComponentInterface);
  }

  getSchoolProfile(schoolId:string,schoolComponentInterface:SchoolComponentInterface){
    var schoolProfileTO=  new SchoolProfileTO();
    var schoolObject = this.schoolService.getSchoolProfile(schoolId);
    schoolObject.subscribe(snapshot => {
      schoolProfileTO = snapshot;
      schoolComponentInterface.displaySchoolProfileCallBack(schoolProfileTO);
    });
  }


  getAllSchoolProfile(schoolComponentInterface:SchoolComponentInterface){
    var schoolProfileTO=  new SchoolProfileTO();
    let schoolProfileMap = new Map<string,SchoolProfileTO>();
    var schoolObject = this.schoolService.getAllSchoolProfile();
    schoolObject.subscribe(snapshot => {
      schoolProfileTO = snapshot;
      Object.keys(snapshot).forEach(schoolKey=> {
        var schoolObject = snapshot[schoolKey];
        schoolProfileMap.set(schoolKey,schoolObject);
    });
    schoolComponentInterface.displayAllSchoolProfileCallBack(schoolProfileMap);
    });
  }


  updateSchoolProfile(schoolProfileTO: SchoolProfileTO){
    this.schoolProfileVO  = new SchoolProfileVO();
    this.schoolProfileVO.schoolId = schoolProfileTO.schoolId;
    this.schoolProfileVO.schoolName = schoolProfileTO.schoolName;
    this.schoolProfileVO.schoolDisplayName = schoolProfileTO.schoolDisplayName;
    this.schoolProfileVO.state = schoolProfileTO.state;
    this.schoolProfileVO.country = schoolProfileTO.country;
    this.schoolProfileVO.address1 = schoolProfileTO.address1;
    this.schoolProfileVO.address2 = schoolProfileTO.address2;
    this.schoolProfileVO.pincode = schoolProfileTO.pincode;
    this.schoolProfileVO.remarks = schoolProfileTO.remarks;
    this.schoolProfileVO.active = schoolProfileTO.active;
    this.schoolService.updateSchoolProfile(this.schoolProfileVO);

  }

  deleteSchoolProfile(schoolid: string){
    this.schoolService.deleteSchoolProfile(schoolid);

  }



}
