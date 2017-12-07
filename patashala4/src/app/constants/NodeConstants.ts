/**
 * constants.
 * Created by ravisha on 4/28/17.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class NodeConstants {
  public static STUDENT_PROFILE = "studentProfile";

  public static STUDENT_FIREBASE_NOTIF_TOKEN = "firebaseNotifToken";
  public static SCHOOL_PROFILE_PIC_EXTENSION = ".jpg";
  public static UNIQUE_ID = "uniqueId";
  public static UNIQUEID_VALUE = "uniqueIdValue";

  public static SCHOOL_NAME = "schoolName";


  public static SCHOOLS = "schools";
  public static MASTERDATA = "masterdata";


  public static STUDENTS = "students";
  public static STUDENT = "student";
  public static REGISTERED_USERS = "registeredUsers";

  public static MESSAGES = "messages";
  public static CLASSES = "classes";
  public static CLASS_PROFILE = "classProfile";
  public static PROFILE_PIC = "profilepic";

  public static TEACHERS = "teachers";
  public static SCHEDULE = "schedule";
  public static SUBJECTS = "subjects";
  public static RESULTS = "results";
  public static EVENTS = "events";
  public static CONTACTS = "contacts";
  public static CONFIGURATION = "configuration";
  public static DASHBOARD = "dashboard";
  public static DOCUMENTS = "documents";
  public static FEES = "fees";
  public static ACKNOWLEDGEMENT_MESSAGES = "acknowledgements";
  public static BANNER = "banner";
  public static SUBJECTS_INFO = "subjectsInfo";
  public static COMPLETION = "completion";

  public static SEPARATOR = "/";
  public static FIREBASE_TOKEN = "firebaseNotifToken";
  public static SCHOOL_PROFILE = "schoolProfile";

  public static TIMETABLE = "timetable";
  public static ATTENDANCE = "attendance";
  public static ATTENDANCE_NOTIFIACTION = "notification";

  public static ACK_MESSAGE_REQUEST = "acknowledgementRequest";
  public static ACK_MESSAGE_RESPONSE = "acknowledgementResponse";

  /**
   * This is used as flag for all the listeners to trigger the listeners on data change.
   * value of this flag is updated basing on date change.
   */
  public static DATE_LISTENER_TRIGGER = "dateListenerTrigger";


  public static EXAMS = "exams";
  public static SCHOOL_PROFILE_PIC_PATH = "schools/";

}
