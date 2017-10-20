/**
 * Created by ravisha on 4/28/17.
 */
import {Injectable} from "@angular/core";
import {NodeConstants} from "../constants/NodeConstants";
@Injectable()
export class PathUtil {
  /**
   * To get all the students in the school
   * @param schoolId
   * @return
   */
  public static  getStudentPath(schoolId: string): string {
    console.log('Entered student path schoolid ..' + schoolId)
    var studentPath = PathUtil.getSchoolPath(schoolId);
    studentPath = studentPath + (NodeConstants.STUDENT_PROFILE);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    return studentPath;
  }

  public static  getStudentProfilePath(schoolId: string, studentId: string): string {
    var studentPath = PathUtil.getSchoolPath(schoolId);
    studentPath = studentPath + (NodeConstants.STUDENT_PROFILE);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    studentPath = studentPath + (studentId);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    return studentPath;
  }

  public static  getStudentProfilePathNode(schoolId: string): string {
    var studentPath = PathUtil.getSchoolPathWithoutTopNode(schoolId);
    studentPath = studentPath + (NodeConstants.STUDENT_PROFILE);
    studentPath = studentPath + (NodeConstants.SEPARATOR);

    return studentPath;
  }

  public static  getRegistrationPath(): string {
    var registrationPath: string = "";
    registrationPath = registrationPath + (NodeConstants.SCHOOLS);
    registrationPath = registrationPath + (NodeConstants.SEPARATOR);
    registrationPath = registrationPath + (NodeConstants.REGISTERED_USERS);
    registrationPath = registrationPath + (NodeConstants.SEPARATOR);
    return registrationPath;
  }


  public static   getDateInRegistrationPath(phoneNumber: String): string {
    var registrationPath: string = "";
    registrationPath = registrationPath + (NodeConstants.SCHOOLS);
    registrationPath = registrationPath + (NodeConstants.SEPARATOR);
    registrationPath = registrationPath + (NodeConstants.REGISTERED_USERS);
    registrationPath = registrationPath + (NodeConstants.SEPARATOR);
    registrationPath = registrationPath + (phoneNumber);
    registrationPath = registrationPath + (NodeConstants.SEPARATOR);
    registrationPath = registrationPath + (NodeConstants.DATE_LISTENER_TRIGGER);
    registrationPath = registrationPath + (NodeConstants.SEPARATOR);
    return registrationPath;
  }

  public static  getFirebaseNotifPath(schoolId: string): string {
    var firebaseNotificationPath = PathUtil.getSchoolPath(schoolId);
    firebaseNotificationPath = firebaseNotificationPath + (NodeConstants.STUDENT_FIREBASE_NOTIF_TOKEN);
    firebaseNotificationPath = firebaseNotificationPath + (NodeConstants.SEPARATOR);
    return firebaseNotificationPath;
  }


  /**
   * Used for getting the students paths in  in the class.
   * @param schoolId
   * @param classId
   * @return
   */
  public static getStudentsPathInClass(schoolId: string, classId: string): string {

    var studentPath = PathUtil.getClassPathinSchool(schoolId, classId);
    studentPath = studentPath + (NodeConstants.STUDENTS);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    return studentPath;
  }


  /**
   * Used for getting the students paths in  in the class.
   * @param schoolId
   * @param classId
   * @return
   */
  public static  getStudentIdPathInClass(schoolId: string, classId: string, studentId: string): string {

    var studentPath = PathUtil.getClassPathinSchool(schoolId, classId);
    studentPath = studentPath + (NodeConstants.STUDENTS);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    studentPath = studentPath + (studentId);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    return studentPath;
  }


  /**
   * Used for getting the Teachers path   in the class.
   * @param schoolId
   * @param classId
   * @return
   */
  public static   getTeachersPathInClass(schoolId: string, classId: string): string {

    var teachersInClassPath = PathUtil.getClassPathinSchool(schoolId, classId);
    teachersInClassPath = teachersInClassPath + (NodeConstants.TEACHERS);
    teachersInClassPath = teachersInClassPath + (NodeConstants.SEPARATOR);
    return teachersInClassPath;
  }

