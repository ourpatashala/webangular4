import {Injectable} from "@angular/core";
import {StudentTO} from "../../to/StudentTO";
import {StudentConverter} from "../interfaces/StudentConverter";
import {StudentService} from "../../service/student.service";
import {CommonConverter} from "./CommonConverter";
import {StudentVO} from "../../vo/StudentVO";
import {StudentComponentInterface} from "../../component/student/StudentComponentInterface";
import {FirebaseListObservable} from "angularfire2/database";
import {ClassProfileVO} from "../../vo/ClassProfileVO";
import {ClassProfileTO} from "../../to/ClassProfileTO";

/**
 * Created by ravisha on 4/21/17.
 */

@Injectable()
export class StudentConverterImpl extends CommonConverter implements StudentConverter {
  //studentVO:StudentVO;
  //phoneNumbers:string[];

  constructor(private studentService: StudentService) {
    super()
  }


  /**
   * This method is a converter from TO to VO. Always ensure that unique key is assigned  properly.
   * @param studentTO
   * @returns {StudentVO}
   */
  getVOFromTO(studentTO: StudentTO):StudentVO{

    var studentVO = new StudentVO();
    studentVO.id = studentTO.id;
    studentVO.dob = studentTO.dateOfBirth;
    studentVO.schoolId = studentTO.schoolId;

    studentVO.rollNo = studentTO.rollNo;
    studentVO.firstName = studentTO.firstName;
    studentVO.lastName = studentTO.lastName;
    studentVO.middleName = studentTO.middleName;

    studentVO.classId = studentTO.classId;
    studentVO.mobileNumbers = studentTO.mobileNumbers;

    studentVO.siblings = studentTO.siblings;
    studentVO.gender = studentTO.gender;

    studentVO.landLine = studentTO.landLine;
    studentVO.bloodGroup = studentTO.bloodGroup;
    //studentVO.profilePhotoUrl = studentTO.profilePhotoUrl;

    studentVO.fatherName = studentTO.fatherName;
    studentVO.motherName = studentTO.motherName;

    studentVO.rollNo = studentTO.rollNo;


    //studentVO.phoneNumbers = this.getArrayDataWithOnlyValues(studentTO.phoneNumbers);
    //studentVO.siblings = this.getArrayDataWithKeyValues(studentTO.siblings);
    studentVO.addressOne = studentTO.addressOne;
    studentVO.addressTwo = studentTO.addressTwo;
    studentVO.city = studentTO.city;
    studentVO.state = studentTO.state;
    studentVO.country = studentTO.country;
    studentVO.pincode = studentTO.pincode;

    studentVO.uniqueId = this.getUniqueKey(studentTO);
    console.log("Unique Key.."+studentVO.uniqueId);


    return studentVO;
  }


  /**
   * This method is a converter from VO to TO. Always ensure that unique key is assigned  properly.
   * @param studentVO
   * @returns {StudentTO}
   */
  getTOFromVO(studentVO: StudentVO):StudentTO{

    var studentTO = new StudentTO();
    studentTO.id = studentVO.id;
    studentTO.dateOfBirth = studentVO.dob;
    studentTO.schoolId = studentVO.schoolId;

    studentTO.rollNo = studentVO.rollNo;
    studentTO.firstName = studentVO.firstName;
    studentTO.lastName = studentVO.lastName;
    studentTO.middleName = studentVO.middleName;

    studentTO.classId = studentVO.classId;
    studentTO.mobileNumbers = studentVO.mobileNumbers;
    studentTO.siblings = studentVO.siblings;
    studentTO.gender = studentVO.gender;

    studentTO.landLine = studentVO.landLine;
    studentTO.bloodGroup = studentVO.bloodGroup;
    //studentVO.profilePhotoUrl = studentTO.profilePhotoUrl;

    studentTO.fatherName = studentVO.fatherName;
    studentTO.motherName = studentVO.motherName;

    studentTO.rollNo = studentTO.rollNo;


    //studentTO.phoneNumbers = this.getArrayDataWithOnlyValues(studentVO.phoneNumbers);
    //studentTO.siblings = this.getArrayDataWithKeyValues(studentVO.siblings);
    studentTO.addressOne = studentVO.addressOne;
    studentTO.addressTwo = studentVO.addressTwo;
    studentTO.city = studentVO.city;
    studentTO.state = studentVO.state;
    studentTO.country = studentVO.country;
    studentTO.pincode = studentVO.pincode;

    studentTO.uniqueId = this.getUniqueKey(studentTO);
    console.log("Unique Key.."+studentTO.uniqueId);


    return studentTO;
  }

  /**
   * Decide your unqiue key here.
   * @param schoolProfileTO
   * @returns {string}
   */
  getUniqueKey(studentTO: StudentTO){
    return studentTO.firstName+studentTO.lastName;
  }

  addStudentProfile(schoolId : string,studentTO: StudentTO, studentComponentInterface:StudentComponentInterface){

    try{
      this.studentService.addStudentProfile ( schoolId, this.getVOFromTO(studentTO),studentComponentInterface);

    }catch(studentError){
      throw studentError;
    }

  }


  getStudent(schoolId:string, studentId:string,  studentComponentInterface:StudentComponentInterface){
    var studentVO=  new StudentVO();
    var studentObject = this.studentService.getStudentProfile(schoolId, studentId);
    studentObject.subscribe(snapshot => {
      studentVO = snapshot;
      studentComponentInterface.displayStudentCallBack(this.getTOFromVO(studentVO));
    });
  }




  updateStudent(schoolId : string,studentTO: StudentTO, studentComponentInterface:StudentComponentInterface){

    try{
      this.studentService.updateStudentProfile( schoolId, this.getVOFromTO(studentTO),studentComponentInterface);

    }catch(studentError){
      throw studentError;
    }

  }

  /**
   * Used for getting the list of all students.
   * @param studentComponentInterface
   */
  getAllStudents(schoolId : string, studentComponentInterface:StudentComponentInterface){
    var objData:FirebaseListObservable<StudentVO>;
    var schoolObject = this.studentService.getAllStudents(schoolId);

    schoolObject.subscribe(snapshot => {
      objData = snapshot;

      studentComponentInterface.displayAllStudentCallBack(objData);

    });
  }

  getAllClassesProfile(schoolId : string, studentComponentInterface:StudentComponentInterface){
    var objData:FirebaseListObservable<ClassProfileVO>;
    var classesObject = this.studentService.getAllClassProfiles(schoolId);

    classesObject.subscribe(snapshot => {
      objData = snapshot;
      //studentTO = this.getTOFromVO( objData);

      studentComponentInterface.displayAllClassesCallBack(objData);


    });
  }

  deleteStudentProfile(schoolid: string, studentId:string,){
    this.studentService.deleteStudentProfile(schoolid, studentId);

  }

  getStudentProfileRange(schoolid: string, start:string,end:string,studentComponentInterface:StudentComponentInterface){

    var schoolObject = this.studentService.getStudentProfileRange(schoolid,start,end);


  }

  getPhoto(schoolId: string, studentId: string, studentComponentInterface: StudentComponentInterface){

    this.studentService.getPhoto(schoolId, studentId, studentComponentInterface);

  }


  getPhotoWithURL(schoolId: string, photoURL: string, studentComponentInterface: StudentComponentInterface){

    this.studentService.getWithURLPhoto(schoolId, photoURL, studentComponentInterface);

  }

}
