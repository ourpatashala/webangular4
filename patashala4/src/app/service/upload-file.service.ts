import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from './fileupload';
import {StudentService} from "./student.service";

@Injectable()
export class UploadFileService {

  angularFireDatabase: AngularFireDatabase;

  constructor(private db: AngularFireDatabase, private studentService : StudentService) {

    this.angularFireDatabase = db;

  }

  private storagebasePath = '/schools';
  private dbbasePath = '/schools';


  pushFileToStorage(schoolid:string, studentId: string, fileUpload: FileUpload, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();

    var extn = fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf("."));
    fileUpload.name = `${this.storagebasePath}/${schoolid}/students/${studentId}${extn}`;
    const uploadTask = storageRef.child(fileUpload.name).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        //fileUpload.name = fileUpload.file.name
        this.saveStudentPic(schoolid, studentId, fileUpload);
      }
    );
  }

  pushImageToStorage(schoolid:string, studentId: string, file: any, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();

    var extn = ".jpeg"
    var filename = `${this.storagebasePath}/${schoolid}/students/${studentId}${extn}`;

    var newBase64 = file.replace(/^data:image\/(png|jpeg);base64,/, ''); //Remove this to enable displaying image while retrieving from storage
    //storageRef.child(<key>).putString($scope.newBase64, ‘base64’,{contentType:’image/jpg’});

    const uploadTask = storageRef.child(filename).putString(newBase64,'base64');

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        var fileUpload = new FileUpload(file);
        fileUpload.url = uploadTask.snapshot.downloadURL
        //fileUpload.name = fileUpload.file.name
        this.saveStudentPic(schoolid, studentId, fileUpload);
      }
    );

  }

  pushSchoolPicToStorage(schoolid:string, fileUpload: FileUpload, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();

    var extn = fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf("."));
    fileUpload.name = `${this.storagebasePath}/${schoolid}/profilepic/${schoolid}${extn}`;

    const uploadTask = storageRef.child(fileUpload.name).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        //fileUpload.name = fileUpload.file.namepwd

        this.saveSchoolPic(schoolid, fileUpload);
      }
    );
  }

  private saveStudentPic(schoolid:string, studentId: string, fileUpload: FileUpload) {

    var dbRef = this.angularFireDatabase .object("/schools/"+schoolid+"/studentProfile/"+studentId+"/profilePhotoUrl/").$ref;
    dbRef.set(fileUpload.url);

    this.studentService.updateProfilePicURLInRegNodes(schoolid, studentId, fileUpload.url);
    //this.db.list(`${this.dbbasePath}/`).push(fileUpload);
  }

  //

  public removeStudentPic(schoolid:string, studentId: string) {

    var dbRef = this.angularFireDatabase .object("/schools/"+schoolid+"/studentProfile/"+studentId+"/profilePhotoUrl/").$ref;
    dbRef.remove();
    //this.db.list(`${this.dbbasePath}/`).push(fileUpload);
  }

  private saveSchoolPic(schoolid:string, fileUpload: FileUpload) {

    var dbRef = this.angularFireDatabase .object("/schools/schoolProfile/"+schoolid+"/profilePhotoUrl/").$ref;
    dbRef.set(fileUpload.url);
    //this.db.list(`${this.dbbasePath}/`).push(fileUpload);
  }

  public removeSchoolPic(schoolid:string) {

    var dbRef = this.angularFireDatabase .object("/schools/schoolProfile/"+schoolid+"/profilePhotoUrl/").$ref;
    dbRef.remove()
    //this.db.list(`${this.dbbasePath}/`).push(fileUpload);
  }
}