  /**
   * Used for getting the configuration , which is particular to a school.
   * @param schoolId
   * @return
   */
  public static   getConfigurationPathInSchool(schoolId: string): string {

    var configurationPath = PathUtil.getSchoolPath(schoolId);
    configurationPath = configurationPath + (NodeConstants.CONFIGURATION);
    configurationPath = configurationPath + (NodeConstants.SEPARATOR);
    return configurationPath;
  }

  /**
   * Used for getting the configuration , which is common to all schools. It also configuration
   * that is required for the code like logging parameters etc.
   * @return
   */
  public static getCommonConfigurationPath(): string {
    var configurationPath: string = "";
    configurationPath = configurationPath + (NodeConstants.SCHOOLS);
    configurationPath = configurationPath + (NodeConstants.SEPARATOR);
    configurationPath = configurationPath + (NodeConstants.CONFIGURATION);
    configurationPath = configurationPath + (NodeConstants.SEPARATOR);
    return configurationPath;
  }


  /**
   * Used for getting the Teachers path   in the class.
   * @param schoolId
   * @param
   * @return
   */
  public static   getTeachersPathInSchool(schoolId: string): string {

    var teachersInSchoolPath = PathUtil.getSchoolPath(schoolId);
    teachersInSchoolPath = teachersInSchoolPath + (NodeConstants.TEACHERS);
    teachersInSchoolPath = teachersInSchoolPath + (NodeConstants.SEPARATOR);
    return teachersInSchoolPath;
  }

  /**
   * Used for getting the Teachers path   in the class.
   * @param schoolId
   * @param
   * @return
   */
  public static   getTeacherProfilePathInSchool(schoolId: string, teacherId: string): string {

    var teachersInSchoolPath = PathUtil.getSchoolPath(schoolId);
    teachersInSchoolPath = teachersInSchoolPath + (NodeConstants.TEACHERS);
    teachersInSchoolPath = teachersInSchoolPath + (NodeConstants.SEPARATOR);
    teachersInSchoolPath = teachersInSchoolPath + (teacherId);
    teachersInSchoolPath = teachersInSchoolPath + (NodeConstants.SEPARATOR);
    return teachersInSchoolPath;
  }

  public static getSchoolProfilePath() {
    var schoolProilePath: string = "";
    schoolProilePath = schoolProilePath + NodeConstants.SCHOOLS;
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    schoolProilePath = schoolProilePath + NodeConstants.SCHOOL_PROFILE;
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    return schoolProilePath;
  }


  public static getSchoolProfileNode() {
    var schoolProilePath: string = "";
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    schoolProilePath = schoolProilePath + NodeConstants.SCHOOL_PROFILE;
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    return schoolProilePath;
  }

  public static getSchoolIdProfilePath(schoolId: string) {
    var schoolProilePath: string = "";
    schoolProilePath = schoolProilePath + NodeConstants.SCHOOLS;
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    schoolProilePath = schoolProilePath + NodeConstants.SCHOOL_PROFILE;
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    schoolProilePath = schoolProilePath + schoolId;
    schoolProilePath = schoolProilePath + NodeConstants.SEPARATOR;
    return schoolProilePath;
  }


  /**
   * Get events path in the school
   * @param schoolId
   * @return
   */
  public static  getEventPathInSchool(schoolId: string): string {
    var eventPathInSchool = PathUtil.getSchoolPath(schoolId);
    eventPathInSchool = eventPathInSchool + (NodeConstants.EVENTS);
    eventPathInSchool = eventPathInSchool + (NodeConstants.SEPARATOR);
    return eventPathInSchool;

  }


