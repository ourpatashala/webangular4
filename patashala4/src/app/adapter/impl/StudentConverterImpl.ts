import {Injectable} from "@angular/core";
import {StudentTO} from "../../to/StudentTO";
import {StudentConverter} from "../interfaces/StudentConverter";
import {StudentService} from "../../service/student.service";
import {CommonConverter} from "./CommonConverter";
import {StudentVO} from "../../vo/StudentVO";
import {StudentComponentInterface} from "../../component/student/StudentComponentInterface";

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

    console.log("studentTO : " + studentTO);
    console.log("studentTO schoolId: " + studentTO.schoolId);
    console.log("studentTO First Name: " + studentTO.firstName);


    var studentVO = new StudentVO();
    studentVO.id = studentTO.id;
    studentVO.dob = studentTO.dob;
    studentVO.schoolId = studentTO.schoolId;

    studentVO.rollNo = studentTO.rollNo;
    studentVO.firstName = studentTO.firstName;
    studentVO.lastName = studentTO.lastName;
    studentVO.middleName = studentTO.middleName;

    studentVO.classId = studentTO.classId;
    studentVO.mobileNumber = studentTO.mobileNumber;
    studentVO.gender = studentTO.gender;

    studentVO.landLine = studentTO.landLine;
    studentVO.bloodGroup = studentTO.bloodGroup;
    studentVO.profilePhotoUrl = studentTO.profilePhotoUrl;
    studentVO.fatherName = studentTO.fatherName;
    studentVO.motherName = studentTO.motherName;

    //studentVO.phoneNumbers = this.getArrayDataWithOnlyValues(studentTO.phoneNumbers);
    //studentVO.siblings = this.getArrayDataWithKeyValues(studentTO.siblings);
    //studentVO.address = studentTO.address;

    studentVO.uniqueId = this.getUniqueKey(studentTO);
    console.log("Unique Key.."+studentVO.uniqueId);


    return studentVO;
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
    var studentTO=  new StudentTO();
    var studentObject = this.studentService.getStudentProfile(schoolId, studentId);
    studentObject.subscribe(snapshot => {
      studentTO = snapshot;
      studentComponentInterface.displayStudentCallBack(studentTO);
    });
  }




  updateStudent(schoolId : string,studentTO: StudentTO, studentComponentInterface:StudentComponentInterface){

    try{
      this.studentService.updateStudentProfile( schoolId, this.getVOFromTO(studentTO),studentComponentInterface);

    }catch(studentError){
      throw studentError;
    }

  }

}
