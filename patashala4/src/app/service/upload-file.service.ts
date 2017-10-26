import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from './fileupload';

@Injectable()
export class UploadFileService {

  angularFireDatabase: AngularFireDatabase;

  constructor(private db: AngularFireDatabase) {

    this.angularFireDatabase = db;

  }

  private storagebasePath = '/schools';
  private dbbasePath = '/schools';


  pushFileToStorage(schoolid:string, studentId: string, fileUpload: FileUpload, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();

    var extn = fileUpload.file.name.substring(fileUpload.file.name.lastIndexOf("."));
    fileUpload.name = `${this.storagebasePath}/${schoolid}/${studentId}${extn}`;
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
        this.saveFileData(schoolid, studentId, fileUpload);
      }
    );
  }

  private saveFileData(schoolid:string, studentId: string, fileUpload: FileUpload) {

    var dbRef = this.angularFireDatabase .object("/schools/"+schoolid+"/studentProfile/"+studentId+"/profilePhotoUrl/").$ref;
    dbRef.set(fileUpload.url);
    //this.db.list(`${this.dbbasePath}/`).push(fileUpload);
  }
}