  public static  getBannerPathInSchool(schoolId: string): string {
    var bannerPathInSchool = PathUtil.getSchoolPath(schoolId);
    bannerPathInSchool = bannerPathInSchool + (NodeConstants.BANNER);
    bannerPathInSchool = bannerPathInSchool + (NodeConstants.SEPARATOR);
    return bannerPathInSchool;
  }


  public static   getContactPathInSchool(schoolId: string): string {
    var eventPathInSchool = PathUtil.getSchoolPath(schoolId);
    eventPathInSchool = eventPathInSchool + (NodeConstants.CONTACTS);
    eventPathInSchool = eventPathInSchool + (NodeConstants.SEPARATOR);
    return eventPathInSchool;
  }

  public static   getDocumentPathInSchool(schoolId: string, classId: string): string {
    var documentPathInSchool = PathUtil.getSchoolPath(schoolId);
    documentPathInSchool = documentPathInSchool + (NodeConstants.DOCUMENTS);
    documentPathInSchool = documentPathInSchool + (NodeConstants.SEPARATOR);
    documentPathInSchool = documentPathInSchool + (classId);
    documentPathInSchool = documentPathInSchool + (NodeConstants.SEPARATOR);
    return documentPathInSchool;
  }


  public static   getFeePathInSchool(schoolId: string, classId: string): string {
    var feePathInSchool = PathUtil.getSchoolPath(schoolId);
    feePathInSchool = feePathInSchool + (NodeConstants.FEES);
    feePathInSchool = feePathInSchool + (NodeConstants.SEPARATOR);
    feePathInSchool = feePathInSchool + (classId);
    feePathInSchool = feePathInSchool + (NodeConstants.SEPARATOR);
    return feePathInSchool;
  }


  /**
   * Used for Tmetable path  in the class.
   * @param schoolId
   * @param classId
   * @return
   */
  public static   getTimeTablePathInClass(schoolId: string, classId: string): string {

    var timeTablePathInClass = PathUtil.getClassPathinSchool(schoolId, classId);
    timeTablePathInClass = timeTablePathInClass + (NodeConstants.TIMETABLE);
    timeTablePathInClass = timeTablePathInClass + (NodeConstants.SEPARATOR);
    return timeTablePathInClass;
  }


  public static  getExamPathInClass(schoolId: string, classId: string): string {
    var examInClassPath = PathUtil.getClassPathinSchool(schoolId, classId);

    examInClassPath = examInClassPath + (NodeConstants.EXAMS);
    examInClassPath = examInClassPath + (NodeConstants.SEPARATOR);
    return examInClassPath;

  }

  public static  getStudentResultPath(schoolId: string, classId: string, studentId: string): string {
    var studentResultPath = PathUtil.getSchoolPath(schoolId);
    studentResultPath = studentResultPath + (NodeConstants.RESULTS);
    studentResultPath = studentResultPath + (NodeConstants.SEPARATOR);
    studentResultPath = studentResultPath + (classId);
    studentResultPath = studentResultPath + (NodeConstants.SEPARATOR);
    studentResultPath = studentResultPath + (studentId);
    studentResultPath = studentResultPath + (NodeConstants.SEPARATOR);
    return studentResultPath;
  }

  public static  getExamIdPathInClass(schoolId: string, classId: string, examId: string): string {
    var examInClassPath = PathUtil.getClassPathinSchool(schoolId, classId);
    examInClassPath = examInClassPath + (NodeConstants.EXAMS);
    examInClassPath = examInClassPath + (NodeConstants.SEPARATOR);
    examInClassPath = examInClassPath + (examId);
    examInClassPath = examInClassPath + (NodeConstants.SEPARATOR);
    return examInClassPath;

  }

