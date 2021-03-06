import {Component, OnInit,Input} from '@angular/core';
import {WebCamComponent} from 'ack-angular-webcam';
import {FileUpload} from '../../../service/fileupload';
import {AppConstants} from "../../../constants/AppConstants";
import {UploadFileService} from '../../../service/upload-file.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-webcampopup', templateUrl: './webcampopup.component.html', styleUrls: ['./webcampopup.component.css']
})
export class WebcampopupComponent implements OnInit {
  webcam: WebCamComponent//will be populated by <ack-webcam [(ref)]="webcam">
  base64;
  config;
  selectedimagesrc: any;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = {percentage: 0};
  active: string = "0";
  errorMessage: string;
  sucessMessage: string;
  popupstatus: string = "0";
  showupload: string = "0";
  showProgressBar: boolean = false;

  constructor(private uploadService: UploadFileService) {
    this.sucessMessage = "";
    this.active = "0";
  }

  ngOnInit() {
  }

  genBase64() {
    this.webcam.getBase64()
    .then(base => {
      this.base64 = base;
      this.selectedimagesrc = base;
      this.showProgressBar= true;
      this.progress.percentage = 0;
    })
    .catch(e => console.error(e));

  }

  //get HTML5 FormData object and pretend to post to server
  /*genPostData() {

    //console.log ("this.selectedimagesrc ==>"+ this.selectedimagesrc);

    var blob = new Blob([this.base64], {type: 'image/png'});
    var file = new File([blob], 'imageFileName.png');
    //file.name;
    console.log ("this.selectedimagesrc ==>"+ file.name);
    saveAs(file, "test.png");
    this.currentFileUpload = new FileUpload(file);
    console.log(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID) + "    " + localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID) + "  " + this.currentFileUpload + "   " + file);
    this.uploadService.pushFileToStorage(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID), this.currentFileUpload, this.progress);
    this.updateProgressbarUI();
  }*/

  //get HTML5 FormData object and pretend to post to server
  genPostData() {


    this.uploadService.pushImageToStorage(localStorage.getItem(AppConstants.SHAREDPREFERANCE_SCHOOLID), localStorage.getItem(AppConstants.SHAREDPREFERANCE_STUDENTID), this.selectedimagesrc, this.progress);
    this.updateProgressbarUI();

  }

//https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript
  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>b;
  }

  //a pretend process that would post the webcam photo taken
  postFormData(formData) {
    console.log("test data" + formData.fileName);

  }

  updateProgressbarUI() {
    console.log(" updateProgressbarUI  " + this.progress.percentage);
    if (this.progress.percentage == 100) {
      this.currentFileUpload = null;
      this.active = "1";
      this.sucessMessage = "Image Uploaded Successfully";
      this.popupstatus = "0";
      this.showupload = "0";
      //this.selectedimagesrc=null;
      this.showProgressBar = false;
    } else {
      setTimeout(() => {
        this.updateProgressbarUI();
      }, 500);
    }
  }

  onCamError(err) {
    alert(err);
  }

  onCamSuccess(event) {
    console.log(event);
  }
}