  public static  getExamSchedulePathInClass(schoolId: string, classId: string, examId: string): string {
    var examScheduleInClassPath = PathUtil.getClassPathinSchool(schoolId, classId);
    examScheduleInClassPath = examScheduleInClassPath + (NodeConstants.EXAMS);
    examScheduleInClassPath = examScheduleInClassPath + (NodeConstants.SEPARATOR);
    examScheduleInClassPath = examScheduleInClassPath + (examId);
    examScheduleInClassPath = examScheduleInClassPath + (NodeConstants.SEPARATOR);
    examScheduleInClassPath = examScheduleInClassPath + (NodeConstants.SCHEDULE);
    examScheduleInClassPath = examScheduleInClassPath + (NodeConstants.SEPARATOR);
    return examScheduleInClassPath;

  }


  public static  getChaptersPath(schoolId: string, classId: string, subjectId: string): string {
    var chaptersPath = PathUtil.getSchoolPath(schoolId);
    chaptersPath = chaptersPath + (NodeConstants.SUBJECTS);
    chaptersPath = chaptersPath + (NodeConstants.SEPARATOR);
    chaptersPath = chaptersPath + (classId);
    chaptersPath = chaptersPath + (NodeConstants.SEPARATOR);
    chaptersPath = chaptersPath + (NodeConstants.SUBJECTS_INFO);
    chaptersPath = chaptersPath + (NodeConstants.SEPARATOR);
    chaptersPath = chaptersPath + (subjectId);
    chaptersPath = chaptersPath + (NodeConstants.SEPARATOR);
    return chaptersPath;
  }


  public static  getSpecificChapterPath(schoolId: string, classId: string, subjectId: string, chapterId: string): string {
    var chapterPath = PathUtil.getSchoolPath(schoolId);
    chapterPath = chapterPath + (NodeConstants.SUBJECTS);
    chapterPath = chapterPath + (NodeConstants.SEPARATOR);
    chapterPath = chapterPath + (classId);
    chapterPath = chapterPath + (NodeConstants.SEPARATOR);
    chapterPath = chapterPath + (NodeConstants.SUBJECTS_INFO);
    chapterPath = chapterPath + (NodeConstants.SEPARATOR);
    chapterPath = chapterPath + (subjectId);
    chapterPath = chapterPath + (NodeConstants.SEPARATOR);
    chapterPath = chapterPath + ("chapterInfo");
    chapterPath = chapterPath + (NodeConstants.SEPARATOR);
    chapterPath = chapterPath + (chapterId);
    chapterPath = chapterPath + (NodeConstants.SEPARATOR);
    return chapterPath;
  }


  public static  getSubjectPath(schoolId: string, classId: string): string {
    var subjectPath = PathUtil.getSchoolPath(schoolId);
    subjectPath = subjectPath + (NodeConstants.SUBJECTS);
    subjectPath = subjectPath + (NodeConstants.SEPARATOR);
    subjectPath = subjectPath + (classId);
    subjectPath = subjectPath + (NodeConstants.SEPARATOR);
    return subjectPath;
  }


  public static  getAttendancePathInClass(schoolId: string, classId: string): string {
    var attendancePathInClass = PathUtil.getClassPathinSchool(schoolId, classId);
    attendancePathInClass = attendancePathInClass + (NodeConstants.ATTENDANCE);
    attendancePathInClass = attendancePathInClass + (NodeConstants.SEPARATOR);
    return attendancePathInClass;
  }


  public static  getAttendanceNotifPathInClass(schoolId: string, classId: string): string {
    var attendanceNotifPathInClass = PathUtil.getClassPathinSchool(schoolId, classId);
    attendanceNotifPathInClass = attendanceNotifPathInClass + (NodeConstants.ATTENDANCE_NOTIFIACTION);
    attendanceNotifPathInClass = attendanceNotifPathInClass + (NodeConstants.SEPARATOR);
    return attendanceNotifPathInClass;
  }


  public static  getAttendanceNotifPathOfStudent(schoolId: string, classId: string, studentId: string): string {
    var attendanceNotifPathOfStudent = PathUtil.getClassPathinSchool(schoolId, classId);
    attendanceNotifPathOfStudent = attendanceNotifPathOfStudent + (NodeConstants.ATTENDANCE);
    attendanceNotifPathOfStudent = attendanceNotifPathOfStudent + (NodeConstants.SEPARATOR);
    attendanceNotifPathOfStudent = attendanceNotifPathOfStudent + (NodeConstants.ATTENDANCE_NOTIFIACTION);
    attendanceNotifPathOfStudent = attendanceNotifPathOfStudent + (NodeConstants.SEPARATOR);
    attendanceNotifPathOfStudent = attendanceNotifPathOfStudent + (studentId);
    attendanceNotifPathOfStudent = attendanceNotifPathOfStudent + (NodeConstants.SEPARATOR);
    return attendanceNotifPathOfStudent;
  }


  /**
   * Can also be a Utility method for getting the path of the school
   * @param schoolId
   * @return
   */
  public static  getSchoolPath(schoolId: string): string {

    var schoolPath: string = "";

    schoolPath = schoolPath + NodeConstants.SCHOOLS;
    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    schoolPath = schoolPath + schoolId;
    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    console.log('school path...' + schoolPath)
    return schoolPath;

  }

  /**
   * Can also be a Utility method for getting the path of the school
   * @param schoolId
   * @return
   */
  public static  getRegisteredUsersPath(mobileNumber: string): string {

    var schoolPath: string = "";

    schoolPath = schoolPath + NodeConstants.SCHOOLS;
    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    schoolPath = schoolPath + NodeConstants.REGISTERED_USERS;
    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    schoolPath = schoolPath + mobileNumber;
    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    console.log('getRegisteredUsersPath...' + schoolPath)
    return schoolPath;

  }

  /**
   * Can also be a Utility method for getting the path of the school
   * @param schoolId
   * @return
   */
  public static  getRegisteredUsersNodePath(): string {

    var path: string = "";

    path = path + NodeConstants.SCHOOLS;
    path = path + NodeConstants.SEPARATOR;
    path = path + NodeConstants.REGISTERED_USERS;
    path = path + NodeConstants.SEPARATOR;

    console.log('getRegisteredUsersNodePath...' + path)
    return path;

  }

  public static  getSchoolPathWithoutTopNode(schoolId: string): string {

    var schoolPath: string = "";


    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    schoolPath = schoolPath + schoolId;
    schoolPath = schoolPath + NodeConstants.SEPARATOR;
    console.log('school path...' + schoolPath)
    return schoolPath;

  }

  /**
   * Can also be a Utility method for getting the path of the school
   * @param schoolId
   * @return
   */
  public static   getClassProfilePath(schoolId: string): string {

    var schoolPath: string = "";
    schoolPath = schoolPath + (NodeConstants.SCHOOLS);
    schoolPath = schoolPath + (NodeConstants.SEPARATOR);
    schoolPath = schoolPath + (schoolId);
    schoolPath = schoolPath + (NodeConstants.SEPARATOR);
    schoolPath = schoolPath + (NodeConstants.CLASS_PROFILE);
    schoolPath = schoolPath + (NodeConstants.SEPARATOR);
    return schoolPath;

  }


  /**
   * Can also be a Utility method for getting class  path in the school , can be
   * used mostly for getting the nodes inside the class like, students in a class
   * , teachers in a class, timetable in the class.
   * @param schoolId
   * @return
   */
  public static  getClassPathinSchool(schoolId: string, classId: string): string {
    var classPath = PathUtil.getSchoolPath(schoolId);

    classPath = classPath + (NodeConstants.CLASSES);
    classPath = classPath + (NodeConstants.SEPARATOR);
    classPath = classPath + (classId);
    classPath = classPath + (NodeConstants.SEPARATOR);
    return classPath;
  }


  public static   getAckMessagePath(schoolId: string, messageId: string): string {
    var messagePath = PathUtil.getSchoolPath(schoolId);
    messagePath = messagePath + (NodeConstants.MESSAGES);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    messagePath = messagePath + (NodeConstants.ACKNOWLEDGEMENT_MESSAGES);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    messagePath = messagePath + (messageId);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    return messagePath;
  }


  public static   getMessagePath(schoolId: string, id: string, messageType: string): string {
    var messagePath = PathUtil.getSchoolPath(schoolId);
    messagePath = messagePath + (NodeConstants.MESSAGES);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    messagePath = messagePath + (messageType);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    messagePath = messagePath + (id);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    return messagePath;
  }

  public static  getMessageStoragePath(schoolId: string, messageId: string): string {
    var messagePath = PathUtil.getSchoolPath(schoolId);
    messagePath = messagePath + (NodeConstants.MESSAGES);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    messagePath = messagePath + (messageId);
    messagePath = messagePath + (NodeConstants.MESSAGES);
    messagePath = messagePath + (NodeConstants.SEPARATOR);
    return messagePath;
  }


  public static   getAckMessageRequestPath(schoolId: string, studentId: string): string {
    var studentPath = PathUtil.getSchoolPath(schoolId);
    studentPath = studentPath + (NodeConstants.MESSAGES);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    studentPath = studentPath + (NodeConstants.ACK_MESSAGE_REQUEST);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    studentPath = studentPath + (studentId);
    studentPath = studentPath + (NodeConstants.SEPARATOR);
    return studentPath;
  }

  public static   getAckMessageResponsePath(schoolId: string, messageId: string): string {
    var ackMessageResponsePath = PathUtil.getSchoolPath(schoolId);
    ackMessageResponsePath = ackMessageResponsePath + (NodeConstants.MESSAGES);
    ackMessageResponsePath = ackMessageResponsePath + (NodeConstants.SEPARATOR);
    ackMessageResponsePath = ackMessageResponsePath + (NodeConstants.ACK_MESSAGE_RESPONSE);
    ackMessageResponsePath = ackMessageResponsePath + (NodeConstants.SEPARATOR);
    ackMessageResponsePath = ackMessageResponsePath + (messageId);
    ackMessageResponsePath = ackMessageResponsePath + (NodeConstants.SEPARATOR);
    return ackMessageResponsePath;
  }


  public static   getMessageIdPath(schoolId: string, id: string, messageType: string, messageId: string): string {
    var studentIdPathInMessages = PathUtil.getMessagePath(schoolId, id, messageType);
    var messageIdpath = studentIdPathInMessages;
    messageIdpath = messageIdpath + (NodeConstants.SEPARATOR);
    messageIdpath = messageIdpath + (messageId);
    return messageIdpath;
  }

  public static   getStudentMessagePath(schoolId: string, studentId: string): string {
    var studentPersonalMessagePath = PathUtil.getSchoolPath(schoolId);
    var messageIdpath = studentPersonalMessagePath;
    messageIdpath = messageIdpath + (NodeConstants.SEPARATOR);
    messageIdpath = messageIdpath + (NodeConstants.MESSAGES);
    messageIdpath = messageIdpath + (NodeConstants.SEPARATOR);
    messageIdpath = messageIdpath + (NodeConstants.STUDENT);
    messageIdpath = messageIdpath + (NodeConstants.SEPARATOR);
    messageIdpath = messageIdpath + (studentId);
    messageIdpath = messageIdpath + (NodeConstants.SEPARATOR);
    return messageIdpath;
  }

  public static  getTokenPath(schoolId: string): string {
    var tokenPath = PathUtil.getSchoolPath(schoolId);
    tokenPath = tokenPath + (NodeConstants.SEPARATOR);
    tokenPath = tokenPath + (NodeConstants.FIREBASE_TOKEN);
    tokenPath = tokenPath + (NodeConstants.SEPARATOR);
    return tokenPath;


  }

  public static test (){

    console.log("Called Test");

  }

}
